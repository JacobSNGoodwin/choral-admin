<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered has-text-weight-bold">Admins</h1>
      <div class="has-text-centered">
        <router-link
          class="button is-medium has-text-centered is-danger"
          to="/manage/admins/create">
          <span class="icon">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span>New Admin</span>
        </router-link>
      </div>
      <div class="has-text-centered">
        <span
          class="icon is-large has-text-info has-text-centered"
          v-if="loading">
          <i class="fas fa-circle-notch fa-spin fa-3x"></i>
        </span>
      <p
        v-if="!loading"
        v-for="admin in adminList"
        :key="admin">{{admin}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    adminList() {
      return this.$store.getters['adminModule/adminList'];
    },
    loading() {
      return this.$store.getters['adminModule/loading'];
    },
  },
  created() {
    this.$store.dispatch('adminModule/loadAdmins');
  },
};
</script>
