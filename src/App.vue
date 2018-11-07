<template>
  <div>
    <nav class="navbar is-fixed-top is-link"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="@/assets/beehive.png" alt="Choral Society" height="28">
        </router-link>

        <a role="button"
          @click="navActive = !navActive"
          :class="['navbar-burger', navActive ? 'is-active' : '']"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-burger-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        :class="['navbar-menu', navActive ? 'is-active' : '']"
        id="navbar-burger-menu"
        @click="navActive = false">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="javascript:;">
              Manage
            </a>
            <div class="navbar-dropdown is-boxed">
              <router-link
                class="navbar-item"
                :to="routeLink.path"
                v-for="routeLink in routeLinks"
                :key="routeLink.path">{{ routeLink.linkLabel }}</router-link>
            </div>
          </div>
        </div>
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
  data() {
    return {
      navActive: false,
    };
  },
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
