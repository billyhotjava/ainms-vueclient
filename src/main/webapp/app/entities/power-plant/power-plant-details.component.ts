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
        await initRelationships(); // �ȴ���ȡʡ����Ϣ���
        const res = await powerPlantService().find(powerPlantId);
        powerPlant.value = res;
        await matchProvince(res.province.id);
    };

    const matchProvince = async (provinceId) => {
      await initRelationships(); // �ȴ���ȡʡ����Ϣ���

      const matchedProvince = provinces.value.find((province) => province.id === provinceId);
      if (matchedProvince) {
        matchedpowerPlant.value.province = matchedProvince; // ��ƥ���ʡ�ݸ�ֵ���糧����
      }
    };

    const initRelationships = async () => {
      try {
        const res = await provinceService().retrieve();
        provinces.value = res.data;
      } catch (error) {
        // ������
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
