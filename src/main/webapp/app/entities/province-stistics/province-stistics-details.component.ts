import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ProvinceStisticsService from './province-stistics.service';
import { useDateFormat } from '@/shared/composables';
import { type IProvinceStistics } from '@/shared/model/province-stistics.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProvinceStisticsDetails',
  setup() {
    const dateFormat = useDateFormat();
    const provinceStisticsService = inject('provinceStisticsService', () => new ProvinceStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const provinceStistics: Ref<IProvinceStistics> = ref({});

    const retrieveProvinceStistics = async provinceStisticsId => {
      try {
        const res = await provinceStisticsService().find(provinceStisticsId);
        provinceStistics.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.provinceStisticsId) {
      retrieveProvinceStistics(route.params.provinceStisticsId);
    }

    return {
      ...dateFormat,
      alertService,
      provinceStistics,

      previousState,
      t$: useI18n().t,
    };
  },
});
