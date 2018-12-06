<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Confirm Admin</h1>
          <p>{{role}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import { authRef } from '@/firebase/firebaseInit';

export default {
  data() {
    return {
      name: null,
      email: null,
      role: null,
    };
  },
  methods: {
  },
  created() {
    this.name = this.$route.query.name;
    this.email = this.$route.query.email;
    this.role = this.$route.query.role;
  },
};
</script>
