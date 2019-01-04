export default {
  computed: {
    routeLinks() {
      // will create a link for all routes that have a "linkLabel" property
      const { routes } = this.$router.options;
      return routes.filter(route => Object.prototype.hasOwnProperty.call(route, 'linkLabel'));
    },
  },
};
