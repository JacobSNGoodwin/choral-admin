import Vue from 'vue';
import Router from 'vue-router';

import AdminPanel from '@/views/AdminPanel.vue';
import Login from '@/views/Login.vue';
import AdminAuthGuard from './admin-auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin-panel',
      component: AdminPanel,
      beforeEnter: AdminAuthGuard,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
