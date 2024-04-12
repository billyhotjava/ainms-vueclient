import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const AccessController = () => import('@/entities/access-controller/access-controller.vue');
const AccessControllerUpdate = () => import('@/entities/access-controller/access-controller-update.vue');
const AccessControllerDetails = () => import('@/entities/access-controller/access-controller-details.vue');

const AccessPoint = () => import('@/entities/access-point/access-point.vue');
const AccessPointUpdate = () => import('@/entities/access-point/access-point-update.vue');
const AccessPointDetails = () => import('@/entities/access-point/access-point-details.vue');

const AccessPointGroup = () => import('@/entities/access-point-group/access-point-group.vue');
const AccessPointGroupUpdate = () => import('@/entities/access-point-group/access-point-group-update.vue');
const AccessPointGroupDetails = () => import('@/entities/access-point-group/access-point-group-details.vue');

const PowerPlant = () => import('@/entities/power-plant/power-plant.vue');
const PowerPlantUpdate = () => import('@/entities/power-plant/power-plant-update.vue');
const PowerPlantDetails = () => import('@/entities/power-plant/power-plant-details.vue');

const Province = () => import('@/entities/province/province.vue');
const ProvinceUpdate = () => import('@/entities/province/province-update.vue');
const ProvinceDetails = () => import('@/entities/province/province-details.vue');
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
      path: 'access-controller',
      name: 'AccessController',
      component: AccessController,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-controller/new',
      name: 'AccessControllerCreate',
      component: AccessControllerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-controller/:accessControllerId/edit',
      name: 'AccessControllerEdit',
      component: AccessControllerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-controller/:accessControllerId/view',
      name: 'AccessControllerView',
      component: AccessControllerDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point',
      name: 'AccessPoint',
      component: AccessPoint,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point/new',
      name: 'AccessPointCreate',
      component: AccessPointUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point/:accessPointId/edit',
      name: 'AccessPointEdit',
      component: AccessPointUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point/:accessPointId/view',
      name: 'AccessPointView',
      component: AccessPointDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point-group',
      name: 'AccessPointGroup',
      component: AccessPointGroup,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point-group/new',
      name: 'AccessPointGroupCreate',
      component: AccessPointGroupUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point-group/:accessPointGroupId/edit',
      name: 'AccessPointGroupEdit',
      component: AccessPointGroupUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'access-point-group/:accessPointGroupId/view',
      name: 'AccessPointGroupView',
      component: AccessPointGroupDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant',
      name: 'PowerPlant',
      component: PowerPlant,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant/new',
      name: 'PowerPlantCreate',
      component: PowerPlantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant/:powerPlantId/edit',
      name: 'PowerPlantEdit',
      component: PowerPlantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'power-plant/:powerPlantId/view',
      name: 'PowerPlantView',
      component: PowerPlantDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province',
      name: 'Province',
      component: Province,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province/new',
      name: 'ProvinceCreate',
      component: ProvinceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province/:provinceId/edit',
      name: 'ProvinceEdit',
      component: ProvinceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province/:provinceId/view',
      name: 'ProvinceView',
      component: ProvinceDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'province-stistics',
      name: 'ProvinceStistics',
      component: ProvinceStistics,
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
      path: 'power-plant-stistics/:powerPlantStisticsId/view',
      name: 'PowerPlantStisticsView',
      component: PowerPlantStisticsDetails,
      meta: { authorities: [Authority.USER] },
    },
  ],
};
