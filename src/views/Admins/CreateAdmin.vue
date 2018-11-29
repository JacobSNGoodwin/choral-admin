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
                  data-vv-delay="1000"
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
                  data-vv-delay="1000"
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
                  data-vv-delay="1000"
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
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  ref="password"
                  :class="{'input': true, 'is-danger': errors.has('password') }"
                  name="password"
                  v-model="password"
                  type="password"
                  data-vv-delay="1000"
                  v-validate="'required|min:6'"
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
                  :class="{'input': true, 'is-danger': errors.has('confirmPassword') }"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  v-validate="'required|confirmed:password'"
                  data-vv-as="password confirmation"
                  placeholder="Confirm Password">
                <span
                  v-if="!errors.has('confirmPassword')
                    && fields.confirmPassword
                    && fields.confirmPassword.dirty"
                  class="icon is-small is-left has-text-success">
                  <i class="fas fa-check"></i>
                </span>
                <p
                  v-if="errors.has('confirmPassword')"
                  class="help is-danger">{{ errors.first('confirmPassword') }}</p>
              </div>
            </div>
            <button class="button is-info"
              :disabled="errors.any() || hasInvalidInput"
              type="submit">Create New Admin</button>
          </form>
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
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    onCreateAdmin() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      console.log(userData);
    },
  },
  computed: {
    hasInvalidInput() {
      // if any element is pristine, don't disable submit button
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
  },
};
</script>

