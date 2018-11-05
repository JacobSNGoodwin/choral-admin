import store from '@/store/store';

export default (to, from, next) => {
  if (store.getters.admin) {
    next(); // must have admin authentication to get into main admin panel page
  } else {
    next('/login');
  }
};
