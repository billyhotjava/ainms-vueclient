import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import AccessControllerService from './access-controller.service';
import { type IAccessController } from '@/shared/model/access-controller.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessControllerDetails',
  setup() {
    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const accessController: Ref<IAccessController> = ref({});

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

    return {
      alertService,
      accessController,

      previousState,
      t$: useI18n().t,
    };
  },
});
