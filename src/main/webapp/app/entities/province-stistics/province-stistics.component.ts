import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ProvinceStisticsService from './province-stistics.service';
import { type IProvinceStistics } from '@/shared/model/province-stistics.model';
import { useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProvinceStistics',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const provinceStisticsService = inject('provinceStisticsService', () => new ProvinceStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const provinceStistics: Ref<IProvinceStistics[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveProvinceStisticss = async () => {
      isFetching.value = true;
      try {
        const res = await provinceStisticsService().retrieve();
        provinceStistics.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveProvinceStisticss();
    };

    onMounted(async () => {
      await retrieveProvinceStisticss();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IProvinceStistics) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeProvinceStistics = async () => {
      try {
        await provinceStisticsService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.provinceStistics.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveProvinceStisticss();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      provinceStistics,
      handleSyncList,
      isFetching,
      retrieveProvinceStisticss,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeProvinceStistics,
      t$,
    };
  },
});
