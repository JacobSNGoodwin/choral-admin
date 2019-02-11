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
          <div v-if="loading" class="has-text-centered">
            <span
              class="icon is-large has-text-info has-text-centered">
              <i class="fas fa-circle-notch fa-spin fa-3x"></i>
            </span>
          </div>
          <AuditionForm
          v-if="selectedAudition && !loading"
          :formData="this.selectedAudition.data"
          @submitAudition="onUpdateAudition"></AuditionForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuditionForm from '@/components/AuditionForm.vue';

export default {
  name: 'EditAudition',
  params: ['id'],
  components: {
    AuditionForm,
  },
  methods: {
    onUpdateAudition(formData) {
      console.log(formData);
    },
  },
  computed: {
    selectedAudition() {
      return this.$store.getters['auditionsModule/selectedAudition'];
    },
    loading() {
      return this.$store.getters['auditionsModule/loading'];
    },
  },
  created() {
    this.$store.dispatch('auditionsModule/loadAudition', this.$route.params.id);
  },
};
</script>

