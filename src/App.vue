<template>
  <section class="section">
    <div class="container">
      <h1>{{ title }}</h1>
    </div>
    <div class="container">
      <app-login></app-login>
    </div>
  </section>
</template>

<script>
import Login from '@/views/Login.vue';

export default {
  components: {
    'app-login': Login,
  },
  data() {
    return {
      title: 'In the app!',
    };
  },
};
</script>
