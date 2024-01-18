<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title class="text-center">
            Giriş Yap
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="login_Info.email" label="E-posta" required />
              <v-text-field v-model="login_Info.password" label="Şifre" type="password" required />
              <v-btn type="submit" color="primary">
                Giriş Yap
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      login_Info: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      try {
        this.$auth.loginWith('local', { data: this.login_Info })
          .then(() => {
            this.$router.push('/')
          })
      } catch (error) { // çalıştıramadım kontrol edilecek burası
        if (error.response && error.response.status === 401) {
          alert('Kullanıcı adı veya şifre yanlış.')
        } else {
          alert('Giriş işlemi sırasında bir hata oluştu.')
        }
      }
    }
  }
}

</script>
