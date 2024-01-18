<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          min-height="270"
          max-width="225"
          class="mt-4 ml-4 justify-start elevation-0 card-border"
        >
          <v-avatar class="profile-image" size="68">
            <v-img
              :src="$store.state.usersData.profile_photo"
            />
          </v-avatar>
          <v-img
            :src="$store.state.usersData.banner_photo"
            class="background-image"
          />
          <v-card-title class="mt-8 align-center justify-center" style="font-size: 16px">
            {{ $store.state.usersData.first_name }} {{ $store.state.usersData.last_name }}
          </v-card-title>

          <v-card-subtitle class="text-center" style="font-size: 12px">
            {{ $store.state.usersData.biography }}
          </v-card-subtitle>
          <v-divider />
          <v-card-text style="font-size: 12px">
            Profilini görüntüleyenler<br>
            Bağlantı
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="mb-2 mt-4 justify-start elevation-0 card-border"
          width="555"
        >
          <v-col>
            <v-row>
              <v-avatar class="mt-3 ml-4" size="48">
                <v-img
                  :src="$store.state.usersData.profile_photo"
                />
              </v-avatar>
              <v-btn
                class="mt-3 ml-2"
                outlined
                width="480"
                height="48"
                rounded
                color="rgba(102, 102, 102, 0.60)"
              >
                <v-card-subtitle
                  style="margin-left: -80%;font-weight: 400;color: Gray;text-transform: none"
                  class="text-no-wrap"
                >
                  Gönderi başlat
                </v-card-subtitle>
              </v-btn>
            </v-row>
            <v-row>
              <v-col
                v-for="(item,i) in postItems"
                :key="i"
              >
                <v-btn
                  text
                  class="ml-6"
                >
                  <v-icon
                    :color="item.color"
                  >
                    {{ item.icon }}
                  </v-icon>
                  <v-card-text
                    style="color:rgba(102, 102, 102, 0.60)"
                    class="text-capitalize pa-0 ml-1"
                  >
                    {{ item.text }}
                  </v-card-text>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
        <v-divider class="mb-2" />
        <v-card
          class="fill-height elevation-0 card-border"
        >
          içerik kısmı
        </v-card>
      </v-col>

      <v-col>
        <v-card
          min-height="268"
          class="d-flex mt-4 mr-4 justify-start elevation-0 card-border"
          width="300"
        >
          Footer kısmı
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authControl from '@/middleware/authControl'

export default {
  middleware: authControl,
  data () {
    return {
      postItems: [
        {
          icon: 'mdi-image-outline',
          color: 'blue',
          text: 'Medya'
        },
        {
          icon: 'mdi-calendar-month-outline',
          color: 'orange',
          text: 'Etkinlik'
        },
        {
          icon: 'mdi-format-line-weight',
          color: '#F5987E',
          text: 'Yazı Yaz'
        }
      ]
    }
  },
  methods: {
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
.background-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 56px;
  display: block;
}
.profile-image{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -170%);
    width: 200px;
    height: 100px;
    display: block;
    border-radius: 50%;
    z-index: 1;
}
.card-border{
  border-radius: 8px;
  border: 1px solid rgba(224, 224, 224, 0.60)
}
</style>
