import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import PowerPlantStisticsService from './power-plant-stistics.service';
import { type IPowerPlantStistics } from '@/shared/model/power-plant-stistics.model';
import { useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlantStistics',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const powerPlantStisticsService = inject('powerPlantStisticsService', () => new PowerPlantStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const powerPlantStistics: Ref<IPowerPlantStistics[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrievePowerPlantStisticss = async () => {
      isFetching.value = true;
      try {
        const res = await powerPlantStisticsService().retrieve();
        powerPlantStistics.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrievePowerPlantStisticss();
    };

    onMounted(async () => {
      await retrievePowerPlantStisticss();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IPowerPlantStistics) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removePowerPlantStistics = async () => {
      try {
        await powerPlantStisticsService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.powerPlantStistics.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrievePowerPlantStisticss();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      powerPlantStistics,
      handleSyncList,
      isFetching,
      retrievePowerPlantStisticss,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removePowerPlantStistics,
      t$,
    };
  },
});
