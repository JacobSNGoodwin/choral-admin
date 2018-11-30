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
    createNewAdmin({commit}, payload) {
      // first, create user with email address
      // after successful creation of user, add uid and user data to database
      // send password reset email to user
      // commit mutation to add to admin list
      // route user back to admins list
      console.log(payload);
    },
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
