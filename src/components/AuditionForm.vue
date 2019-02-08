<template>
  <form @submit.prevent="onSaveAudition">
    <div class="field">
      <label class="label">Audition Title</label>
      <div class="control has-icons-left">
        <input
          :class="{'input': true, 'is-danger': errors.has('auditionTitle') }"
          name="auditionTitle"
          v-model="editedFormData.auditionTitle"
          data-vv-delay="500"
          v-validate="'required'"
          placeholder="Audition Title"
          data-vv-as="Audition Title"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-theater-masks"></i>
        </span>
        <p
          v-if="errors.has('auditionTitle')"
          class="help is-danger"
        >{{ errors.first('auditionTitle') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Audition Date and Time</label>
      <div class="control has-icons-left">
        <flat-pickr
          v-model="editedFormData.date"
          :config="flatpickrConfig"
          :class="{'input': true, 'is-danger': errors.has('date') }"
          class="input"
          name="date"
          v-validate="'required'"
        ></flat-pickr>
        <span class="icon is-small is-left">
          <i class="fas fa-calendar"></i>
        </span>
        <p v-if="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Audition Information</label>
      <div class="control has-icons-left">
        <textarea
          :class="{'textarea': true, 'is-danger': errors.has('auditionInfo') }"
          name="auditionInfo"
          v-model="editedFormData.auditionInfo"
          placeholder="Audition Information"
          data-vv-delay="500"
          v-validate="'required'"
          data-vv-as="Audition Information"
        ></textarea>
        <p
          v-if="errors.has('auditionInfo')"
          class="help is-danger"
        >{{ errors.first('auditionInfo') }}</p>
      </div>
    </div>
    <button
      class="button is-info"
      :disabled="errors.any() || requiredPristine"
      type="submit"
    >Create New Audition</button>
  </form>
</template>

<script>
export default {
  name: 'AuditionForm',
  props: {
    formData: {
      type: Object,
      required: false,
      default() {
        return {
          auditionTitle: '',
          date: '',
          auditionInfo: '',
        };
      },
    },
  },
  data() {
    return {
      editedFormData: this.formData,
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
    onSaveAudition() {
      this.$emit('submit', this.editedFormData);
    },
  },
  computed: {
    requiredPristine() {
      // check if any required field is pristine
      // we won't require date to be touched since it has a valid default
      if (!this.fields.auditionTitle || !this.fields.auditionInfo) {
        // this.fields is not available until mounted, so default to true
        return true;
      }
      return this.fields.auditionTitle.pristine ||
        this.fields.auditionInfo.pristine;
    },
  },
};
</script>
