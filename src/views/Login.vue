<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="has-text-centered is-size-3 has-text-weight-bold">Admin Login</h1>
          <form @submit.prevent="onSignIn">
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('email') }"
                  name="email"
                  v-model="email"
                  type="email"
                  data-vv-delay="1000"
                  v-validate="'email'"
                  required
                  placeholder="Email Address">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <p
                  v-if="errors.has('email')"
                  class="help is-danger">{{ errors.first('email') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('password') }"
                  name="password"
                  v-model="password"
                  type="password"
                  v-validate="'min:6'"
                  required
                  placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
                <p
                  v-if="errors.has('password')"
                  class="help is-danger">{{ errors.first('password') }}</p>
              </div>
            </div>
            <button class="button is-info"
              :disabled="errors.any() || !email || !password"
              type="submit">Login</button>
          </form>
          <hr v-if="errorMessage">
          <div class="message is-danger" v-if="errorMessage">
            <div class="message-body">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    onSignIn() {
      this.$store.dispatch('signAdminIn', { email: this.email, password: this.password });
    },
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
};
</script>
