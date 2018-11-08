<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="has-text-centered title is-3 has-text-weight-bold">Admin Dashboard</h1>
        </div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet">
          <div class="buttons">
            <router-link
            v-for="routeLink in routeLinks"
            :key="routeLink.path"
            :class="['button is-large is-fullwidth', routeLink.linkStyle]"
            :to="routeLink.path">{{ routeLink.linkLabel }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import routeLinks from '@/mixins/routeLinks';

export default {
  mixins: [routeLinks],
};
</script>
