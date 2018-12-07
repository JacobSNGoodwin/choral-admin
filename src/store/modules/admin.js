import { adminsRef } from '@/firebase/firebaseInit';

export default {
  namespaced: true,
  state: {
    adminList: [],
    loading: false,
    error: null,
  },
  mutations: {
    setAdminList(state, payload) {
      state.adminList = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    loadAdmins({ commit }) {
      commit('setLoading', true);
      commit('setError', null);

      const adminList = [];
      adminsRef.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const admin = { id: doc.id, data: doc.data() };
            adminList.push(admin);
          });
          commit('setAdminList', adminList);
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setError', error.message);
        });
    },
  },
  getters: {
    adminList(state) {
      return state.adminList;
    },
    loading(state) {
      return state.loading;
    },
  },
};
