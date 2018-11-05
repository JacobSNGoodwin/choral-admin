import Vue from 'vue';
import Router from 'vue-router';

import AdminPanel from './views/AdminPanel.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
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
  ],
});
