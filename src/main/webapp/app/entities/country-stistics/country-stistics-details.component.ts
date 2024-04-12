import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import CountryStisticsService from './country-stistics.service';
import { useDateFormat } from '@/shared/composables';
import { type ICountryStistics } from '@/shared/model/country-stistics.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CountryStisticsDetails',
  setup() {
    const dateFormat = useDateFormat();
    const countryStisticsService = inject('countryStisticsService', () => new CountryStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const countryStistics: Ref<ICountryStistics> = ref({});

    const retrieveCountryStistics = async countryStisticsId => {
      try {
        const res = await countryStisticsService().find(countryStisticsId);
        countryStistics.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.countryStisticsId) {
      retrieveCountryStistics(route.params.countryStisticsId);
    }

    return {
      ...dateFormat,
      alertService,
      countryStistics,

      previousState,
      t$: useI18n().t,
    };
  },
});
