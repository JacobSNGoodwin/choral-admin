import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueCroppie from 'vue-croppie';

// Import font-awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faPlusCircle, faCheck, faUser, faUserTie, faCircleNotch, faUpload }
  from '@fortawesome/free-solid-svg-icons';


import App from './App.vue';
import router from './router/router';
import store from './store/store';

// Require the main Sass manifest file
import './assets/sass/main.scss';

// Configure font awesome
library.add(faEnvelope, faKey, faPlusCircle, faCheck, faUser, faUserTie, faCircleNotch, faUpload);
dom.watch(); // Don't know where this is documented, but it gets it working!


Vue.use(VeeValidate);
Vue.use(VueCroppie);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
