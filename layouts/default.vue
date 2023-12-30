<template>
  <v-app>
    <v-main>
      <v-app-bar
        app
        color="white"
        flat
      >
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
            <v-tabs
              v-model="tab"
              centered
              icons-and-text
              height="45"
              color="black"
            >
              <v-tabs-slider />

              <v-tab v-for="(item,i) in tabs" :key="i" class="text-capitalize">
                {{ item.text }}
                <v-icon>{{ item.icon }}</v-icon>
              </v-tab>
            </v-tabs>
          </span>
        </v-bottom-navigation>
      </v-app-bar>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      tab: null,
      tabs: [
        {
          text: 'Ana Sayfa',
          icon: 'mdi-home'
        },
        {
          text: 'Ağım',
          icon: 'mdi-account-supervisor'
        },
        {
          text: 'İş İlanları',
          icon: 'mdi-briefcase'
        },
        {
          text: 'Mesajlaşma',
          icon: 'mdi-chat-processing'
        },
        {
          text: 'Bildirimler',
          icon: 'mdi-bell'
        }
      ]
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
