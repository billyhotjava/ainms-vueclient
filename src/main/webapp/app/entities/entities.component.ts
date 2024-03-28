import { defineComponent, provide } from 'vue';

import AccessControllerService from './access-controller/access-controller.service';
import AccessPointService from './access-point/access-point.service';
import AccessPointGroupService from './access-point-group/access-point-group.service';
import PowerPlantService from './power-plant/power-plant.service';
import ProvinceService from './province/province.service';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('accessControllerService', () => new AccessControllerService());
    provide('accessPointService', () => new AccessPointService());
    provide('accessPointGroupService', () => new AccessPointGroupService());
    provide('powerPlantService', () => new PowerPlantService());
    provide('provinceService', () => new ProvinceService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
