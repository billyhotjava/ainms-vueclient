import { defineComponent, inject, onMounted, ref, type Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import PowerPlantService from '../power-plant/power-plant.service';
import AccessPointService from './access-point.service';
import { type IAccessPoint } from '@/shared/model/access-point.model';
import { useAlertService } from '@/shared/alert/alert.service';
import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';
import AccessPointGroupService from '../access-point-group/access-point-group.service';
import ProvinceService from '../province/province.service';
import AccessControllerService from '../access-controller/access-controller.service';
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPoint',
  setup() {
    const { t: t$ } = useI18n();
    const accessPointService = inject('accessPointService', () => new AccessPointService());
    const alertService = inject('alertService', () => useAlertService(), true);
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const provinceService = inject('provinceService', () => new ProvinceService());
    const itemsPerPage = ref(20);
    const queryCount: Ref<number> = ref(null);

    const apg: Ref<IAccessPointGroup[]> = ref([]);
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
      const retrieveAllAccessPointGroups = async () => {
        try {
          const allAccessPointGroups = [];
          let page = 0;
          let hasMoreData = true;
      
          while (hasMoreData) {
            const paginationQuery = {
              page: page,
              size: itemsPerPage.value,
              sort: sort(),
            };
            const accessPointGroups = await accessPointGroupService().retrieve(paginationQuery);
            const responseData = accessPointGroups.data;
      
            // 如果没有返回数据，则停止检索
            if (responseData.length === 0) {
              hasMoreData = false;
            } else {
              // 将返回的数据添加到所有数据数组中
              allAccessPointGroups.push(...responseData);
              // 增加页码以检索下一页数据
              page++;
            }
          }
          // 返回所有数据
          return allAccessPointGroups;
        } catch (err) {
          alertService.showHttpError(err.response);
        }
      };
      
      try {
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sort(),
        };
        const res_apg = await retrieveAllAccessPointGroups()
        const res_station = await powerPlantService().retrieve_name()
        const res_ac = await accessControllerService().retrieve(1);
        console.log('res_ac', res_ac)
        const res_pro = await provinceService().retrieve();
        console.log(res_pro)
        console.log('场站',res_station)
        console.log('ap组',  res_apg)
        const res = await accessPointService().retrieve(paginationQuery);
        console.log('AP数据',  res.data[0])
        for(let i=0;i<res.data.length;i++){
          for(let j=0;j<res_apg.length;j++){
            if(res.data[i].group.id==res_apg[j].id){
              res.data[i].group=res_apg[j]
            }
          }
        }
        for(let k=0;k<res_apg.length;k++){
          for(let m=0;m<res_station.data.length;m++){
            if(res_apg[k].powerPlant.id==res_station.data[m].powerPlant.id){
              res_apg[k].powerPlant=res_station.data[m].powerPlant
            }
          }
        }
        for(let l=0;l<res_apg.length;l++){
          for(let s=0;s<res_pro.data.length;s++){
            if(res_apg[l].powerPlant.province.id==res_pro.data[s].id)
            {
              res_apg[l].powerPlant.province=res_pro.data[s]
            }
          }
        }
        for(let b=0;b<res.data.length;b++){
          for(let a=0;a<res_ac.data.length;a++){
            if(res.data[b].group.controller.id==res_ac.data[a].id)
            console.log(111)
              res.data[b].group.controller=res_ac.data[a]
          }
        }
        totalItems.value = Number(res.headers['x-total-count']);
        queryCount.value = totalItems.value;
        accessPoints.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

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
});
