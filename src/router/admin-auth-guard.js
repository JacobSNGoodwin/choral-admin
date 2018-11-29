import store from '@/store/store';

import { authRef, adminsRef } from '@/firebase/firebaseInit';

export default (to, from, next) => {
  if (store.getters.admin) {
    // if app is already loaded, we will have admin in vuex store
    next();
  } else if (to.path === '/login' || to.path === '/emailverification') {
    // If path is to login, allow to procede without rerunning authguard!
    next();
  } else {
    // otherwise, reach out to firebase
    authRef.onAuthStateChanged((user) => {
      if (!user) {
        // if no user, go to login page
        next('/login');
      } else {
        // determine is user is authorized
        adminsRef.doc(user.uid).get()
          .then((adminDoc) => {
            store.commit('setError', null);
            store.commit('setAdmin', adminDoc.id);
            next();
          })
          .catch((error) => {
            store.commit('setAdmin', null);
            store.commit('setError', error.message);
            next('/login');
          });
      }
    });
  }
};
