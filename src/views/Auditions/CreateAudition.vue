<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Create New Audition</h1>
          <div class="buttons is-centered">
            <router-link
            :to="{name: 'manageAuditions'}"
            tag="button"
            class="button is-warning">Back</router-link>
          </div>
          <AuditionForm @submit="submitAuditionForm"></AuditionForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuditionForm from '@/components/AuditionForm.vue';

export default {
  name: 'CreateAudition',
  components: {
    AuditionForm,
  },
  methods: {
    submitAuditionForm(auditionData) {
      console.log(auditionData);
    },
  },
};
</script>

<style lang="scss" scoped>
 .file-label, .file-name {
    text-align: center;
  }
</style>
