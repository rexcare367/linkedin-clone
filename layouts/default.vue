<template>
  <v-app style="background: #F3F2EF">
    <v-main>
      <v-app-bar
        app
        color="white"
        flat
        min-height="52"
        dense
      >
        <v-bottom-navigation
          value="1"
          class="nav-bar elevation-0 justify-space-between"
        >
          <span class="d-flex">
            <v-img
              class="mt-1"
              style="width: 34px;height: 34px;cursor: pointer"
              src="/LinkedIn_icon.svg"
            />
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              label="Arama yap"
              background-color="#EEF3F8"
              style="width: 280px; border-radius: 4px;"
              class="ml-2"
              solo
              hide-details
              flat
            />
          </span>

          <span>
            <v-tabs
              v-model="tab"
              centered
              icons-and-text
              height="50"
              color="black"
            >
              <v-tabs-slider />
              <v-tab
                v-for="(item,i) in tabs"
                :key="i"
                class="text-capitalize bar-text"
                :disabled="item.disableButton"
              >
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
          icon: 'mdi-home',
          disableButton: false
        },
        {
          text: 'Ağım',
          icon: 'mdi-account-supervisor',
          disableButton: true
        },
        {
          text: 'İş İlanları',
          icon: 'mdi-briefcase',
          disableButton: true
        },
        {
          text: 'Mesajlaşma',
          icon: 'mdi-chat-processing',
          disableButton: true
        },
        {
          text: 'Bildirimler',
          icon: 'mdi-bell',
          disableButton: true
        }
      ]
    }
  }
}
</script>
<style scoped>
.v-text-field--solo::v-deep .v-input__control { min-height: 34px; }
.nav-bar{
  display: flex;
  padding: 0 187px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.bar-text {
  font-family: sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
