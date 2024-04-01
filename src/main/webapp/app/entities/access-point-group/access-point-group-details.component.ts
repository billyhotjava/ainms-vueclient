import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import AccessPointGroupService from './access-point-group.service';
import { type IAccessPointGroup } from '@/shared/model/access-point-group.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointGroupDetails',
  setup() {
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const accessPointGroup: Ref<IAccessPointGroup> = ref({});

    const retrieveAccessPointGroup = async accessPointGroupId => {
      try {
        const res = await accessPointGroupService().find(accessPointGroupId);
        accessPointGroup.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.accessPointGroupId) {
      retrieveAccessPointGroup(route.params.accessPointGroupId);
    }

    return {
      alertService,
      accessPointGroup,

      previousState,
      t$: useI18n().t,
    };
  },
});
