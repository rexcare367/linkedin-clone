<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          min-height="270"
          max-width="225"
          class="mt-4 ml-4 justify-start elevation-0"
        >
          <v-avatar class="profile-image" size="68">
            <v-img
              :src="usersData.profile_photo"
            />
          </v-avatar>
          <v-img
            :src="usersData.banner_photo"
            class="background-image"
          />
          <v-card-title class="mt-8 align-center justify-center" style="font-size: 16px">
            {{ usersData.first_name }} {{ usersData.last_name }}
          </v-card-title>

          <v-card-subtitle class="text-center" style="font-size: 12px">
            {{ usersData.biography }}
          </v-card-subtitle>
          <v-divider />
          <v-card-text>Profilini görüntüleyenler</v-card-text>
          <v-card-text>Bağlantılarınız</v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="mb-2 mt-4 d-flex justify-start elevation-0"
          width="555"
        >
          Post Kısmı
        </v-card>
        <v-card
          class="fill-height elevation-0"
        >
          içerik kısmı
        </v-card>
      </v-col>

      <v-col>
        <v-card
          min-height="268"
          class="d-flex mt-4 mr-4 justify-start elevation-0"
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
      usersData: {}
    }
  },
  mounted () {
    this.getUserData()
  },
  methods: {
    getUserData () {
      this.$auth.fetchUser()
        .then((response) => {
          this.usersData = response.data
        })
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
    transform: translate(-50%, -190%);
    width: 200px;
    height: 100px;
    display: block;
    border-radius: 50%;
    z-index: 1;
}
</style>
