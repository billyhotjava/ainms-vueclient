import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import PowerPlantStisticsService from './power-plant-stistics.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import ProvinceStisticsService from '@/entities/province-stistics/province-stistics.service';
import { type IProvinceStistics } from '@/shared/model/province-stistics.model';
import { type IPowerPlantStistics, PowerPlantStistics } from '@/shared/model/power-plant-stistics.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PowerPlantStisticsUpdate',
  setup() {
    const powerPlantStisticsService = inject('powerPlantStisticsService', () => new PowerPlantStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const powerPlantStistics: Ref<IPowerPlantStistics> = ref(new PowerPlantStistics());

    const provinceStisticsService = inject('provinceStisticsService', () => new ProvinceStisticsService());

    const provinceStistics: Ref<IProvinceStistics[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrievePowerPlantStistics = async powerPlantStisticsId => {
      try {
        const res = await powerPlantStisticsService().find(powerPlantStisticsId);
        res.statisticTime = new Date(res.statisticTime);
        powerPlantStistics.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.powerPlantStisticsId) {
      retrievePowerPlantStistics(route.params.powerPlantStisticsId);
    }

    const initRelationships = () => {
      provinceStisticsService()
        .retrieve()
        .then(res => {
          provinceStistics.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      name: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      totalCount: {},
      onlineCount: {},
      offlineCount: {},
      otherCount: {},
      statisticDate: {},
      statisticTime: {},
      province: {},
    };
    const v$ = useVuelidate(validationRules, powerPlantStistics as any);
    v$.value.$validate();

    return {
      powerPlantStisticsService,
      alertService,
      powerPlantStistics,
      previousState,
      isSaving,
      currentLanguage,
      provinceStistics,
      v$,
      ...useDateFormat({ entityRef: powerPlantStistics }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.powerPlantStistics.id) {
        this.powerPlantStisticsService()
          .update(this.powerPlantStistics)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.powerPlantStistics.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.powerPlantStisticsService()
          .create(this.powerPlantStistics)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.powerPlantStistics.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
