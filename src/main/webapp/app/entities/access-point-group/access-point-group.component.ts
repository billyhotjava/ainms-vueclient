import { defineComponent, inject, onMounted, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import AccessPointGroupService from './access-point-group.service';
import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';
import { useAlertService } from '@/shared/alert/alert.service';
import AccessControllerService from '../access-controller/access-controller.service';
import { type IAccessController } from '@/shared/model/access-controller.model';
import PowerPlantService from '../power-plant/power-plant.service';
import { type IPowerPlant } from '@/shared/model/power-plant.model';
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointGroup',
  setup() {
    const { t: t$ } = useI18n();
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);
    const queryCount_ac: Ref<number> = ref(null);
    const page: Ref<number> = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const totalItems = ref(0);
    const totalItems_AC = ref(0);
    const accessPointGroups: Ref<IAccessPointGroup[]> = ref([]);
    const accessControllers: Ref<IAccessController[]> = ref([]);
    const matchedaccessControllers: Ref<IAccessController[]> = ref([]);
    const isFetching = ref(false);
    const powerPlants: Ref<IPowerPlant[]> = ref([]);
    const matchedpowerPlants: Ref<IPowerPlant[]> = ref([]);
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
        const res_AC = await accessControllerService().retrieve(1);
        console.log('res_AC.data是', res_AC.data)
        const res = await accessPointGroupService().retrieve(paginationQuery);
        const res_powerplant =await powerPlantService().retrieve();
        powerPlants.value=res_powerplant.data
        console.log('场站是', powerPlants.value)
        totalItems_AC.value = Number(res.headers['x-total-count']);
        queryCount_ac.value = totalItems_AC.value;
        accessControllers.value = res_AC.data;
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        accessPointGroups.value = res.data;
        for(let i=0;i<res.data.length;i++){
          for(let j=0;j<res_AC.data.length;j++){
            if(res.data[i].controller.id==res_AC.data[j].id){
              accessPointGroups.value[i].controller =res_AC.data[j].aliasname;
            }
          }
        }
        for(let k=0;k<res.data.length;k++){
          for(let m=0;m<res_powerplant.data.length;m++){
            if(res.data[k].powerPlant.id==res_powerplant.data[m].powerPlant.id){
              res.data[k].powerPlant=res_powerplant.data[m].powerPlant
            }
          }

        }
        // const matchedGroups = res.data.filter(group => accessControllerIds.includes(accessPointGroups.value));
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

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
      matchedpowerPlants,
      matchedaccessControllers,
      queryCount,
      page,
      propOrder,
      reverse,
      totalItems,
      changeOrder,
      t$,
    };
  },
});
