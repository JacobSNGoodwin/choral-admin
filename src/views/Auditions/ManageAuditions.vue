<template>
  <section class="section">
    <div class="container">
      <ManageHeader
        title="Auditions"
        buttonLabel="New Audition"
        :route="{name: 'createAudition'}"
      ></ManageHeader>
    </div>
  </section>
</template>

<script>
import ManageHeader from '@/components/ManageHeader.vue';

export default {
  name: 'ManageAuditions',
  components: {
    ManageHeader,
  },
};
</script>
