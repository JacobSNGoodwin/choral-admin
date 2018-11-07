import Vue from 'vue';
import Router from 'vue-router';

import AdminPanel from '@/views/AdminPanel.vue';
import Login from '@/views/Login.vue';
import ManageAdmins from '@/views/ManageAdmins.vue';
import ManagePerformances from '@/views/ManagePerformances.vue';
import ManageAuditions from '@/views/ManageAuditions.vue';


import adminAuthGuard from './admin-auth-guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'admin-panel',
      component: AdminPanel,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/manage/admins',
      name: 'manageAdmins',
      component: ManageAdmins,
      linkLabel: 'Manage Admins',
    },
    {
      path: '/manage/performances',
      name: 'managePerformances',
      component: ManagePerformances,
      linkLabel: 'Manage Performances',
    },
    {
      path: '/manage/Auditions',
      name: 'manageAuditions',
      component: ManageAuditions,
      linkLabel: 'Manage Auditions',
    },
  ],
});

router.beforeEach(adminAuthGuard);

export default router;
