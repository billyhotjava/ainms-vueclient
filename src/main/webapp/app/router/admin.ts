import { Authority } from '@/shared/security/authority';

const AinmsUserManagementComponent = () => import('@/admin/user-management/user-management.vue');
const AinmsUserManagementViewComponent = () => import('@/admin/user-management/user-management-view.vue');
const AinmsUserManagementEditComponent = () => import('@/admin/user-management/user-management-edit.vue');
const AinmsDocsComponent = () => import('@/admin/docs/docs.vue');
const AinmsConfigurationComponent = () => import('@/admin/configuration/configuration.vue');
const AinmsHealthComponent = () => import('@/admin/health/health.vue');
const AinmsLogsComponent = () => import('@/admin/logs/logs.vue');
const AinmsMetricsComponent = () => import('@/admin/metrics/metrics.vue');

export default [
  {
    path: '/admin/user-management',
    name: 'AinmsUser',
    component: AinmsUserManagementComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/user-management/new',
    name: 'AinmsUserCreate',
    component: AinmsUserManagementEditComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/user-management/:userId/edit',
    name: 'AinmsUserEdit',
    component: AinmsUserManagementEditComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/user-management/:userId/view',
    name: 'AinmsUserView',
    component: AinmsUserManagementViewComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/docs',
    name: 'AinmsDocsComponent',
    component: AinmsDocsComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/health',
    name: 'AinmsHealthComponent',
    component: AinmsHealthComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/logs',
    name: 'AinmsLogsComponent',
    component: AinmsLogsComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/metrics',
    name: 'AinmsMetricsComponent',
    component: AinmsMetricsComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
  {
    path: '/admin/configuration',
    name: 'AinmsConfigurationComponent',
    component: AinmsConfigurationComponent,
    meta: { authorities: [Authority.ADMIN] },
  },
];
