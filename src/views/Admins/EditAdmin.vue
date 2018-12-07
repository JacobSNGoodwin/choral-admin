<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered has-text-weight-bold">Edit Admin</h1>
      <p>{{id}}</p>
      <p>{{admin}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['id', 'admin'],
};
</script>
