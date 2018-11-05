<template>
  <section class="section">
    <div class="container">
        <h1>{{ title }}</h1>
    </div>
  </section>
</template>

<script>
import { performancesRef } from '@/firebase/firebaseInit';

export default {
  data() {
    return {
      title: 'The Admin Login Page!',
    };
  },
};
</script>
