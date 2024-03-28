import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import AccessControllerService from './access-controller.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IAccessController, AccessController } from '@/shared/model/access-controller.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessControllerUpdate',
  setup() {
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const accessController: Ref<IAccessController> = ref(new AccessController());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveAccessController = async accessControllerId => {
      try {
        const res = await accessControllerService().find(accessControllerId);
        accessController.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.accessControllerId) {
      retrieveAccessController(route.params.accessControllerId);
    }

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
    };
    const v$ = useVuelidate(validationRules, accessController as any);
    v$.value.$validate();

    return {
      accessControllerService,
      alertService,
      accessController,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.accessController.id) {
        this.accessControllerService()
          .update(this.accessController)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.accessController.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.accessControllerService()
          .create(this.accessController)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.accessController.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
