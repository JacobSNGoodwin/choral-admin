import { adminsRef } from '@/firebase/firebaseInit';

export default {
  state: {
    adminList: [],
  },
  mutations: {
    setAdminList(state, payload) {
      state.adminList = payload;
    },
  },
  actions: {
    loadAdmins({ commit }) {
      const adminList = [];
      adminsRef.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            adminList.push(doc.id);
          });
          commit('setAdminList', adminList);
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
  },
};
