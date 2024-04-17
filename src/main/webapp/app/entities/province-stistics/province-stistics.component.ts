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

    const handleNCEApStatistics = async () => {
      try{
        const res = await provinceStisticsService().handleNCEApStatistics();
      }catch(err){
        alertService.showHttpError(err.response);
      }
      retrieveProvinceStisticss();
    }

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
  methods:{
    formatTime(timeStr) {
      if (!timeStr) return '';
      // 假设时间是以 'HH:mm:ss' 格式传来的
      const [hours, minutes, seconds] = timeStr.split(':');
      const adjustedHours = parseInt(hours) === 24 ? 0 : parseInt(hours);
      // 创建一个今天日期但特定时间的Date对象
      const time = new Date();
      time.setHours(adjustedHours);
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
    downloadCsvByProvince() {
      const csvRows = [];
      // CSV Header
      // const headers = ""
      const headers = "Province Name, Total APs, StandBy AP Count, Offline AP Count, Other AP Count, Rate, Date, Time";
      csvRows.push(headers);
  
      // CSV Rows
      this.provinceStistics.forEach(item => {
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
  },

  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10)
    };
  },
  watch: {
    selectedDate() {
      console.log(this.selectedDate);
    }
  }
});
