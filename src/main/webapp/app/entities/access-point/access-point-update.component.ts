import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import AccessPointService from './access-point.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import AccessPointGroupService from '@/entities/access-point-group/access-point-group.service';
import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';
import { type IAccessPoint, AccessPoint } from '@/shared/model/access-point.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointUpdate',
  setup() {
    const accessPointService = inject('accessPointService', () => new AccessPointService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const accessPoint: Ref<IAccessPoint> = ref(new AccessPoint());

    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());

    const accessPointGroups: Ref<IAccessPointGroup[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveAccessPoint = async accessPointId => {
      try {
        const res = await accessPointService().find(accessPointId);
        accessPoint.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.accessPointId) {
      retrieveAccessPoint(route.params.accessPointId);
    }

    const initRelationships = () => {
      accessPointGroupService()
        .retrieve()
        .then(res => {
          accessPointGroups.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      nedn: {},
      neid: {},
      aliasname: {},
      nename: {},
      necategory: {},
      netype: {},
      nevendorname: {},
      neesn: {},
      neip: {},
      nemac: {},
      version: {},
      nestate: {},
      createtime: {},
      neiptype: {},
      subnet: {},
      neosversion: {},
      group: {},
    };
    const v$ = useVuelidate(validationRules, accessPoint as any);
    v$.value.$validate();

    return {
      accessPointService,
      alertService,
      accessPoint,
      previousState,
      isSaving,
      currentLanguage,
      accessPointGroups,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.accessPoint.id) {
        this.accessPointService()
          .update(this.accessPoint)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.accessPoint.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.accessPointService()
          .create(this.accessPoint)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.accessPoint.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
