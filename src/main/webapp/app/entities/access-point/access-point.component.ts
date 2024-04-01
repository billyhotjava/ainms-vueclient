import { defineComponent, inject, onMounted, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import AccessPointService from './access-point.service';
import { type IAccessPoint } from '@/shared/model/access-point.model';
import { useAlertService } from '@/shared/alert/alert.service';
import AccessPointGroupService from '@/entities/access-point-group/access-point-group.service';
import type { IAccessController } from '@/shared/model/access-controller.model';
import AccessControllerService from '@/entities/access-controller/access-controller.service';
import PowerPlantService from '@/entities/power-plant/power-plant.service';
import type { IAccessPointGroup } from '@/shared/model/access-point-group.model';
import type { IPowerPlant } from '@/shared/model/power-plant.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPoint',
  setup() {
    const { t: t$ } = useI18n();
    const accessPointService = inject('accessPointService', () => new AccessPointService());
    const alertService = inject('alertService', () => useAlertService(), true);

    // join view
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const accessControllers: Ref<IAccessController[]> = ref([]);
    const accessPointGroups: Ref<IAccessPointGroup[]> = ref([]);
    const powerPlants: Ref<IPowerPlant[]> = ref([]);
    // end join view
    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const totalItems = ref(0);

    const accessPoints: Ref<IAccessPoint[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {
      page.value = 1;
    };

    const sort = (): Array<any> => {
      const result = [propOrder.value + ',' + (reverse.value ? 'desc' : 'asc')];
      if (propOrder.value !== 'id') {
        result.push('id');
      }
      return result;
    };

    const retrieveAccessPoints = async () => {
      isFetching.value = true;
      try {
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sort(),
        };
        const res = await accessPointService().retrieve(paginationQuery);
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        accessPoints.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const initRelationships = () => {
      accessPointGroupService()
        .retrieve()
        .then(res => {
          accessPointGroups.value = res.data;
      });
      accessControllerService()
        .retrieve()
        .then(res => {
          accessControllers.value = res.data;
        });
      powerPlantService()
        .retrieve()
        .then(res => {
          powerPlants.value = res.data;
        });
    };
    initRelationships();

    const handleSyncList = () => {
      retrieveAccessPoints();
    };

    onMounted(async () => {
      await retrieveAccessPoints();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IAccessPoint) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeAccessPoint = async () => {
      try {
        await accessPointService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.accessPoint.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveAccessPoints();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    const changeOrder = (newOrder: string) => {
      if (propOrder.value === newOrder) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = false;
      }
      propOrder.value = newOrder;
    };

    // Whenever order changes, reset the pagination
    watch([propOrder, reverse], async () => {
      if (page.value === 1) {
        // first page, retrieve new data
        await retrieveAccessPoints();
      } else {
        // reset the pagination
        clear();
      }
    });

    // Whenever page changes, switch to the new page.
    watch(page, async () => {
      await retrieveAccessPoints();
    });

    return {
      accessPoints,
      powerPlants,
      accessControllers,
      accessPointGroups,
      accessControllerService,
      accessPointGroupService,
      powerPlantService,
      handleSyncList,
      isFetching,
      retrieveAccessPoints,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeAccessPoint,
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
    getPowerPlantName(id) {
      const powerPlantOption = this.powerPlants.find(option => option.id === id);
      return powerPlantOption ? powerPlantOption.powerPlantName : '';
    },
    getAccessControllerName(id) {
      const accessControllerOption = this.accessControllers.find(option => option.id === id);
      return accessControllerOption ? accessControllerOption.nename: '';
    },
    getAccessPointGroupName(id) {
      const accessPointGroupOption = this.accessPointGroups.find(option => option.id === id);
      return accessPointGroupOption ? accessPointGroupOption.name: '';
    },
  },
});
