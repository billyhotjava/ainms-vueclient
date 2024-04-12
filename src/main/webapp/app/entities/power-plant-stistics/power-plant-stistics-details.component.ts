import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import PowerPlantStisticsService from './power-plant-stistics.service';
import { useDateFormat } from '@/shared/composables';
import { type IPowerPlantStistics } from '@/shared/model/power-plant-stistics.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlantStisticsDetails',
  setup() {
    const dateFormat = useDateFormat();
    const powerPlantStisticsService = inject('powerPlantStisticsService', () => new PowerPlantStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const powerPlantStistics: Ref<IPowerPlantStistics> = ref({});

    const retrievePowerPlantStistics = async powerPlantStisticsId => {
      try {
        const res = await powerPlantStisticsService().find(powerPlantStisticsId);
        powerPlantStistics.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.powerPlantStisticsId) {
      retrievePowerPlantStistics(route.params.powerPlantStisticsId);
    }

    return {
      ...dateFormat,
      alertService,
      powerPlantStistics,

      previousState,
      t$: useI18n().t,
    };
  },
});
