import { type ComputedRef, defineComponent, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts/core';
import type LoginService from '@/account/login.service';
import type HomeService from '@/core/home/home.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const loginService = inject<LoginService>('loginService');
    const homeService = inject<HomeService>('homeService');


    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    const openLogin = () => {
      loginService.login();
    };

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
      }]
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

        option.value.xAxis.data = categories; // 更新省份名称
        option.value.series[0].data = values; // 更新对应的AccessPoint数量
        chartInstance.value?.setOption(option.value);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    }

    onMounted(()=>{
      if (chartContainer.value) {
        chartInstance.value = echarts.init(chartContainer.value);
        updateChartData();
      } 

      // 监听窗口变化，重新调整图表大小
      window.addEventListener('resize', () => {
        chartInstance.value?.resize();
      });
    });

    return {
      authenticated,
      username,
      chartContainer,
      option,
      openLogin,
      t$: useI18n().t,
    };
  },
});
