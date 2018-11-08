<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered has-text-weight-bold">Admins</h1>
      <div class="has-text-centered">
        <a class="button is-medium has-text-centered is-danger">
        <span class="icon is-medium">
          <i class="fas fa-plus-circle"></i>
        </span>
        <span>New Admin</span>
      </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    adminList() {
      return this.$store.getters.adminList;
    },
  },
  created() {
    this.$store.dispatch('loadAdmins');
  },
};
</script>
