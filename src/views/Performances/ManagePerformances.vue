<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered has-text-weight-bold">Manage Performances</h1>
      <div class="has-text-centered">
        <router-link
          class="button is-medium has-text-centered is-danger"
           :to="{name: 'createPerformance'}">
          <span class="icon">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span>New Performance</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
</style>
