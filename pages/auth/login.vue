<template>
  <v-app>
    <v-container class="align-center justify-center align-content-center text-center d-flex">
      <v-card elevation="0" class="mt-15">
        <v-card width="352">
          <v-card-title>Oturum Aç</v-card-title>
          <v-card-subtitle>
            Profesyonel dünyanızla ilgili güncel haberlere sahip olun
          </v-card-subtitle>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="login_Info.email"
              class="mx-4"
              outlined
              :rules="emailRules"
              label="E-posta"
              background-color="white"
              required
            />
            <v-text-field
              v-model="login_Info.password"
              type="password"
              class="mx-4"
              outlined
              :rules="passwordRules"
              label="Şifre"
              required
              background-color="white"
            />
          </v-form>

          <v-card-actions>
            <div class="ml-5 mb-4" style="width: calc(100% - 50px)">
              <v-btn
                block
                style="border-radius: 500px;color: white;background-color: #0A66C2"
                height="46"
                elevation="0"
                :disabled="!valid"
                @click="login"
              >
                Oturum Açın
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
        LinkedIn‘de yeni misiniz?
        <v-btn
          text

          @click="redirectRegister"
        >
          Hemen katılın
        </v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      valid: true,
      login_Info: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-posta adresi zorunludur!',
        v => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta adresi giriniz'
      ],
      passwordRules: [
        v => !!v || 'Şifrenizi girmek zorunludur!'
      ]
    }
  },
  methods: {
    login () {
      this.$refs.form.validate()
      this.$auth.loginWith('local', { data: this.login_Info })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            alert('E-posta ya da şifreniz hatalı')
          } else {
            alert('Giriş bilgilerinizi kontrol ediniz')
          }
        })
    },
    redirectRegister () {
      this.$router.push('/auth/register')
    }
  }
}

</script>
