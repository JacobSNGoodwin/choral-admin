<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered has-text-weight-bold">Admins</h1>
      <ul>
        <li v-for="admin in adminList" :key="admin">{{ admin }}</li>
      </ul>
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
};
</script>
