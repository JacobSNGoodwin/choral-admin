import { auditionsRef } from '@/firebase/firebaseInit';

export default {
  namespaced: true,
  state: {
    auditionsList: [],
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    createAudition({ commit }, auditionData) {
      commit('setLoading', true);
      commit('setError', null);


      auditionsRef.add(auditionData)
        .then((docRef) => {
          console.log('Add doc with docId: ', docRef.id);
          commit('setLoading', false);
          return docRef.id;
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
  },
  getters: {
  },
};
