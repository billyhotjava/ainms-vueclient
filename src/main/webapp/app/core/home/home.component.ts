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

    // ��ȡECharts����������
    const chartRef_station = ref(null);
    const chartRef_Ap = ref(null);
    // �������Ⱦ��ɺ��ʼ��echartsʵ������ʾ����
    onMounted(() => {
      // prettier-ignore
      let dataAxis = ['����ʡ', '����ʡ', '�㶫ʡ', '��', '��', '��', '��', 'ָ', '��', '��', '��', '��', '��', '��', '��', '��', '��', '��', '��', '��'];
// prettier-ignore
      let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
         dataShadow.push(yMax);
      }

      const chart1 = echarts.init(chartRef_station.value);
      const chart2 = echarts.init(chartRef_Ap.value);
      const option1 = {
        title: {
          text: '��ʡ��վ����',
        },
        xAxis: {
          data: dataAxis,
          name:"ʡ��",
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
          text: '��ʡAP����',
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
      // ʹ������ѡ������EChartsʵ��
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
