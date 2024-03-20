<template>
  <v-app style="background-color: #F3F2EF">
    <v-container class="align-center justify-center align-content-center d-flex">
      <v-col class="align-center justify-center align-content-center">
        <v-row>
          <v-card-title style="font-size: xx-large" class="align-center justify-center align-content-center text-center d-flex mx-auto">
            Profesyonel hayatınızdan en iyi şekilde yararlanın
          </v-card-title>
        </v-row>
        <v-row class="mt-16">
          <v-card elevation="0" style="background-color: #F3F2EF;" class="mx-auto">
            <div v-if="showForm1">
              <v-card width="400">
                <v-card-title>Kayıt Ol</v-card-title>
                <v-card-text>
                  <div>
                    E-posta
                    <v-text-field v-model="email" outlined dense />
                  </div>
                  <div>
                    Şifre
                    <v-text-field v-model="password" type="password" outlined dense />
                  </div>
                </v-card-text>
                <v-card-actions class="flex-column px-10">
                  <v-btn
                    block
                    style="border-radius: 500px;color: white;background-color: #0A66C2"
                    height="46"
                    elevation="0"
                    class="mb-5"
                    @click="showForm1=false"
                  >
                    Devam Et
                  </v-btn>

                  Zaten LinkedIn üyesi misiniz? <a @click="redirectLogin">Oturum Açın</a>
                </v-card-actions>
              </v-card>
            </div>
            <div v-else>
              <v-card else width="400">
                <div style="width: 350px" class="ml-4">
                  Adınız
                  <v-text-field v-model="first_name" outlined dense />
                </div>
                <div style="width: 350px" class="ml-4">
                  Soyadınız
                  <v-text-field v-model="last_name" outlined dense />
                </div>
                <v-card-actions>
                  <div class="ml-5 mb-4" style="width: calc(100% - 50px)">
                    <v-btn
                      block
                      style="border-radius: 500px;color: white;background-color: #0A66C2"
                      height="46"
                      elevation="0"
                      @click="registerUser"
                    >
                      Devam Et
                    </v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </div>
          </v-card>
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      showForm1: true,
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registerUser () {
      const payload = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name
      }
      this.$axios.post(process.env.REGISTER_URL, payload)
        .then(() => {
          this.$router.push('/')
        })
    },
    redirectLogin () {
      this.$router.push('/auth/login/')
    }
  }
}

</script>
