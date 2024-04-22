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
    const selectedDate = inject('selectedDate');
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

    const handleSyncListByDate = async () => {
      isFetching.value = true;
      try {
        console.log("selectedDate.value", selectedDate.value);
        const res = await powerPlantStisticsService().retrieveByDate(selectedDate.value);
        powerPlantStistics.value = res.data;
      } catch (err) {
        if (err.response){
          alertService.showHttpError(err.response);
        }else{
          console.error(err);
          alertService.showErrorMessage('An error occurred while fetching data');
        }
      } finally {
        isFetching.value = false;
      }
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
      handleSyncListByDate,
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
  methods:{
    formatTime(timeStr) {
      if (!timeStr) return '';
      // 假设时间是以 'HH:mm:ss' 格式传来的
      const [hours, minutes, seconds] = timeStr.split(':');
      // 创建一个今天日期但特定时间的Date对象
      const time = new Date();
      time.setHours(parseInt(hours));
      time.setMinutes(parseInt(minutes));
      time.setSeconds(parseInt(seconds));
      
      // 格式化时间显示为 12 小时制，带有 AM/PM
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).format(time);
    },
    downloadCsvByPowerPlant() {
      const csvRows = [];
      // CSV Header
      // const headers = ""
      const headers = "Province Name, Total APs, StandBy AP Count, Offline AP Count, Other AP Count, Rate, Date, Time";
      csvRows.push(headers);
  
      // CSV Rows
      this.powerPlantStistics.forEach(item => {
        const row = [
          item.name,
          item.totalCount,
          item.onlineCount,
          item.offlineCount,
          item.otherCount,
          `${((item.onlineCount / item.totalCount) * 100).toFixed(1)}%`,
          item.statisticDate,
          item.statisticTime
        ].join(",");
        csvRows.push(row);
      });
  
      const csvString = csvRows.join("\n");
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "apStatisticsByProvinces.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 
  }
});
