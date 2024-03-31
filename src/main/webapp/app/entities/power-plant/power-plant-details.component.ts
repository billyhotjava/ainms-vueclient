import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import ProvinceService from '@/entities/province/province.service';
import PowerPlantService from './power-plant.service';
import { type IPowerPlant } from '@/shared/model/power-plant.model';
import { useAlertService } from '@/shared/alert/alert.service';
import { type IProvince } from '@/shared/model/province.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlantDetails',
  setup() {
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const alertService = inject('alertService', () => useAlertService(), true);
    const provinceService = inject('provinceService', () => new ProvinceService());
    const route = useRoute();
    const router = useRouter();
    const provinces: Ref<IProvince[]> = ref([]);
    const previousState = () => router.go(-1);
    const powerPlant: Ref<IPowerPlant> = ref({});
    const matchedpowerPlant: Ref<IPowerPlant> = ref({});

    const retrievePowerPlant = async (powerPlantId) => {
        await initRelationships(); // 等待获取省份信息完成
        const res = await powerPlantService().find(powerPlantId);
        powerPlant.value = res;
        await matchProvince(res.province.id);
    };

    const matchProvince = async (provinceId) => {
      await initRelationships(); // 等待获取省份信息完成

      const matchedProvince = provinces.value.find((province) => province.id === provinceId);
      if (matchedProvince) {
        matchedpowerPlant.value.province = matchedProvince; // 将匹配的省份赋值给电厂对象
      }
    };

    const initRelationships = async () => {
      try {
        const res = await provinceService().retrieve();
        provinces.value = res.data;
      } catch (error) {
        // 错误处理
        console.error("Error retrieving provinces:", error);
      }
    };

    if (route.params?.powerPlantId) {
      retrievePowerPlant(route.params.powerPlantId);
    }

    return {
      alertService,
      powerPlant,
      matchedpowerPlant,
      previousState,
      t$: useI18n().t,
    };
  },
});
