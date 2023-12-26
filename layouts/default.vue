<template>
  <v-app>
    <v-main>
      <v-app-bar
        app
        color="white"
        flat
      >
        <v-container class="py-0">
          <img
            class="mr-10"
            style="width: 40px;height: 40px;cursor: pointer"
            src="/LinkedIn_icon.svg"
          >
        </v-container>
      </v-app-bar>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false
    }
  }
}
</script>
