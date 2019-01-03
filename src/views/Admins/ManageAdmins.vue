<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered has-text-weight-bold">Admins</h1>
      <div class="has-text-centered">
        <router-link
          class="button is-medium has-text-centered is-danger"
           :to="{name: 'createAdmin'}">
          <span class="icon">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span>New Admin</span>
        </router-link>
      </div>
      <div v-if="loading" class="has-text-centered">
        <span
          class="icon is-large has-text-info has-text-centered">
          <i class="fas fa-circle-notch fa-spin fa-3x"></i>
        </span>
      </div>
      <div v-if="!loading" class="columns is-tablet is-multiline">
        <div
        class="column is-one-quarter-tablet"
        v-for="admin in adminList"
        :key="admin.id">
          <div class="card">
            <div v-if="admin.data.downloadURL" class="card-image">
              <figure class="image is-square">
                <img :src="admin.data.downloadURL" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <div
                  class="has-text-center is-size-5 has-text-link has-text-weight-bold
                  content-item-title">Name
                </div>
                <div class="is-size-6 content-item">{{admin.data.name}}</div>
              </div>
              <div class="content">
                <div
                  class="has-text-center is-size-5 has-text-link has-text-weight-bold
                  content-item-title">Email Address
                </div>
                <div class="is-size-6 content-item">{{admin.data.email}}</div>
              </div>
              <div class="content">
                <div
                  class="has-text-center is-size-5 has-text-link has-text-weight-bold
                  content-item-title">Role
                </div>
                <div class="is-size-6 content-item">{{admin.data.role}}</div>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                :to="{name: 'editAdmin', params: {id: admin.id}}"
                class="card-footer-item">Edit
              </router-link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    adminList() {
      return this.$store.getters['adminModule/adminList'];
    },
    loading() {
      return this.$store.getters['adminModule/loading'];
    },
  },
  created() {
    this.$store.dispatch('adminModule/loadAdmins');
  },
};
</script>

<style lang="scss" scoped>
  .card-content {
    padding-top: 0;
    padding-bottom: 0;
  }
  .content-item-title {
    margin-top: 0;
    margin-bottom: 0;
  }

  .content-item {
    margin-top: 0px;
    margin-bottom: 0px;
  }
</style>

