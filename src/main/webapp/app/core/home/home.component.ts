import { defineComponent, inject } from 'vue';
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n';
import type { LoginService } from 'account/login.service';
import { type ComputedRef, ref, onMounted } from 'vue';
import acc from '../../entities/access-controller/accforhome.vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  components: {
    acc: acc
  },
  setup() {
    const loginService = inject<LoginService>('loginService');

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    // Get references to ECharts containers
    const chartRef_station = ref(null);
    const chartRef_Ap = ref(null);

    // After the component is mounted, initialize echarts instances and display data
    onMounted(() => {
      const provinces = ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'];
      const dummyData = Array.from({ length: provinces.length }, () => Math.floor(Math.random() * 500)); // Generate random dummy data

      const chart1 = echarts.init(chartRef_station.value);
      const chart2 = echarts.init(chartRef_Ap.value);

      // Options for the horizontal bar charts
      const options = {
        title: {
          text: '',
          left: 'center',
          textStyle: {
            fontSize: 30
          },
        },
        yAxis: {
          type: 'category',
          data: provinces,
          name: "省份",
          nameGap: 50,
          nameTextStyle: {
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            fontSize: 20,
            verticalAlign: "top"
          },
          nameLocation: 'middle',
          axisLabel: {
            inside: false,
            color: 'black',
            rotate: 45 // Rotate x-axis labels by 45 degrees
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        xAxis: {
          nameGap: 50,
          nameLocation: "middle",
          nameTextStyle: {
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            fontSize: 20,
            verticalAlign: "top"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0], // Apply data zoom only to yAxis
            start: 0,
            end: 100,
            handleSize: '100%'
          },
          {
            type: 'inside',
            yAxisIndex: [0], // Apply internal data zoom only to yAxis
            start: 0,
            end: 100
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [{
          type: 'bar',
          encode: {
            x: 'value',
            y: 'category'
          },
          itemStyle: {
            color: () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`
          },
          data: dummyData.map(value => ({ value }))
        }]
      };

      chart1.setOption({
        ...options,
        title: { text: '场站数量一览表' }
      });

      chart2.setOption({
        ...options,
        title: { text: 'AP数量一览表' }
      });

      chart1.on('click', (params: any) => {
        console.log(provinces[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        chart1.dispatchAction({
          type: 'dataZoom',
          startValue: provinces[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: provinces[Math.min(params.dataIndex + zoomSize / 2, provinces.length - 1)]
        });
      });

      chart2.on('click', (params: any) => {
        console.log(provinces[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        chart2.dispatchAction({
          type: 'dataZoom',
          startValue: provinces[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: provinces[Math.min(params.dataIndex + zoomSize / 2, provinces.length - 1)]
        });
      });
    });

    const openLogin = () => {
      loginService.login();
    };

    return {
      authenticated,
      username,
      openLogin,
      chartRef_station,
      chartRef_Ap,
      t$: useI18n().t,
    };
  },
});
