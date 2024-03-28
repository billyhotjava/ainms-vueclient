import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import AccessPointService from './access-point.service';
import { type IAccessPoint } from '@/shared/model/access-point.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointDetails',
  setup() {
    const accessPointService = inject('accessPointService', () => new AccessPointService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const accessPoint: Ref<IAccessPoint> = ref({});

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

    return {
      alertService,
      accessPoint,

      previousState,
      t$: useI18n().t,
    };
  },
});
