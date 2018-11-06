<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet is-two-fifths-desktop">
          <h1 class="has-text-centered title is-3 has-text-weight-bold">Admin Panel</h1>
        </div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-three-fifths-tablet">
          <div class="buttons">
            <router-link
            v-for="panel in panels"
            :key="panel.link"
            :class="['button is-large is-fullwidth', panel.style]"
            :to="panel.link">{{ panel.title }}</router-link>
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
      panels: [
        {
          title: 'Manage Admins',
          link: '/manage/admins',
          style: 'is-primary',
        },
        {
          title: 'Manage Performances',
          link: '/manage/performances',
          style: 'is-link',
        },
        {
          title: 'Manage Auditions',
          link: '/manage/auditions',
          style: 'is-info',
        },
      ],
    };
  },
};
</script>
