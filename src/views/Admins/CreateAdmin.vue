<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Create New Admin</h1>
          <form @submit.prevent="onCreateAdmin">
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('name') }"
                  name="name"
                  v-model="name"
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
                  v-model="role"
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
                  v-model="email"
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
            <button class="button is-info"
              :disabled="errors.any() || hasInvalidInput"
              type="submit">Create New Admin</button>
          </form>
          <p
            v-if="authError"
            class="has-text-danger is-size-5 has-text-weight-semibold">{{errorMessage}}
          </p>
          <p
            v-if="emailSent"
            class="has-text-success is-size-5 has-text-weight-semibold">{{emailSent}}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      role: null,
      email: null,
    };
  },
  methods: {
    onCreateAdmin() {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain for this
        // URL must be whitelisted in the Firebase Console.
        // Append email as query parameter so user need not reenter it
        url: `${process.env.VUE_APP_DOMAIN}/manage/admins/confirm/` +
          `?email=${this.email}` +
          `&name=${this.name}` +
          `&role=${this.role}`,
        // This must be true.
        handleCodeInApp: true,
      };

      const newAdmin = {
        name: this.name,
        email: this.email,
        role: this.role,
        password: this.password,
      };

      this.$store.dispatch('createNewAdmin', { newAdmin, actionCodeSettings });
    },
  },
  computed: {
    hasInvalidInput() {
      // if any element is pristine, don't disable submit button
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    emailSent() {
      return this.$store.getters.message;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
  created() {
    this.$store.commit('setMessage', null);
  },
};
</script>

