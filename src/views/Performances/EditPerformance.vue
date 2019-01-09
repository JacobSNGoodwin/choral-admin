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
          <form v-if="!loading" @submit.prevent="onEditPerformance">
            <div class="field">
              <label class="label">Event Title</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('eventTitle') }"
                  name="eventTitle"
                  v-model="performance.eventTitle"
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
                  v-model="performance.date"
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
                  name="eventImageFile"
                  accept="image/x-png,image/jpeg"
                  @change="processFile($event)">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Change Event Image
                  </span>
                </span>
                <span class="file-name">
                  {{ eventImageFile.name }}
                </span>
              </label>
              </div>
            </div>
            <div class="field" v-if="performance.downloadURL || eventImageURL">
              <label class="label">Image Preview</label>
              <figure class="image">
                <img v-if="eventImageURL" :src="eventImageURL" alt="Performance Image">
                <img v-else :src="performance.downloadURL" alt="Performance Image">
              </figure>
            </div>
            <div class="field">
              <label class="label">Venue Name</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('venueName') }"
                  name="venueName"
                  v-model="performance.venueName"
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
                  v-model="performance.address1"
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
                  v-model="performance.address2"
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
                  v-model="performance.city"
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
                <select v-model="performance.state" vee-validate="'required'">
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
                  v-model="performance.postalCode"
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
                  v-model="performance.mapURL"
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
                  v-model="performance.note"
                  data-vv-delay="500"
                  placeholder="Note">
                <span class="icon is-small is-left">
                  <i class="fas fa-thumbtack"></i>
                </span>
              </div>
            </div>
            <div class="buttons is-centered">
              <button class="button is-info"
              :disabled="errors.any()"
              type="submit">Save Changes</button>
              <button
              @click.prevent="confirmDelete"
              class="button is-danger">Delete Performance</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div :class="{ 'modal': true, 'is-active': showModal }">
      <div @click.prevent="clearModal" class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Are you sure?</p>
          </header>
          <div class="card-content">
          <div class="content">
            You cannot undo this delete. All event information will be lost.
            </div>
          </div>
          <footer class="card-footer">
            <a href="#"
            @click.prevent="onDeletePerformance"
            class="card-footer-item has-text-danger has-text-weight-bold">Confirm Delete</a>
            <a @click.prevent="clearModal"
            href="#"
            class="card-footer-item has-text-weight-bold">Cancel</a>
          </footer>
        </div>
      </div>
      <button @click.prevent="clearModal" class="modal-close is-large" aria-label="close"></button>
    </div>
  </section>
</template>

<script>
import statesList from '@/mixins/statesList';

export default {
  props: ['id'],
  mixins: [statesList],
  data() {
    return {
      showModal: false,
      eventImageFile: '',
      eventImageURL: '',
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
    onEditPerformance() {
      const editedPerformance = {
        eventTitle: this.performance.eventTitle,
        date: this.performance.date,
        address1: this.performance.address1,
        address2: this.performance.address2,
        venueName: this.performance.venueName,
        city: this.performance.city,
        state: this.performance.state,
        postalCode: this.performance.postalCode,
        mapURL: this.performance.mapURL,
        note: this.performance.note,
        downloadURL: this.performance.downloadURL,
        storagePath: this.performance.storagePath,
      };
      const performanceId = this.id;
      const imageFile = this.eventImageFile;

      this.$store.dispatch('performanceModule/editPerformance', { editedPerformance, performanceId, imageFile });
    },
    onDeletePerformance() {
      this.$store.dispatch('performanceModule/deletePerformance', this.id);
      this.showModal = false;
    },
    confirmDelete() {
      this.showModal = true;
    },
    clearModal() {
      this.showModal = false;
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
    loading() {
      return this.$store.getters['performanceModule/loading'];
    },
    performancesList() {
      return this.$store.getters['performanceModule/performanceList'];
    },
    performance() {
      return this.performancesList.find(a => a.id === this.id).data;
    },
  },
  beforeCreate() {
    // in case of hard reload - could check browser storage in better version
    if (this.$store.getters['performanceModule/performanceList'].length === 0) {
      this.$store.dispatch('performanceModule/loadPerformances');
    }
  },
};
</script>

<style lang="scss" scoped>
 .file-label, .file-name {
    text-align: center;
  }
</style>
