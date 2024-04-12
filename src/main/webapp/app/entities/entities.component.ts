import { defineComponent, provide } from 'vue';

import CountryStisticsService from './country-stistics/country-stistics.service';
import ProvinceStisticsService from './province-stistics/province-stistics.service';
import PowerPlantStisticsService from './power-plant-stistics/power-plant-stistics.service';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('countryStisticsService', () => new CountryStisticsService());
    provide('provinceStisticsService', () => new ProvinceStisticsService());
    provide('powerPlantStisticsService', () => new PowerPlantStisticsService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
