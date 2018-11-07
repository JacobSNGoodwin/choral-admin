import { adminsRef } from '@/firebase/firebaseInit';

export default {
  state: {
    adminList: [],
  },
  mutations: {

  },
  actions: {
    loadAdmins({ commmit }) {
      adminsRef.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .catch((error) => {
          commmit('setError', error.message);
        });
    },
  },
  getters: {
    adminList(state) {
      return state.adminList;
    },
  },
};
