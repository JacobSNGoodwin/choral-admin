import router from '@/router/router';
import { authRef, adminsRef } from '@/firebase/firebaseInit';

export default {
  state: {
    admin: null,
    loading: false,
    error: null,
  },
  mutations: {
    setAdmin(state, payload) {
      state.admin = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    signAdminIn({ commit }, payload) {
      commit('setLoading', true);
      commit('setError', null);
      authRef.signInWithEmailAndPassword(payload.email, payload.password)
        // get returned user after signIn
        .then(response => response.user)
        // make sure user is an admin
        // throws error if uid is not a document in adminsCollection
        .then((user) => {
          // user can only be logged in if they have verified their email
          if (!user.emailVerified) {
            user.sendEmailVerification();
            router.push('/emailverification');
            throw new Error('Please attempt login after you verify your email address');
          }
          return adminsRef.doc(user.uid).get();
        })
        .then((adminDoc) => {
          // document id will be the authorized user's id
          commit('setAdmin', adminDoc.id);
          commit('setLoading', false);
          router.push('/');
        })
        .catch((error) => {
          // set error message which can be accessed in login component
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    signOut({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      authRef.signOut()
        .then(() => {
          commit('setAdmin', null);
          commit('setLoading', false);
          router.push('/login');
        })
        .catch((error) => {
          commit('setError', error.message);
          commit('setLoading', false);
          router.push('/login');
        });
    },
  },
  getters: {
    admin(state) {
      return state.admin;
    },
    errorMessage(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
};
