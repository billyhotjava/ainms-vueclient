import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import AccessPointGroupService from './access-point-group.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import AccessControllerService from '@/entities/access-controller/access-controller.service';
import { type IAccessController } from '@/shared/model/access-controller.model';
import PowerPlantService from '@/entities/power-plant/power-plant.service';
import { type IPowerPlant } from '@/shared/model/power-plant.model';
import { type IAccessPointGroup, AccessPointGroup } from '@/shared/model/access-point-group.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AccessPointGroupUpdate',
  setup() {
    const accessPointGroupService = inject('accessPointGroupService', () => new AccessPointGroupService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const accessPointGroup: Ref<IAccessPointGroup> = ref(new AccessPointGroup());

    const accessControllerService = inject('accessControllerService', () => new AccessControllerService());

    const accessControllers: Ref<IAccessController[]> = ref([]);

    const powerPlantService = inject('powerPlantService', () => new PowerPlantService());

    const powerPlants: Ref<IPowerPlant[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const initRelationships = () => {
      accessControllerService()
        .retrieve()
        .then(res => {
          accessControllers.value = res.data;
        });
      powerPlantService()
        .retrieve()
        .then(res => {
          powerPlants.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      name: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      controller: {},
      powerPlant: {},
    };
    const v$ = useVuelidate(validationRules, accessPointGroup as any);
    v$.value.$validate();

    return {
      accessPointGroupService,
      alertService,
      accessPointGroup,
      previousState,
      isSaving,
      currentLanguage,
      accessControllers,
      powerPlants,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.accessPointGroup.id) {
        this.accessPointGroupService()
          .update(this.accessPointGroup)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('ainmsVueclientApp.accessPointGroup.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.accessPointGroupService()
          .create(this.accessPointGroup)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('ainmsVueclientApp.accessPointGroup.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
