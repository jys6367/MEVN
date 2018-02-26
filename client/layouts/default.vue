<template>
  <v-app>
    <nuxt/>
    <my-footer/>
  </v-app>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>