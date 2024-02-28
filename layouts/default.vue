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
          class="nav-bar elevation-0 justify-space-between"
        >
          <span class="mt-1 d-flex">
            <v-img
              class="mt-1"
              style="width: 34px;height: 34px;cursor: pointer"
              src="/LinkedIn_icon.svg"
              @click="redirectHome"
            />
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              label="Arama yap"
              background-color="#EEF3F8"
              style="width: 280px; border-radius: 4px;"
              class="ml-2 mt-1"
              solo
              hide-details
              flat
            />
          </span>

          <span>
            <v-tabs
              v-model="tab"
              hide-slider
              icons-and-text
              color="black"
              height="52"
            >
              <v-tab
                class="text-capitalize bar-text "
                @click="redirectHome"
              >
                <div class="d-flex flex-column">
                  <v-icon size="25" class="ml-1 mt-2">mdi-home</v-icon>
                  <span>Ana Sayfa</span>
                </div>
              </v-tab>
              <v-tab
                v-for="(item,i) in tabs"
                :key="i"
                class="text-capitalize bar-text"
                :disabled="item.disableButton"
              >
                <div class="d-flex flex-column">
                  <v-icon size="25" class="ml-1 mt-2">{{ item.icon }}</v-icon>
                  <span>{{ item.text }}</span>
                </div>
              </v-tab>
              <v-btn
                @click="redirectProfile"
              >
                Ben
                <v-avatar
                  class="mt-2"
                  size="24"
                >
                  <v-img :src="$store.state.auth.user.profile_photo" />
                </v-avatar>
              </v-btn>
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
      users: {},
      tabs: [
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
  },
  methods: {
    redirectHome () {
      this.$router.push('/')
    },
    redirectProfile () {
      this.$router.push('/profile')
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
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

</style>
