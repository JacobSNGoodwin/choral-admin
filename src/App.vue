<template>
  <div>
    <nav class="navbar is-fixed-top is-warning is-bold"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
      </div>
      <div class="navbar-menu">
        <div class="navbar-end" v-if="isLoggedInAdmin">
          <div class="navbar-item">
            <button @click="onSignOut" class="button is-secondary">Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import routeLinks from '@/mixins/routeLinks';

export default {
  mixins: [routeLinks],
  methods: {
    onSignOut() {
      this.$store.dispatch('signOut');
    },
  },
  computed: {
    isLoggedInAdmin() {
      return this.$store.getters.admin;
    },
  },
};
</script>
