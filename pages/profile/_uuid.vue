<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card class="mt-4 elevation-1">
          <v-img v-if="profile_data.banner_photo" :src="profile_data.banner_photo" />
          <v-img v-else src="/defaults/default_banner.png" />
          <v-avatar class="mt-3 ml-4 profile-image avatar-frame" size="170">
            <v-img v-if="profile_data.profile_photo" :src="profile_data.profile_photo" />
            <v-img v-else src="/defaults/profile_photo.avif" />
          </v-avatar>
          <v-card-title class="mt-16">
            {{ profile_data.first_name }} {{ profile_data.last_name }}
          </v-card-title>
          <v-card-subtitle>{{ profile_data.title }}</v-card-subtitle>
          <v-card-text>{{ profile_data.country }}, {{ profile_data.city }}</v-card-text>
        </v-card>

        <v-card class="mt-2 elevation-1">
          <v-card-title>Hakkında</v-card-title>
          <v-card-text class="mt-1">
            {{ profile_data.biography }}
          </v-card-text>
        </v-card>

        <v-card
          v-for="(item,i) in experience"
          :key="i"
          class="mt-2 elevation-1"
        >
          <v-card-title>Deneyim</v-card-title>
          <div class="mt-1 ml-2 d-flex align-center">
            <v-img
              :src="item.company_logo"
              max-width="48px"
              max-height="48px"
            />
            <div>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-subtitle class="text-capitalize">
                {{ item.company_name }} · {{ formatJobType(item.employment_type) }}<br>
                {{ formattedDate(item.started_at) }} · {{ formattedDate(item.finish_at) }} · {{ getMonthAndYearDiff(item.started_at,item.finish_at) }}<br>
                {{ item.city }}, {{ item.country }}
              </v-card-subtitle>
            </div>
          </div>
        </v-card>

        <v-card
          v-for="(item,i) in education"
          :key="i"
          class="mt-2 elevation-1"
        >
          <v-card-title>Eğitim</v-card-title>
          <v-card-text class="mt-1">
            <div class="mt-1 ml-2 d-flex align-center">
              <v-img
                :src="item.school_logo"
                max-width="48px"
                max-height="48px"
              />
              <div>
                <v-card-title>{{ item.school_name }}</v-card-title>
                <v-card-subtitle class="text-capitalize">
                  {{ item.section }}<br>
                  {{ formattedDate(item.started_at) }} · {{ formattedDate(item.finish_at) }} · {{ getMonthAndYearDiff(item.started_at, item.finish_at) }}<br>
                </v-card-subtitle>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-card
          v-for="(item,i) in skill"
          :key="i"
          class="mt-2 elevation-1"
        >
          <v-card-title>Yetenekler</v-card-title>
          <v-card-title class="mt-1">
            {{ item.skill_name }}
          </v-card-title>
          <div
            v-for="(company,a) in item.used_experiences"
            :key="a"
            class="d-flex justify-center align-center"
          >
            <v-img
              class="ml-4"
              :src="company.company_logo"
              max-width="26px"
              max-height="26px"
            />
            <v-card-text>{{ a+1 }} Deneyim - {{ company.company_name }}</v-card-text>
          </div>
          <div class="ml-4" style="width: calc(100% - 50px)">
            <v-divider />
          </div>

          <div
            v-for="(educations,a) in item.used_educations"
            :key="a"
            class="d-flex justify-center align-center mb-2"
          >
            <v-img
              class="ml-4"
              :src="educations.school_logo"
              max-width="26px"
              max-height="26px"
            />
            <v-card-text>{{ educations.school_name }} okulunda {{ a+1 }} eğitim deneyimi </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mt-4">
          <v-card-title>
            Profil Dili
          </v-card-title>
          <v-card-subtitle>
            Türkçe
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      profile_data: [],
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
        user: this.$route.params.uuid
      }
      this.$axios.$get(process.env.PROFILE_GET_URL.replace('{uuid}', this.$route.params.uuid))
        .then((res) => {
          this.profile_data = res
        })
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
    },
    getMonthAndYearDiff (start, end) {
      const startDate = new Date(start)
      const endDate = new Date(end)
      let diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12
      diffMonths -= startDate.getMonth()
      diffMonths += endDate.getMonth()
      const years = Math.floor(diffMonths / 12)
      const months = diffMonths % 12
      if (years === 0) {
        return `${months} ay`
      } else {
        return `${years} yıl ${months} ay`
      }
    },
    formattedDate (item) {
      const date = new Date(item)
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    formatJobType (jobType) {
      if (jobType === 'full_time') {
        return 'Tam Zamanlı'
      } else {
        return jobType
      }
    }
  }
}

</script>

<style scoped>
.profile-image{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-250%, -60%);
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
