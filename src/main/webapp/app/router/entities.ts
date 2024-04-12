import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const CountryStistics = () => import('@/entities/country-stistics/country-stistics.vue');
const CountryStisticsUpdate = () => import('@/entities/country-stistics/country-stistics-update.vue');
const CountryStisticsDetails = () => import('@/entities/country-stistics/country-stistics-details.vue');

const ProvinceStistics = () => import('@/entities/province-stistics/province-stistics.vue');
const ProvinceStisticsUpdate = () => import('@/entities/province-stistics/province-stistics-update.vue');
const ProvinceStisticsDetails = () => import('@/entities/province-stistics/province-stistics-details.vue');

const PowerPlantStistics = () => import('@/entities/power-plant-stistics/power-plant-stistics.vue');
const PowerPlantStisticsUpdate = () => import('@/entities/power-plant-stistics/power-plant-stistics-update.vue');
const PowerPlantStisticsDetails = () => import('@/entities/power-plant-stistics/power-plant-stistics-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'country-stistics',
      name: 'CountryStistics',
      component: CountryStistics,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'country-stistics/new',
      name: 'CountryStisticsCreate',
      component: CountryStisticsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'country-stistics/:countryStisticsId/edit',
      name: 'CountryStisticsEdit',
      component: CountryStisticsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'country-stistics/:countryStisticsId/view',
      name: 'CountryStisticsView',
      component: CountryStisticsDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province-stistics',
      name: 'ProvinceStistics',
      component: ProvinceStistics,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province-stistics/new',
      name: 'ProvinceStisticsCreate',
      component: ProvinceStisticsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province-stistics/:provinceStisticsId/edit',
      name: 'ProvinceStisticsEdit',
      component: ProvinceStisticsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province-stistics/:provinceStisticsId/view',
      name: 'ProvinceStisticsView',
      component: ProvinceStisticsDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant-stistics',
      name: 'PowerPlantStistics',
      component: PowerPlantStistics,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant-stistics/new',
      name: 'PowerPlantStisticsCreate',
      component: PowerPlantStisticsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant-stistics/:powerPlantStisticsId/edit',
      name: 'PowerPlantStisticsEdit',
      component: PowerPlantStisticsUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant-stistics/:powerPlantStisticsId/view',
      name: 'PowerPlantStisticsView',
      component: PowerPlantStisticsDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
