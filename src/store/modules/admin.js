import { adminsRef, storageRef } from '@/firebase/firebaseInit';
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
      const fileExt = payload.updatedImageFile.name.split('.').pop();

      // make path a consistent name so at most we'll have a png a jpeg file at
      // the reference path. This way, we can forego a delete step for no

      const storagePath = `images/${payload.adminId}/profileImage.${fileExt}`;
      const metadata = { contentType: payload.updatedImageFile.type };

      // store file - on success, get download url and store as part of admin info
      storageRef.child(storagePath).put(payload.updatedImageFile, metadata)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url =>
          adminsRef.doc(payload.adminId).set({
            name: payload.updatedName,
            email: payload.updatedEmail,
            role: payload.updatedRole,
            downloadURL: url,
          }))
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
