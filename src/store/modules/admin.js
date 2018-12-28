import { adminsRef } from '@/firebase/firebaseInit';
import router from '@/router/router';

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
      adminsRef.orderBy('name').get()
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
    editAdmin({ commit }, payload) {
      commit('setLoading', true);
      commit('setError', null);

      // need to make cloud function for editing

      adminsRef.doc(payload.adminId).set({
        name: payload.updatedName,
        email: payload.updatedEmail,
        role: payload.updatedRole,
      })
        .then(() => {
          // if successful route to manageAdmins, which will call loadAmins
          commit('setLoading', false);
          router.push({ name: 'manageAdmins' });
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
