<template>
  <v-app>
    <v-main>
      <v-bottom-navigation
        value="1"
        class="d-flex justify-center align-center justify-space-between nav-bar elevation-0"
      >
        <span class="d-flex">
          <v-img
            class="logo-margin-left mt-1"
            style="width: 34px;height: 34px;cursor: pointer"
            src="/LinkedIn_icon.svg"
          />
          <span>
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              dense
              height="34"
              label="Arama yap"
              background-color="#EEF3F8"
              style="width: 280px;max-height:34px;border-radius: 4px;"
              class="ml-2 custom-height"
              solo
              hide-details
              flat
            />
          </span>
        </span>

        <span>
          <v-btn>
            <span>Anasayfa</span>

            <v-icon>mdi-home</v-icon>
          </v-btn>

          <v-btn>
            <span>Ağım</span>

            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn>
            <span>İş İlanları</span>

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
<style>
.nav-bar{
  display: flex;
  width: 1920px;
  max-height: 53px;
  padding: 0 203px;
  justify-content: center;
  align-items: center;
  gap: 161px;
  flex-shrink: 0;
}
.custom-height {
  max-height: 34px !important;
}
</style>
