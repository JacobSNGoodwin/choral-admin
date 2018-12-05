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
            class="has-text-danger is-size-5 has-text-weight-semibold">{{authError}}
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
import { authRef } from '@/firebase/firebaseInit';

export default {
  data() {
    return {
      name: null,
      role: null,
      email: null,
      authError: null,
      emailSent: null,
    };
  },
  methods: {
    onCreateAdmin() {
      // send email authentication email
      // email will contain authentication link
      // password will be created in ConfirmAdmin component
      // user will be signed in via email, and will also set a password sign in!
      // user will not be added to adminList until after confirmation

      const actionCodeSettings = {
        // URL you want to redirect back to. The domain for this
        // URL must be whitelisted in the Firebase Console.
        // Append email as query parameter so user need not reenter it
        url: `${process.env.VUE_APP_DOMAIN}/manage/admins/confirm/` +
          `?email=${this.email}` +
          `&name=${this.name}` +
          `&roll=${this.role}`,
        // This must be true.
        handleCodeInApp: true,
      };

      authRef.sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          this.emailSent = `An verification login email has been successfully sent to ${this.email}`;
        })
        .catch((error) => {
          this.authError = error.message;
          console.log(error);
        });
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

