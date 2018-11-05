import Vue from 'vue';
import VeeValidate from 'vee-validate';

// Import font-awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

// Require the main Sass manifest file
import './assets/sass/main.scss';

// Configure font awesome
library.add(faEnvelope, faKey);
dom.watch(); // Don't know where this is documented, but it gets it working!


Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
