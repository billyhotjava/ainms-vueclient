import { defineComponent, inject } from 'vue';
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n';
import type { LoginService } from 'account/login.service';
import { type ComputedRef, ref, onMounted } from 'vue';
import acc from '../../entities/access-controller/accforhome.vue' 
export default defineComponent({
  compatConfig: { MODE: 3 },
  components:{
      acc: acc
  },
  setup() {
    const loginService = inject<LoginService>('loginService');

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    // 获取ECharts容器的引用
    const chartRef_station = ref(null);
    const chartRef_Ap = ref(null);
    // 在组件渲染完成后初始化echarts实例并显示数据
    onMounted(() => {
      // prettier-ignore
      let dataAxis = ['陕西省', '安徽省', '广东省', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
// prettier-ignore
      let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
         dataShadow.push(yMax);
      }

      const chart1 = echarts.init(chartRef_station.value);
      const chart2 = echarts.init(chartRef_Ap.value);
      // 静态数据示例
      // 设置ECharts实例的配置选项
      const option1 = {
        title: {
          text: '各省场站数量',
        },
        xAxis: {
          data: dataAxis,
          name:"省份",
          nameGap:'50',
          nameLocation:'middle',
          axisLabel: {
            inside: false,
            color: 'black'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
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
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: data
          }
        ]
      };
      const option2 = {
        title: {
          text: '各省AP数量',
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: false,
            color: 'black'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
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
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: data
          }
        ]
      };
      const zoomSize = 6;
      chart1.on('click', function (params) {
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      chart1.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
      dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  });
    
});
const zoomSize1 = 6;
chart2.on('click', function (params) {
console.log(dataAxis[Math.max(params.dataIndex - zoomSize1 / 2, 0)]);
chart2.dispatchAction({
type: 'dataZoom',
startValue: dataAxis[Math.max(params.dataIndex - zoomSize1 / 2, 0)],
endValue:
dataAxis[Math.min(params.dataIndex + zoomSize1 / 2, data.length - 1)]
});

});
      // 使用配置选项设置ECharts实例
      chart1.setOption(option1);
      chart2.setOption(option2);
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
