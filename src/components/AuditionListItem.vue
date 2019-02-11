<template>
  <div class="column is-half-tablet">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div
            class="has-text-center is-size-5 has-text-link has-text-weight-bold
            content-item-title">Audition Title
          </div>
          <div class="is-size-6 content-item">{{audition.data.auditionTitle}}</div>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <div
            class="has-text-center is-size-5 has-text-link has-text-weight-bold
            content-item-title">Date
          </div>
          <div class="is-size-6 content-item">{{audition.data.dateUTC}}</div>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <div
            class="has-text-center is-size-5 has-text-link has-text-weight-bold
            content-item-title">Audition Info
          </div>
          <div class="is-size-6 content-item">{{audition.data.auditionInfo}}</div>
        </div>
      </div>
      <footer class="card-footer">
        <router-link
          :to="{name: 'editAudition', params: {id: audition.id}}"
          class="card-footer-item">Edit
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuditionListitem',
  props: ['audition'],
};
</script>

<style scoped>
  .card {
    padding-top: 0.5em;
  }
  .card-content {
    padding-top: 0;
    padding-bottom: 0;
  }
  .content-item-title {
    margin-top: 0;
    margin-bottom: 0;
  }

  .content-item {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
