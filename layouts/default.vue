<template>
  <v-app>
    <v-main>
      <v-bottom-navigation
        value="1"
        color="primary"
        class="d-flex justify-center align-center justify-lg-space-between"
      >
        <span>
          <img
            class="ml-15"
            style="width: 40px;height: 40px;cursor: pointer"
            src="/LinkedIn_icon.svg"
          >
        </span>
        <span>
          <v-btn>
            <span>Recents</span>

            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn>
            <span>Favorites</span>

            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn>
            <span>Nearby</span>

            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </span>
      </v-bottom-navigation>
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
