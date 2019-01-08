<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Create New Performance</h1>
          <form @submit.prevent="onCreateAdmin">
            <div class="field">
              <label class="label">Event Title</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('name') }"
                  name="eventTitle"
                  v-model="eventTitle"
                  data-vv-delay="500"
                  v-validate="'required'"
                  placeholder="Event Title">
                <span class="icon is-small is-left">
                  <i class="fas fa-theater-masks"></i>
                </span>
                <p
                  v-if="errors.has('name')"
                  class="help is-danger">{{ errors.first('eventTitle') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Date and Time</label>
              <flat-pickr
                v-model="date"
                :config="flatpickrConfig"
                class="input"
                name="date"
                v-validate="'required'"
              >
              </flat-pickr>
            </div>
            <div class="field">
              <label class="label">Event Image</label>
            </div>
            <div class="field">
              <label class="label">Venue Name</label>
            </div>
            <div>
              <label class="label">Street Address 1</label>
            </div>
            <div class="field">
              <label class="label">Street Address 2</label>
            </div>
            <div class="field">
              <label class="label">City</label>
            </div>
            <div class="field">
              <label class="label">State</label>
              <div class="select">
                <select v-model="selectedState" vee-validate="'required'">
                  <option
                    v-for="state in statesList"
                    :key="state"
                  >{{ state }}</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Postal Code</label>
            </div>
            <div class="field">
              <label class="label">Link to Map</label>
            </div>
            <div class="field">
              <label class="label">Note</label>
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
import statesList from '@/mixins/statesList';

export default {
  mixins: [statesList],
  data() {
    return {
      eventTitle: null,
      date: null,
      selectedState: 'CO', // default to Colorado just for demo purposes
      flatpickrConfig: {
        wrap: true,
        defaultDate: new Date().setHours(20, 0, 0),
        enableTime: true,
        dateFormat: 'l, Y-F-d \\a\\t h:i K',
      },
    };
  },
  methods: {
  },
  computed: {
    hasInvalidInput() {
      // if any element is pristine, don't disable submit button
      return Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
  },
};
</script>

