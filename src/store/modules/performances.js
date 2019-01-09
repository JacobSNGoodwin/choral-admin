import { performancesRef, storageRef } from '@/firebase/firebaseInit';
import router from '@/router/router';

export default {
  namespaced: true,
  state: {
    performanceList: [],
    loading: false,
    error: null,
  },
  mutations: {
    setPerformanceList(state, payload) {
      state.performanceList = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    createPerformance({ commit }, payload) {
      commit('setLoading', true);
      commit('setError', null);

      // declare outside of promise chain to access farther down the chain
      let eventId = null;
      if (payload.imageFile) {
        // store file if it's available
        // could do if block inside of promise chain, too
        performancesRef.add(payload.newPerformance)
          .then((docRef) => {
            eventId = docRef.id;
            const fileExt = payload.imageFile.name.split('.').pop();
            const storagePath = `/events/${eventId}/eventImage.${fileExt}`;
            const metadata = { contentType: payload.imageFile.type };

            return storageRef.child(storagePath).put(payload.imageFile, metadata);
          })
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then(url =>
            performancesRef.doc(eventId).set({
              downloadURL: url,
            }, { merge: true }))
          .then(() => {
            // if successful route to manageAdmins, which will call loadAmins
            commit('setLoading', false);
            router.push({ name: 'managePerformances' });
          })
          .catch((error) => {
            commit('setError', error.message);
            commit('setLoading', false);
          });
      } else {
        performancesRef.add({ ...payload.newPerformance, downloadURL: null })
          .then(() => {
            commit('setLoading', false);
            router.push({ name: 'managePerformances' });
          })
          .catch((error) => {
            commit('setError', error.message);
            commit('setLoading', false);
          });
      }
    },
    loadPerformances({ commit }) {
      commit('setLoading', true);
      commit('setError', null);

      const performanceList = [];
      performancesRef.orderBy('date').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const performance = { id: doc.id, data: doc.data() };
            const dateUTC = new Date(performance.data.date).toString();
            performance.data.dateUTC = dateUTC;
            performanceList.push(performance);
          });
          commit('setPerformanceList', performanceList);
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    editPerformance({ commit }, payload) {
      commit('setLoading', true);
      commit('setError', null);

      // declare outside of promise chain to access farther down the chain
      if (payload.imageFile) {
        // store file if it's available
        // could do if block inside of promise chain, too
        const fileExt = payload.imageFile.name.split('.').pop();
        const storagePath = `/events/${payload.performanceId}/eventImage.${fileExt}`;
        const metadata = { contentType: payload.imageFile.type };
        storageRef.child(storagePath).put(payload.imageFile, metadata)
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then(url =>
            performancesRef.doc(payload.performanceId).set({
              ...payload.editedPerformance,
              downloadURL: url,
            }))
          .then(() => {
            // if successful route to manageAdmins, which will call loadAmins
            commit('setLoading', false);
            router.push({ name: 'managePerformances' });
          })
          .catch((error) => {
            commit('setError', error.message);
            commit('setLoading', false);
          });
      } else {
        performancesRef.doc(payload.performanceId).set(payload.editedPerformance)
          .then(() => {
            commit('setLoading', false);
            router.push({ name: 'managePerformances' });
          })
          .catch((error) => {
            commit('setError', error.message);
            commit('setLoading', false);
          });
      }
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    performanceList(state) {
      return state.performanceList;
    },
    error(state) {
      return state.error;
    },
  },
};
