<template>
  <v-app style="background: #F3F2EF;">
    <v-main>
      <v-app-bar
        app
        color="white"
        flat
        elevation="0"
        min-height="52"
        dense
        class="overflow-hidden"
        style="border-bottom: 1px solid #dfdfdf !important;"
      >
        <v-container>
          <v-bottom-navigation
            class="elevation-0 justify-space-between"
          >
            <span class="mt-1 d-flex">
              <v-img
                class="mt-2"
                style="width: 34px;height: 34px;cursor: pointer"
                src="/LinkedIn_icon.svg"
                @click="redirectHome"
              />
              <div style="background-color: #EDF3F7;width: 280px;height: 34px;border-radius: 5px" class="pa-1 ml-2 mt-2">
                <v-icon>
                  mdi-magnify
                </v-icon>
                <input
                  style="font-size:14px;border:none;outline: none"
                  placeholder="Arama Yap"
                >
              </div>
            </span>

            <span>
              <v-tabs
                v-model="tab"
                hide-slider
                icons-and-text
                color="black"
                height="52"
                class="mt-1"
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

                <v-menu offset-y>
                  <template #activator="{ on }">
                    <v-btn
                      text
                      v-on="on"
                    >
                      Ben
                      <v-avatar class="mt-2" size="24">
                        <v-img :src="$store.state.auth.user.profile_photo" />
                      </v-avatar>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="redirectProfile">
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Profilime Git</v-list-item-title>
                    </v-list-item>
                    <v-divider />
                    <v-list-item @click="logout">
                      <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Çıkış Yap</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-tabs>
            </span>
          </v-bottom-navigation>
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
      this.$router.push(`/profile/${this.$store.state.auth.user.uuid}`)
    },
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$router.push('/auth/login')
        })
    }
  }
}
</script>
<style scoped>
.bar-text {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
