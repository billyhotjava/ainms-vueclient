import { computed, defineComponent, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import LogsService from './logs.service';
import { orderAndFilterBy } from '@/shared/computables';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AinmsLogs',
  setup() {
    const logsService = inject('logsService', () => new LogsService(), true);

    const loggers = ref<any[]>([]);
    const filtered = ref('');
    const orderProp = ref('name');
    const reverse = ref(false);
    const currentPage = ref(1);
    const pageSize = 10; // 每页显示的日志数量
    const maxVisiblePages = 5; // 最大显示的页码数量

    const filteredLoggers = computed(() =>
      orderAndFilterBy(loggers.value, {
        filterByTerm: filtered.value,
        orderByProp: orderProp.value,
        reverse: reverse.value,
      }),
    );

    const pagedLoggers = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return filteredLoggers.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => Math.ceil(filteredLoggers.value.length / pageSize));

    const init = async () => {
      const response = await logsService.findAll();
      extractLoggers(response);
    };

    const updateLevel = async (name: string, level: string) => {
      await logsService.changeLevel(name, level);
      await init();
    };

    const changeOrder = (orderProp: string) => {
      orderProp.value = orderProp;
      reverse.value = !reverse.value;
    };

    const extractLoggers = (response: any) => {
      loggers.value = [];
      if (response.data) {
        for (const key of Object.keys(response.data.loggers)) {
          const logger = response.data.loggers[key];
          loggers.value.push({ name: key, level: logger.effectiveLevel });
        }
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const changePage = (page: number) => {
      currentPage.value = page;
    };

    const showFirstDots = computed(() => currentPage.value > maxVisiblePages);
    const showLastDots = computed(() => totalPages.value - currentPage.value > maxVisiblePages);

    const visiblePages = computed(() => {
      const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    });

    watch(filtered, () => {
      currentPage.value = 1;
    });

    init(); // 初始化时获取日志数据

    return {
      loggers,
      filtered,
      orderProp,
      reverse,
      currentPage,
      pagedLoggers,
      totalPages,
      init,
      updateLevel,
      changeOrder,
      prevPage,
      nextPage,
      changePage,
      showFirstDots,
      showLastDots,
      visiblePages,
      t$: useI18n().t,
    };
  },
});
