<template>
  <div>
    <nav class="navbar is-fixed-top is-warning is-bold"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
      </div>
      <div class="navbar-menu">
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'In the app!',
    };
  },
};
</script>
