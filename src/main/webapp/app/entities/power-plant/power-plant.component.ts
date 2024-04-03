import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import PowerPlantService from './power-plant.service';
import { type IPowerPlant } from '@/shared/model/power-plant.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlant',
  setup() {
    const { t: t$ } = useI18n();
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const powerPlants: Ref<IPowerPlant[]> = ref([]);
    const isFetching = ref(false);

    const clear = () => {};

    const retrievePowerPlants = async () => {
      isFetching.value = true;
      try {
        const res = await powerPlantService().retrieve_name();
        powerPlants.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrievePowerPlants();
    };

    onMounted(async () => {
      await retrievePowerPlants();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IPowerPlant) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removePowerPlant = async () => {
      try {
        await powerPlantService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.powerPlant.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrievePowerPlants();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      powerPlants,
      handleSyncList,
      isFetching,
      retrievePowerPlants,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removePowerPlant,
      t$,
    };
  },
});
