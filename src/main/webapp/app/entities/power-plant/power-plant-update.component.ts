import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import PowerPlantService from './power-plant.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import ProvinceService from '@/entities/province/province.service';
import { type IProvince } from '@/shared/model/province.model';
import { type IPowerPlant, PowerPlant } from '@/shared/model/power-plant.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlantUpdate',
  setup() {
    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const powerPlant: Ref<IPowerPlant> = ref(new PowerPlant());

    const provinceService = inject('provinceService', () => new ProvinceService());

    const provinces: Ref<IProvince[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrievePowerPlant = async powerPlantId => {
      try {
        const res = await powerPlantService().find(powerPlantId);
        powerPlant.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.powerPlantId) {
      retrievePowerPlant(route.params.powerPlantId);
    }

    const initRelationships = () => {
      provinceService()
        .retrieve()
        .then(res => {
          provinces.value = res.data;
          console.log(provinces.value)
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      powerPlantName: {},
      province: {},
    };
    const v$ = useVuelidate(validationRules, powerPlant as any);
    v$.value.$validate();

    return {
      powerPlantService,
      alertService,
      powerPlant,
      previousState,
      isSaving,
      currentLanguage,
      provinces,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.powerPlant.id) {
        this.powerPlantService()
          .update(this.powerPlant)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.powerPlant.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.powerPlantService()
          .create(this.powerPlant)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.powerPlant.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
