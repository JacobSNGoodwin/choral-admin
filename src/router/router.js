import Vue from 'vue';
import Router from 'vue-router';

import AdminPanel from '@/views/AdminPanel.vue';
import Login from '@/views/Login.vue';
import ManageAdmins from '@/views/ManageAdmins.vue';

import adminAuthGuard from './admin-auth-guard';

Vue.use(Router);

const router = new Router({
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
    },
  ],
});

router.beforeEach(adminAuthGuard);

export default router;
