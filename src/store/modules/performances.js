// import { adminsRef, storageRef } from '@/firebase/firebaseInit';
// import router from '@/router/router';

export default {
  namespaced: true,
  state: {
    performanceList: [],
    loading: false,
    error: null,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
};
