import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import CountryStisticsService from './country-stistics.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type ICountryStistics, CountryStistics } from '@/shared/model/country-stistics.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CountryStisticsUpdate',
  setup() {
    const countryStisticsService = inject('countryStisticsService', () => new CountryStisticsService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const countryStistics: Ref<ICountryStistics> = ref(new CountryStistics());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCountryStistics = async countryStisticsId => {
      try {
        const res = await countryStisticsService().find(countryStisticsId);
        res.statisticTime = new Date(res.statisticTime);
        countryStistics.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.countryStisticsId) {
      retrieveCountryStistics(route.params.countryStisticsId);
    }

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
    };
    const v$ = useVuelidate(validationRules, countryStistics as any);
    v$.value.$validate();

    return {
      countryStisticsService,
      alertService,
      countryStistics,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      ...useDateFormat({ entityRef: countryStistics }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.countryStistics.id) {
        this.countryStisticsService()
          .update(this.countryStistics)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.countryStistics.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.countryStisticsService()
          .create(this.countryStistics)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.countryStistics.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
