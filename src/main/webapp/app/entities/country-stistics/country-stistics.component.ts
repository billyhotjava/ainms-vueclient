import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CountryStisticsService from './country-stistics.service';
import { type ICountryStistics } from '@/shared/model/country-stistics.model';
import { useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CountryStistics',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const countryStisticsService = inject('countryStisticsService', () => new CountryStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const countryStistics: Ref<ICountryStistics[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveCountryStisticss = async () => {
      isFetching.value = true;
      try {
        const res = await countryStisticsService().retrieve();
        countryStistics.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveCountryStisticss();
    };

    onMounted(async () => {
      await retrieveCountryStisticss();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ICountryStistics) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeCountryStistics = async () => {
      try {
        await countryStisticsService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.countryStistics.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveCountryStisticss();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      countryStistics,
      handleSyncList,
      isFetching,
      retrieveCountryStisticss,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeCountryStistics,
      t$,
    };
  },
});
