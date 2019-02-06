import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './modules/auth';
import adminModule from './modules/admin';
import performanceModule from './modules/performances';
import auditionsModule from './modules/auditions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    adminModule,
    performanceModule,
    auditionsModule,
  },
});
