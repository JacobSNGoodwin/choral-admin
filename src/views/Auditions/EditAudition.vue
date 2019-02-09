<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Edit Audition</h1>
          <div class="buttons is-centered">
            <router-link
            :to="{name: 'manageAuditions'}"
            tag="button"
            class="button is-warning">Back</router-link>
          </div>
          <AuditionForm
          :formData="this.$route.params.audition"
          @submit="onUpdateAudition"></AuditionForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuditionForm from '@/components/AuditionForm.vue';

export default {
  components: {
    AuditionForm,
  },
  created() {
    if (!this.$route.params.audition) {
      // in case of hard reload, get single audition from firebase
      this.$store.dispatch('auditionsModule/loadAudition', this.$route.params.id);
    } else {
      // set to params data
    }
  },
};
</script>

