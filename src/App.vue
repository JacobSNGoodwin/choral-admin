<template>
  <div>
    <nav class="navbar is-fixed-top is-link"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="@/assets/beehive.png" alt="Choral Society" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
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
