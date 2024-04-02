import { type ComputedRef, defineComponent, inject,onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as echarts from 'echarts';
import type LoginService from '@/account/login.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const loginService = inject<LoginService>('loginService');

    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');

    const openLogin = () => {
      loginService.login();
    };

    const option = ref({
      title:{
        text:'AP 分布图',
      },
      xAxis: {
        type: 'category',
        data: ['北京', '天津', '新疆', '内蒙古', '广西', '福建', '陕西'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    });

    // insert charts
    const chartRef = ref(null);
    onMounted(()=> {
      if(!chartRef.value) return;
      const homeChart = echarts.init(chartRef.value);
      homeChart.setOption(option.value);
    });

    return {
      authenticated,
      username,
      openLogin,
      t$: useI18n().t,
      chartRef,
      option
    };
  },
});
