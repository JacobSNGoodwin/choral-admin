<template>
  <div class="main-div">
    <h1 class="title has-text-centered has-text-weight-bold">{{ title }}</h1>
    <div class="has-text-centered">
      <router-link
        class="button is-medium has-text-centered is-danger"
        :to="route"
      >
        <span class="icon">
          <i class="fas fa-plus-circle"></i>
        </span>
        <span>{{ buttonLabel }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    buttonLabel: String,
    route: Object,
  },
};
</script>

<style scoped>
  .main-div {
    margin: 0;
  }
</style>

