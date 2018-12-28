<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Edit Admin</h1>
          <form @submit.prevent="onEditAdmin">
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('name') }"
                  name="name"
                  v-model="currentAdmin.data.name"
                  data-vv-delay="500"
                  v-validate="'required|min:2'"
                  placeholder="Full Name">
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <p
                  v-if="errors.has('name')"
                  class="help is-danger">{{ errors.first('name') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Role</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('role') }"
                  name="role"
                  v-model="currentAdmin.data.role"
                  data-vv-delay="500"
                  v-validate="'required|min:2'"
                  placeholder="Role">
                <span class="icon is-small is-left">
                  <i class="fas fa-user-tie"></i>
                </span>
                <p
                  v-if="errors.has('role')"
                  class="help is-danger">{{ errors.first('role') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('email') }"
                  name="email"
                  v-model="currentAdmin.data.email"
                  type="email"
                  data-vv-delay="500"
                  v-validate="'required|email'"
                  placeholder="Email Address">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <p
                  v-if="errors.has('email')"
                  class="help is-danger">{{ errors.first('email') }}</p>
              </div>
            </div>
            <div class="file has-name is-fullwidth">
              <label class="file-label">
              <input class="file-input" type="file" name="resume">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
              </span>
              </label>
            </div>
            <div class="buttons is-centered">
              <button class="button is-info"
              :disabled="errors.any() || hasInvalidInput"
              type="submit">Edit Admin</button>
              <router-link
                :to="{name: 'manageAdmins'}"
                tag="button"
                class="button is-danger">Back</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['id'],
  // data() {
  //   return {
  //     name: this.currentAdmin.data.name,
  //     role: this.currentAdmin.data.role,
  //     email: this.currentAdmin.data.email,
  //   };
  // },
  methods: {
    onEditAdmin() {
      console.log('Editing Admin!');
    },
  },
  computed: {
    hasInvalidInput() {
      // if any element is pristine, don't disable submit button
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    currentAdmin() {
      const admins = this.$store.getters['adminModule/adminList'];
      const admin = admins.filter(a => a.id === this.id);
      return admin[0];
    },
  },
  created() {
    if (!this.admin) {
      // handle a hard refresh
      this.$store.dispatch('adminModule/loadAdmins');
    }
  },
};
</script>
