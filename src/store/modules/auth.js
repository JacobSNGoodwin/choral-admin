import router from '@/router/router';
import { authRef, authRefForCreate, adminsRef } from '@/firebase/firebaseInit';

export default {
  state: {
    admin: null,
    loading: false,
    error: null,
    message: null,
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
    setMessage(state, payload) {
      state.message = payload;
    },
  },

  actions: {
    createNewAdmin({ commit }, payload) {
      /*
      ** 1. Create a user with the given email address and a temporary password
      ** 2. Send user a confirmation email link
      ** 2. Add this user to the admin database
      ** 3. Send user a sign in email link
      */
      function randomPassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
        let pass = '';
        for (let x = 0; x < length; x += 1) {
          const i = Math.floor(Math.random() * chars.length);
          pass += chars.charAt(i);
        }
        return pass;
      }

      commit('setLoading', true);
      commit('setError', null);
      commit('setMessage', null);
      authRefForCreate.createUserWithEmailAndPassword(payload.newAdmin.email, randomPassword(16))
        .then(response => response.user)
        // add useruid and user info to admins doc
        .then(user =>
          adminsRef.doc(user.uid).set({
            email: payload.newAdmin.email,
            name: payload.newAdmin.name,
            role: payload.newAdmin.role,
          }))
        .then(() => {
          console.log('New user added to database');
          return authRefForCreate.signOut();
        })
        .then(() => {
          console.log('Secondary user logged out');
          return authRef.sendSignInLinkToEmail(payload.newAdmin.email, payload.actionCodeSettings);
        })
        .then(() => {
          console.log('Sign-in email has been sent');
          commit('setMessage', `A login email has been successfuly sent to ${payload.newAdmin.email}`);
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },

    confirmNewAdmin({ commit }, payload) {
      /*
      ** 1. Confirm valid email link
      ** 2. If so, authenticate user via this email link
      ** 3. Update user's password with payload
      ** 4. Update database information from payload
      ** 5. Catch any erros
      */
      commit('setLoading', true);
      commit('setError', null);
      if (authRef.isSignInWithEmailLink(window.location.href)) {
        authRef.signInWithEmailLink(payload.email, window.location.href)
          .then(response => response.user)
          .then(user => user.updatePassword(payload.password))
          .then(() =>
            // update changes to name or role
            adminsRef.doc(authRef.currentUser.uid).set({
              name: payload.name,
              email: payload.email,
              role: payload.role,
            }))
          .then(() => {
            commit('setAdmin', authRef.currentUser.uid);
            router.push({ name: 'manageAdmins' });
          })
          .catch((error) => {
            commit('setError', error.message);
            commit('setLoading', false);
          });
      }
    },

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
          commit('setError', null);
          commit('setMessage', null);
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
    message(state) {
      return state.message;
    },
  },
};
