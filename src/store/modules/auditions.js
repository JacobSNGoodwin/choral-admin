import { auditionsRef } from '@/firebase/firebaseInit';

export default {
  namespaced: true,
  state: {
    auditionList: [],
    selectedAudition: null,
    loading: false,
    error: null,
  },
  mutations: {
    setAuditionList(state, payload) {
      state.auditionList = payload;
    },
    setSelectedAudition(state, payload) {
      state.selectedAudition = payload;
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
    editAudition({ commit }, audition) {
      commit('setLoading', true);
      commit('setError', null);

      return auditionsRef.doc(audition.id).update(audition.data)
        .then(() => {
          commit('setLoading', false);
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
    loadAudition({ commit, state }, auditionId) {
      commit('setLoading', true);
      commit('setError', null);

      // check if we have doc in local store
      const currentAudition = state.auditionList.find(audition => audition.id === auditionId);

      if (currentAudition) {
        commit('setSelectedAudition', currentAudition);
        commit('setLoading', false);
      }

      auditionsRef.doc(auditionId).get()
        .then((doc) => {
          if (doc.exists) {
            commit('setSelectedAudition', { id: doc.id, data: doc.data() });
            commit('setLoading', false);
          } else {
            commit('setLoading', false);
            commit('setError', 'Audition not found');
          }
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
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
    selectedAudition(state) {
      return state.selectedAudition;
    },
    error(state) {
      return state.error;
    },
  },
};
