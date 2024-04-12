import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import ProvinceStisticsService from './province-stistics.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import CountryStisticsService from '@/entities/country-stistics/country-stistics.service';
import { type ICountryStistics } from '@/shared/model/country-stistics.model';
import { type IProvinceStistics, ProvinceStistics } from '@/shared/model/province-stistics.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProvinceStisticsUpdate',
  setup() {
    const provinceStisticsService = inject('provinceStisticsService', () => new ProvinceStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const provinceStistics: Ref<IProvinceStistics> = ref(new ProvinceStistics());

    const countryStisticsService = inject('countryStisticsService', () => new CountryStisticsService());

    const countryStistics: Ref<ICountryStistics[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveProvinceStistics = async provinceStisticsId => {
      try {
        const res = await provinceStisticsService().find(provinceStisticsId);
        res.statisticTime = new Date(res.statisticTime);
        provinceStistics.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.provinceStisticsId) {
      retrieveProvinceStistics(route.params.provinceStisticsId);
    }

    const initRelationships = () => {
      countryStisticsService()
        .retrieve()
        .then(res => {
          countryStistics.value = res.data;
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
      country: {},
    };
    const v$ = useVuelidate(validationRules, provinceStistics as any);
    v$.value.$validate();

    return {
      provinceStisticsService,
      alertService,
      provinceStistics,
      previousState,
      isSaving,
      currentLanguage,
      countryStistics,
      v$,
      ...useDateFormat({ entityRef: provinceStistics }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.provinceStistics.id) {
        this.provinceStisticsService()
          .update(this.provinceStistics)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.provinceStistics.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.provinceStisticsService()
          .create(this.provinceStistics)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.provinceStistics.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
