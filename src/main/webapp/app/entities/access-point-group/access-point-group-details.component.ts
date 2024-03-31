import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import AccessControllerService from '../access-controller/access-controller.service';
import { type IAccessController } from '@/shared/model/access-controller.model';
import PowerPlantService from '../power-plant/power-plant.service';
import { type IPowerPlant } from '@/shared/model/power-plant.model';
import AccessPointGroupService from './access-point-group.service';
import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointGroupDetails',
  setup() {
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const powerPlants: Ref<IPowerPlant[]> = ref([]);
    const alertService = inject('alertService', () => useAlertService(), true);
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const page: Ref<number> = ref(1);
    const route = useRoute();
    const router = useRouter();
    const itemsPerPage = ref(20);
    const propOrder = ref('id');
    const previousState = () => router.go(-1);
    const reverse = ref(false);
    const accessPointGroup: Ref<IAccessPointGroup> = ref({});
    const accessControllers: Ref<IAccessController[]> = ref([]);
    const accessPointGroups: Ref<IAccessPointGroup[]> = ref([]);
    const sort = (): Array<any> => {
      const result = [propOrder.value + ',' + (reverse.value ? 'desc' : 'asc')];
      if (propOrder.value !== 'id') {
        result.push('id');
      }
      return result;
    };
    const retrieveAccessPointGroup = async accessPointGroupId => {
      try {
        const paginationQuery = {
          page: page.value - 1,
          size: itemsPerPage.value,
          sort: sort(),
        };
        const res_AC = await accessControllerService().retrieve(paginationQuery);
        const res_powerplant =await powerPlantService().retrieve();
        console.log('res_powerplant.value是', res_powerplant)
        powerPlants.value=res_powerplant.data
        accessControllers.value = res_AC.data;
        const res = await accessPointGroupService().find(accessPointGroupId);
        accessPointGroup.value = res;
        console.log('原始accessPointGroups,', accessPointGroup)
        for(let i=0;i<res_AC.data.length;i++){
          if(res_AC.data[i].id==res.controller.id){
            res.controller =res_AC.data[i];
          }
        }
        for(let j=0;j<res_powerplant.data.length;j++){
          if(res_powerplant.data[j].powerPlant.id==res.powerPlant.id){
            res.powerPlant =res_powerplant.data[j].powerPlant;
          }
        }
        console.log('后,', accessPointGroup)
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.accessPointGroupId) {
      retrieveAccessPointGroup(route.params.accessPointGroupId);
    }

    return {
      alertService,
      accessPointGroup,
      previousState,
      t$: useI18n().t,
    };
  },
});
