import { defineComponent, inject, onMounted, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import AccessPointGroupService from './access-point-group.service';
import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';
import { useAlertService } from '@/shared/alert/alert.service';
import AccessControllerService from '@/entities/access-controller/access-controller.service';
import PowerPlantService from '@/entities/power-plant/power-plant.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointGroup',
  setup() {
    const { t: t$ } = useI18n();
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const alertService = inject('alertService', () => useAlertService(), true);

    // add for join view
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const accessControllers: Ref<IAccessController[]> = ref([]);
    const powerPlants: Ref<IPowerPlant[]> = ref([]);
    // end for join view

    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const totalItems = ref(0);

    const accessPointGroups: Ref<IAccessPointGroup[]> = ref([]);

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

    const retrieveAccessPointGroups = async () => {
      isFetching.value = true;
      try {
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sort(),
        };
        const res = await accessPointGroupService().retrieve(paginationQuery);
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        accessPointGroups.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };


    const initRelationships = () => {
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
      retrieveAccessPointGroups();
    };

    onMounted(async () => {
      await retrieveAccessPointGroups();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IAccessPointGroup) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeAccessPointGroup = async () => {
      try {
        await accessPointGroupService().delete(removeId.value);
        const message = t$('ainmsVueclientApp.accessPointGroup.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveAccessPointGroups();
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
        await retrieveAccessPointGroups();
      } else {
        // reset the pagination
        clear();
      }
    });

    // Whenever page changes, switch to the new page.
    watch(page, async () => {
      await retrieveAccessPointGroups();
    });

    return {
      accessPointGroups,
      accessControllers,
      powerPlants,
      handleSyncList,
      isFetching,
      retrieveAccessPointGroups,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeAccessPointGroup,
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
    }
  },
});
