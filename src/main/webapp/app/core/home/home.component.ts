import { type ComputedRef, defineComponent, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts/core';
import type LoginService from '@/account/login.service';
import type HomeService from '@/core/home/home.service';
import type { IAPStatisticsByPowerPlant, IAPStatisticsByProvince } from '@/shared/model/ap-statistics.model';
import { useAlertService } from '@/shared/alert/alert.service';
import Stomp from 'webstomp-client'; 

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const { t: t$ } = useI18n();
    const loginService = inject<LoginService>('loginService');
    const homeService = inject<HomeService>('homeService');

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');
    const alertService = inject('alertService', () => useAlertService(), true);
    const openLogin = () => {
      loginService.login();
    };
    const apStatisticsByProvinces: Ref<IAPStatisticsByProvince[]> = ref([]);
    const apStatisticsByPowerPlants: Ref<IAPStatisticsByPowerPlant[]> = ref([]);

    const chartContainer = ref<HTMLDivElement | null>(null);
    const chartInstance = ref<EChartsType | null>(null);

    const option = ref({
      title: { text: 'AP 分布图' },
      xAxis: {
        type: 'category',
        data: [], // 省份名称
        axisLabel: {
          rotate: 60, // 将标签旋转90度，实现垂直显示
          interval: 0, // 显示所有标签，不遗漏
          textStyle: {
            fontSize: 12 // 可以调整字体大小以适应显示
          }
        }
      },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        data: [], // 对应的AP数量
        label: {
          show: true, // 显示数据标签
          position: 'top', // 数据标签的位置，'top'表示在柱状条的顶部
          formatter: '{c}', // 数据标签的格式化器，'{c}'表示当前数据值
          color: '#555' // 设置标签字体颜色，确保在不同背景下的可读性
        }
      }],
      graphic: [
        {
          type: 'text',
          left: 'center', // 文字居中
          bottom: 2, // 距离底部10单位
          style: {
            text: '(AP所在的分组没有指定的不计算)',
            fill: '#555', // 文字颜色
            fontSize: 13, // 字体大小
            align: 'center',
            width: 300, // 文字区域宽度，可根据需要调整
            overflow: 'truncate', // 超出宽度部分截断
          }
        }
      ]
    });

    const updateChartData = async () => {
      console.log('===updateChartData');
      if (!homeService) {
        console.error('HomeService is not injected.');
        return;
      }
      try {
        const responseData = await homeService.retrieveCountsByProvince();
        const categories = responseData.map(item => item.provinceName);
        const values = responseData.map(item => item.count);

        // 计算总和
        const total = values.reduce((sum, value) => sum + value, 0);
        // 更新图表选项，包括动态设置的标题
        option.value.title.text = `AP 分布图 - 总数: ${total}`;
        // option.value.title.text = `未明确的AP组不计入省份AP总数`;

        option.value.xAxis.data = categories; // 更新省份名称
        option.value.series[0].data = values; // 更新对应的AccessPoint数量
        chartInstance.value?.setOption(option.value);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    }

    const retrieveAPStatisticsByProvince = async () => {
      // try {
      //   const responseData = await homeService.retrieveStatisticsByProvince();
      //   apStatisticsByProvinces.value = responseData;
      // }catch(error){
      //   alertService.showHttpError(err.response);
      // }
    }
    const retrieveStatisticsByPowerPlant = async () => {
      // try {
      //   const responseData = await homeService.retrieveStatisticsByPowerPlant();
      //   apStatisticsByPowerPlants.value = responseData;
      // }catch(error){
      //   alertService.showHttpError(err.response);
      // }
    }

    const connectWebSocket = () => {
      // const socket = new WebSocket('ws://192.168.22.5:8080/websocket');
      // const stompClient = Stomp.over(socket);
      
      // // 连接WebSocket
      // stompClient.connect({}, frame => {
      //     console.log('Connected: ' + frame);
      
      //     // 订阅某个topic，接收来自服务器的消息
      //     stompClient.subscribe('/topic/update', message => {
      //         console.log('Received message: ', message.body);
      //     });
      
      // }, error => {
      //     console.log("----Websocket conneciton error:"+error);
      //     console.error('Error: ', error);
      // });
      
      // // 监听连接关闭事件
      // stompClient.onclose = function(event) {
      //     console.log('WebSocket connection closed:', event);
      // };
      
      // // 监听错误事件
      // stompClient.onerror = function(event) {
      //     console.error('WebSocket error:', event);
      // };
      // 连接WebSocket，并订阅topic
      // stompClient.connect({}, () => {
      //   stompClient?.subscribe('/topic/update', (msg: Message) => {
      //     message.value = msg.body;
      //   });
      // }, (error: any) => {
      //   console.error('Error connecting to WebSocket:', error);
      // });
    };

    onMounted(()=>{
      if (chartContainer.value) {
        chartInstance.value = echarts.init(chartContainer.value);
        updateChartData();
        retrieveAPStatisticsByProvince();
        retrieveStatisticsByPowerPlant();
      } 
      connectWebSocket();

      // stompClient.connect({}, () => {
      //   stompClient.subscribe('/topic/update', message => {
      //     const content = message.body;
      //     if (content === "updateAPs,successful") {
      //       // 当收到成功更新的消息时，刷新数据
      //       retrieveAPStatisticsByProvince();
      //       retrieveStatisticsByPowerPlant();
      //     }
      //   });
      // });

      // 监听窗口变化，重新调整图表大小
      window.addEventListener('resize', () => {
        chartInstance.value?.resize();
      });
    });
    
    return {
      apStatisticsByProvinces,
      apStatisticsByPowerPlants,
      authenticated,
      username,
      chartContainer,
      option,
      openLogin,
      t$: useI18n().t,
    };
  },
  methods:{
    downloadCsvByProvince() {
      const csvRows = [];
      // CSV Header
      // const headers = ""
      const headers = "Province Name, Total APs, StandBy AP Count, Offline AP Count, Other AP Count, Rate";
      csvRows.push(headers);
  
      // CSV Rows
      this.apStatisticsByProvinces.forEach(item => {
        const row = [
          item.provinceName,
          item.totalAPs,
          item.standByAPCount,
          item.offlineAPCount,
          item.otherAPCount,
          `${((item.standByAPCount / item.totalAPs) * 100).toFixed(1)}%`,
        ].join(",");
        csvRows.push(row);
      });
  
      const csvString = csvRows.join("\n");
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "apStatisticsByProvinces.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 

    downloadCsvByPowerPlant() {
      const csvRows = [];
      // CSV Header
      const headers = "PowerPlant Name, Total APs, StandBy AP Count, Offline AP Count, Other AP Count, Rate";
      csvRows.push(headers);
  
      // CSV Rows
      this.apStatisticsByPowerPlants.forEach(item => {
        const row = [
          item.powerPlantName,
          item.totalAPs,
          item.standByAPCount,
          item.offlineAPCount,
          item.otherAPCount,
          `${((item.standByAPCount / item.totalAPs) * 100).toFixed(1)}%`,
        ].join(",");
        csvRows.push(row);
      });
  
      const csvString = csvRows.join("\n");
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "apStatisticsByPowerPlant.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 
  }
});
