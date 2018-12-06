<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Confirm New Admin</h1>
          <form @submit.prevent="onConfirmAdmin">
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
                  readonly
                  disabled
                  v-model="email"
                  type="email">
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
                  ref="password"
                  :class="{'input': true, 'is-danger': errors.has('password') }"
                  name="password"
                  v-model="password"
                  data-vv-delay="500"
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
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true,
                    'is-danger': errors.has('confirmPassword') && fields.confirmPassword.changed}"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  v-validate="'required|confirmed:password'"
                  data-vv-as="password"
                  placeholder="Confirm Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
                <p
                  v-if="errors.has('confirmPassword') && fields.confirmPassword.dirty"
                  class="help is-danger">{{ errors.first('confirmPassword') }}</p>
              </div>
            </div>
            <button class="button is-info"
              :disabled="errors.any() || hasInvalidInput"
              type="submit">Confirm New Admin</button>
          </form>
          <p
            v-if="errorMessage"
            class="has-text-danger is-size-5 has-text-weight-semibold">{{errorMessage}}
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
      email: null,
      role: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    onConfirmAdmin() {
      const newAdmin = {
        name: this.name,
        email: this.email,
        role: this.role,
        password: this.password,
      };
      this.$store.dispatch('confirmNewAdmin', newAdmin);
    },
  },
  computed: {
    hasInvalidInput() {
      // if any element is pristine, disable submit button
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
  created() {
    this.name = this.$route.query.name;
    this.email = this.$route.query.email;
    this.role = this.$route.query.role;
  },
};
</script>
