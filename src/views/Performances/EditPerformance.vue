<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="title has-text-centered has-text-weight-bold">Edit Performance</h1>
          <div class="buttons is-centered">
            <router-link
            :to="{name: 'managePerformances'}"
            tag="button"
            class="button is-warning">Back</router-link>
          </div>
          <div v-if="loading" class="has-text-centered">
            <span
              class="icon is-large has-text-info has-text-centered">
              <i class="fas fa-circle-notch fa-spin fa-3x"></i>
            </span>
          </div>
          <form v-if="!loading" @submit.prevent="onCreatePerformance">
            <div class="field">
              <label class="label">Event Title</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('eventTitle') }"
                  name="eventTitle"
                  v-model="eventTitle"
                  data-vv-delay="500"
                  v-validate="'required'"
                  placeholder="Event Title"
                  data-vv-as="Event Title">
                <span class="icon is-small is-left">
                  <i class="fas fa-theater-masks"></i>
                </span>
                <p
                  v-if="errors.has('eventTitle')"
                  class="help is-danger">
                  {{ errors.first('eventTitle') }}
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label">Date and Time</label>
              <div class="control has-icons-left">
                <flat-pickr
                  v-model="date"
                  :config="flatpickrConfig"
                  :class="{'input': true, 'is-danger': errors.has('date') }"
                  class="input"
                  name="date"
                  v-validate="'required'"
                >
                </flat-pickr>
                <span class="icon is-small is-left">
                  <i class="fas fa-calendar"></i>
                </span>
                <p
                  v-if="errors.has('date')"
                  class="help is-danger">{{ errors.first('date') }}
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label">Event Image</label>
              <div class="field file has-name is-boxed is-fullwidth">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="profileImageFile"
                  accept="image/x-png,image/jpeg"
                  @change="processFile($event)">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Add Event Image
                  </span>
                </span>
                <span class="file-name">
                  {{ eventImageFile.name }}
                </span>
              </label>
              </div>
            </div>
            <div class="field" v-if="eventImageURL">
              <label class="label">Image Preview</label>
              <figure class="image">
                <img :src="eventImageURL">
              </figure>
            </div>
            <div class="field">
              <label class="label">Venue Name</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('venueName') }"
                  name="venueName"
                  v-model="venueName"
                  data-vv-delay="500"
                  v-validate="'required'"
                  placeholder="Venue Name"
                  data-vv-as="Venue Name">
                <span class="icon is-small is-left">
                  <i class="fas fa-landmark"></i>
                </span>
                <p
                  v-if="errors.has('venueName')"
                  class="help is-danger">
                  {{ errors.first('venueName') }}
                </p>
              </div>
            </div>
            <div>
              <label class="label">Street Address 1</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="address1"
                  v-model="address1"
                  data-vv-delay="500"
                  placeholder="Address Line 1">
                <span class="icon is-small is-left">
                  <i class="fas fa-thumbtack"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Street Address 2</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="address2"
                  v-model="address2"
                  data-vv-delay="500"
                  placeholder="Address Line 2">
                <span class="icon is-small is-left">
                  <i class="fas fa-thumbtack"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">City</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="city"
                  v-model="city"
                  data-vv-delay="500"
                  placeholder="City or Town">
                <span class="icon is-small is-left">
                  <i class="fas fa-thumbtack"></i>
                </span>
              </div>
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
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="postalCode"
                  v-model="postalCode"
                  data-vv-delay="500"
                  placeholder="Postal Code">
                <span class="icon is-small is-left">
                  <i class="fas fa-thumbtack"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Link to Map</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="mapURL"
                  v-model="mapURL"
                  v-validate="'url:require_protocol'"
                  data-vv-delay="500"
                  placeholder="Map URL">
                <span class="icon is-small is-left">
                  <i class="fas fa-map-marked-alt"></i>
                </span>
                <p
                  v-if="errors.has('mapURL')"
                  class="help is-danger">
                  {{ errors.first('mapURL') }}
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label">Note</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  name="note"
                  v-model="note"
                  data-vv-delay="500"
                  placeholder="Note">
                <span class="icon is-small is-left">
                  <i class="fas fa-thumbtack"></i>
                </span>
              </div>
            </div>
            <button class="button is-info"
              :disabled="errors.any() || requiredPristine"
              type="submit">Create New Performance</button>
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
      eventImageFile: '',
      eventImageURL: '',
      eventTitle: null,
      date: null,
      address1: null,
      address2: null,
      venueName: null,
      city: null,
      postalCode: null,
      mapURL: null,
      selectedState: null, // default to Colorado just for demo purposes,
      note: null,
      flatpickrConfig: {
        wrap: true,
        defaultDate: new Date().setHours(20, 0, 0),
        enableTime: true,
        altInput: true,
        altFormat: 'l, Y-F-d \\a\\t h:i K', // for display
        dateFormat: 'Z', // UTC for storing data
      },
    };
  },
  methods: {
    onCreatePerformance() {
      const newPerformance = {
        eventTitle: this.eventTitle,
        date: this.date,
        address1: this.address1,
        address2: this.address2,
        venueName: this.venueName,
        city: this.city,
        state: this.selectedState,
        postalCode: this.postalCode,
        mapURL: this.mapURL,
        note: this.note,
      };

      const imageFile = this.eventImageFile;

      this.$store.dispatch('performanceModule/createPerformance', { newPerformance, imageFile });
    },
    processFile(event) {
      const [file] = event.target.files;
      this.eventImageFile = file; // uses array destructuring cuz airbnb

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.eventImageURL = reader.result;
      });

      reader.readAsDataURL(file);
    },
  },
  computed: {
    requiredPristine() {
      // check if any required field is pristine
      // we won't require date to be touched since it has a valid default
      if (!this.fields.eventTitle || !this.fields.venueName) {
        // this.fields is not available until mounted, so default to true
        return true;
      }
      return this.fields.eventTitle.pristine ||
        this.fields.venueName.pristine;
    },
    loading() {
      return this.$store.getters['performanceModule/loading'];
    },
  },
  created() {
    // initialize date to an iso string
    const toHours = new Date().setHours(20, 0, 0);
    const initDate = new Date(toHours);
    this.date = initDate.toISOString();
  },
};
</script>

<style lang="scss" scoped>
 .file-label, .file-name {
    text-align: center;
  }
</style>
