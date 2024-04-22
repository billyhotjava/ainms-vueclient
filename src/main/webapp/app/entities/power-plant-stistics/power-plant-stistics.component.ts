import { defineComponent, inject, onMounted, ref, type Ref, watch } from 'vue';
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
    const selectedDate = ref(new Date().toISOString().slice(0, 10));
    const isFetching = ref(false);

    const itemsPerPage = ref(30);
    const queryCount: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const totalItems = ref(0);

    const clear = () => {
      page.value = 1;
    };

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
        if (!selectedDate) {
          throw new Error('selectedDate is not provided');
        }
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
        };
        console.log('selectedDate.value', selectedDate.value);
        const res = await powerPlantStisticsService().retrieveByDate(selectedDate.value, paginationQuery);
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        powerPlantStistics.value = res.data;
      } catch (err) {
        if (err.response) {
          alertService.showHttpError(err.response);
        } else {
          console.error(err);
          alertService.showError('An error occurred while fetching data');
        }
      } finally {
        isFetching.value = false;
      }
    };

    onMounted(async () => {
      // await retrievePowerPlantStisticss();
      await handleSyncListByDate();
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

    const changeOrder = (newOrder: string) => {
      if (propOrder.value === newOrder) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = false;
      }
      propOrder.value = newOrder;
    };

    watch([propOrder, reverse], async () => {
      if (page.value === 1) {
        // first page, retrieve new data
        await handleSyncListByDate();
      } else {
        // reset the pagination
        clear();
      }
    });

    // Whenever page changes, switch to the new page.
    watch(page, async () => {
      await handleSyncListByDate();
    });

    return {
      powerPlantStistics,
      selectedDate,
      handleSyncListByDate,
      isFetching,
      // retrievePowerPlantStisticss,
      clear,
      ...dateFormat,
      itemsPerPage,
      queryCount,
      page,
      propOrder,
      reverse,
      totalItems,
      changeOrder,
      t$,
    };
  },
  methods: {
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
        hour12: false,
      }).format(time);
    },

    downloadCsvByPowerPlant() {
      window.location.href = 'http://localhost:8080/api/power-plant-stistics/download-csv';
    },
    // downloadCsvByPowerPlant() {
    //   const csvRows = [];
    //   // CSV Header
    //   // const headers = ""
    //   const headers = 'Province Name, Total APs, StandBy AP Count, Offline AP Count, Other AP Count, Rate, Date, Time';
    //   csvRows.push(headers);

    //   // CSV Rows
    //   this.powerPlantStistics.forEach(item => {
    //     const row = [
    //       item.name,
    //       item.totalCount,
    //       item.onlineCount,
    //       item.offlineCount,
    //       item.otherCount,
    //       `${((item.onlineCount / item.totalCount) * 100).toFixed(1)}%`,
    //       item.statisticDate,
    //       item.statisticTime,
    //     ].join(',');
    //     csvRows.push(row);
    //   });

    //   const csvString = csvRows.join('\n');
    //   const BOM = '\uFEFF';
    //   const blob = new Blob([BOM + csvString], { type: 'text/csv;charset=utf-8;' });
    //   const link = document.createElement('a');
    //   if (link.download !== undefined) {
    //     const url = URL.createObjectURL(blob);
    //     link.setAttribute('href', url);
    //     link.setAttribute('download', 'apStatisticsByProvinces.csv');
    //     link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // },
  },
});
