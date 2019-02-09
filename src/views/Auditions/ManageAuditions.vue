<template>
  <section class="section">
    <div class="container">
      <ManageHeader
        title="Auditions"
        buttonLabel="New Audition"
        :route="{name: 'createAudition'}"
      ></ManageHeader>
      <div v-if="loading" class="has-text-centered">
        <span
          class="icon is-large has-text-info has-text-centered">
          <i class="fas fa-circle-notch fa-spin fa-3x"></i>
        </span>
      </div>
      <div v-if="!loading" class="columns is-tablet is-multiline">
        <AuditionListItem
          v-for="audition in auditionList"
          :key="audition.id"
          :audition="audition"
        ></AuditionListItem>
      </div>
    </div>
  </section>
</template>

<script>
import ManageHeader from '@/components/ManageHeader.vue';
import AuditionListItem from '@/components/AuditionListItem.vue';

export default {
  name: 'ManageAuditions',
  components: {
    ManageHeader,
    AuditionListItem,
  },
  computed: {
    loading() {
      return this.$store.getters['auditionsModule/loading'];
    },
    auditionList() {
      return this.$store.getters['auditionsModule/auditionList'];
    },
  },
  created() {
    this.$store.dispatch('auditionsModule/loadAuditions');
  },
};
</script>
