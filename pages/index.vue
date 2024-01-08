<template>
  <v-container>
    <button @click="logout">
      Çıkış Yap
    </button>
    <v-row>
      <v-col>
        <v-card
          min-height="270"
          max-width="225"
          class="d-flex mt-4 ml-4 justify-start elevation-0"
        >
          <v-avatar class="profile-image">
            <v-img
              :src="usersData.profile_photo"
            />
          </v-avatar>
          <v-img
            :src="usersData.banner_photo"
            class="background-image"
          />
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
    transform: translate(-50%, -50%);
    width: 200px; /* veya istediğiniz genişlik */
    height: auto;
    display: block;
    border-radius: 50%;
    z-index: 1;
}
</style>
