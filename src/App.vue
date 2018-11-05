<template>
  <div>
    <nav class="navbar is-fixed-top is-warning is-bold"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">Performances</a>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
  </div>
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
