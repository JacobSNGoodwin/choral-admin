import { auditionsRef } from '@/firebase/firebaseInit';

export default {
  namespaced: true,
  state: {
    auditionList: [],
    loading: false,
    error: null,
  },
  mutations: {
    setAuditionList(state, payload) {
      state.auditionList = payload;
    },
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
          commit('setLoading', false);
          return docRef.id;
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    loadAuditions({ commit }) {
      commit('setLoading', true);
      commit('setError', null);

      auditionsRef.orderBy('date').get()
        .then((querySnapshot) => {
          const auditionList = [];
          querySnapshot.forEach((doc) => {
            const audition = { id: doc.id, data: doc.data() };
            const dateUTC = new Date(audition.data.date).toString();
            audition.data.dateUTC = dateUTC;
            auditionList.push(audition);
          });
          commit('setAuditionList', auditionList);
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    auditionList(state) {
      return state.auditionList;
    },
    error(state) {
      return state.error;
    },
  },
};
