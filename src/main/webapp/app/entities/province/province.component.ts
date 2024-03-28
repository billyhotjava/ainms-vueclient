import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ProvinceService from './province.service';
import { type IProvince } from '@/shared/model/province.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Province',
  setup() {
    const { t: t$ } = useI18n();
    const provinceService = inject('provinceService', () => new ProvinceService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const provinces: Ref<IProvince[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveProvinces = async () => {
      isFetching.value = true;
      try {
        const res = await provinceService().retrieve();
        provinces.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveProvinces();
    };

    onMounted(async () => {
      await retrieveProvinces();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IProvince) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeProvince = async () => {
      try {
        await provinceService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.province.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveProvinces();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      provinces,
      handleSyncList,
      isFetching,
      retrieveProvinces,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeProvince,
      t$,
    };
  },
});
