import Vue from 'vue';
import Router from 'vue-router';

import AdminDashboard from '@/views/AdminDashboard.vue';
import EmailVerification from '@/views/EmailVerification.vue';
import Login from '@/views/Login.vue';
import ManageAdmins from '@/views/Admins/ManageAdmins.vue';
import CreateAdmin from '@/views/Admins/CreateAdmin.vue';
import ConfirmAdmin from '@/views/Admins/ConfirmAdmin.vue';
import EditAdmin from '@/views/Admins/EditAdmin.vue';
import ManagePerformances from '@/views/Performances/ManagePerformances.vue';
import CreatePerformance from '@/views/Performances/CreatePerformance.vue';
import ManageAuditions from '@/views/ManageAuditions.vue';


import adminAuthGuard from './admin-auth-guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
    {
      path: '/emailverification',
      name: 'emailVerification',
      component: EmailVerification,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admins',
      name: 'manageAdmins',
      component: ManageAdmins,
      linkLabel: 'Admins',
      linkStyle: 'is-primary',
    },
    {
      path: '/admins/create',
      name: 'createAdmin',
      component: CreateAdmin,
    },
    {
      path: '/admins/confirm/*',
      name: 'confirmAdmin',
      component: ConfirmAdmin,
    },
    {
      path: '/admins/:id/edit',
      name: 'editAdmin',
      component: EditAdmin,
      props: true,
    },
    {
      path: '/performances',
      name: 'managePerformances',
      component: ManagePerformances,
      linkLabel: 'Performances',
      linkStyle: 'is-link',
    },
    {
      path: '/performances/create',
      name: 'createPerformance',
      component: CreatePerformance,
    },
    {
      path: '/manage/Auditions',
      name: 'manageAuditions',
      component: ManageAuditions,
      linkLabel: 'Auditions',
      linkStyle: 'is-info',
    },
  ],
});

router.beforeEach(adminAuthGuard);

export default router;
