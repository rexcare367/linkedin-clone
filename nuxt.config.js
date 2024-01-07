import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'linkedIn',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/LinkedIn_icon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  auth: {
    store: true,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          global: true,
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 10800
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 86400
        },
        user: {
          property: false
        },
        endpoints: {
          login: {
            url: '/api/accounts/login/',
            method: 'post',
            propertyName: 'access'
          },
          refresh: {
            url: '/api/accounts/login/refresh/',
            method: 'post',
            propertyName: 'access'
          },
          user: {
            url: '/api/accounts/get-data/',
            method: 'get'
          },
          logout: false
        }
      }
    },
    redirect: {
      login: false,
      logout: false,
      home: false
    },
    /* plugins: ['~/plugins/auth.js'], */
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        secure: true,
        maxAge: 1800
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { systemvars: true }]
  ],
  ssr: false,
  server: {
    host: '0.0.0.0'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.DEFAULT_API_URL
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
