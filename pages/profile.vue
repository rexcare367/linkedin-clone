<template>
  <v-container>
    <v-card max-width="804" class="mt-4 elevation-1">
      <v-img width="804" :src="$store.state.auth.user.banner_photo" />
      <v-avatar class="mt-3 ml-4 profile-image avatar-frame" size="170">
        <v-img
          :src="$store.state.auth?.user.profile_photo"
        />
      </v-avatar>
      <v-card-title class="mt-16">
        {{ $store.state.auth?.user.first_name }} {{ $store.state.auth?.user.last_name }}
      </v-card-title>
      <v-card-subtitle>{{ $store.state.auth?.user.title }}</v-card-subtitle>
      <v-card-text>{{ $store.state.auth?.user.country }}, {{ $store.state.auth?.user.city }}</v-card-text>
    </v-card>

    <v-card max-width="804" class="mt-2 elevation-1">
      <v-card-title>Hakkında</v-card-title>
      <v-card-text class="mt-1">
        {{ $store.state.auth?.user.biography }}
      </v-card-text>
    </v-card>

    <v-card
      max-width="804"
      class="mt-2 elevation-1"
    >
      <v-card-title>Deneyim</v-card-title>
      <div class="mt-1 ml-2 d-flex align-center">
        <v-img
          :src="experience[0]?.company_logo"
          max-width="48px"
          max-height="48px"
        />
        <div>
          <v-card-title>{{ experience[0]?.title }}</v-card-title>
          <v-card-subtitle class="text-capitalize">
            {{ experience[0]?.company_name }}·{{ experience[0]?.employment_type }}<br>
            {{ experience[0]?.started_at }}·{{ experience[0]?.finish_at }} kaç aysa<br>
            {{ experience[0]?.city }}, {{ experience[0]?.country }}
          </v-card-subtitle>
        </div>
      </div>
    </v-card>

    <v-card
      max-width="804"
      class="mt-2 elevation-1"
    >
      <v-card-title>Eğitim</v-card-title>
      <v-card-text class="mt-1">
        <div class="mt-1 ml-2 d-flex align-center">
          <v-img
            :src="education[0]?.school_logo"
            max-width="48px"
            max-height="48px"
          />
          <div>
            <v-card-title>{{ education[0]?.school_name }}</v-card-title>
            <v-card-subtitle class="text-capitalize">
              {{ education[0]?.section }}<br>
              {{ education[0]?.started_at }}·{{ education[0]?.finish_at }} kaç aysa<br>
            </v-card-subtitle>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card max-width="804" class="mt-2 elevation-1">
      <v-card-title>Yetenekler</v-card-title>
      <v-card-text class="mt-1">
        {{ skill }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      experience: [],
      skill: [],
      education: []
    }
  },
  mounted () {
    this.getuserData()
  },
  methods: {
    getuserData () {
      const params = {
        user: this.$store.state.auth?.user?.uuid
      }
      this.$axios.$get(process.env.GET_EXPERIENCE, { params })
        .then((response) => {
          this.experience = response
        })

      this.$axios.$get(process.env.GET_SKILL, { params })
        .then((response) => {
          this.skill = response
        })

      this.$axios.$get(process.env.GET_EDUCATION, { params })
        .then((response) => {
          this.education = response
        })
    }
  }
}

</script>

<style scoped>
.profile-image{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-230%, -60%);
  width: 200px;
  height: 100px;
  display: block;
  border-radius: 50%;
  z-index: 1;
}
.avatar-frame {
  border: 5px solid #fff;
}
</style>
