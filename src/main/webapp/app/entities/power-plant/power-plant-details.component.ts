import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import PowerPlantService from './power-plant.service';
import { type IPowerPlant } from '@/shared/model/power-plant.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlantDetails',
  setup() {
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const powerPlant: Ref<IPowerPlant> = ref({});

    const retrievePowerPlant = async powerPlantId => {
      try {
        const res = await powerPlantService().find(powerPlantId);
        powerPlant.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.powerPlantId) {
      retrievePowerPlant(route.params.powerPlantId);
    }

    return {
      alertService,
      powerPlant,

      previousState,
      t$: useI18n().t,
    };
  },
});
