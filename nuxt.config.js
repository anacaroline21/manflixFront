export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MANFLIX',
    htmlAttrs: {
      lang: 'pt_br' //primeira mudança
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      'primeflex/primeflex.css',
      '@layouts/scss/reset.scss',
      '@layouts/scss/generalVariables.scss',
      '@layouts/scss/generalStyle.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    'primevue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/google-fonts',
  ],

  primevue:{
    theme: "saga-orange",
    ripple: false,
    components: [
      "Button", "Password", "Toast"
    ]
  },

  

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  googleFonts:{ // vc adiciona as fontes do google fonts que vc quer usar
    families:{
      Roboto: true, //quero usar o Roboto
      "Varela+Round": true,//quero usar o Varela+Round// ele só faz o download das fontes que eu especificar
    }
  },


  auth:{
    strategies:{ //stratégias de autenticação
      local:{ //autenticação local
        endpoints:{//pontos de acesso para fazer login logout e usuario para ver se ta autenticado
          login:{// toda vez que fazer login
            url: process.env.BASE_URL + "/api/v1/auth/token/login/",// vai acessar essa rota
            method: "POST",//com o método post
            propertyName: "auth_token",// nesse login vc ja tem usar o token de autenticação, e vai receber um token de autenticação
          },
          logout:{
            url: process.env.BASE_URL + "/api/v1/auth/token/logout/",
            method: "POST",
            propertyName: "auth_token",
          },
          user:{// verificar se o usuário está autenticado, ele vai tentar mandar uma msg para uma rota protegida e ele receber uma informação ele vai perceber que ta logado
            url: process.env.BASE_URL + "/api/v1/users/me/",// rota protegida "tenta essa rota se vc conseguir uma informação de lá, então ta logado" // quem sou eu
            method: "GET",// é com get que vai pegar uma informação
            propertyName: false,//é só pra fazer autenticação/ aqui ele n vai receber um token, ele vai receber uma informação da rota protegida 
          },
        },
        tokenType:"Token",// tipo de autorização
        tokenName:"Authorization", // nome para esse tipo de token
      }
    },
    redirect:{//redirecionar pra onde eu quero
      login:"/",//É aonde está a sua página de login
      home:"/home" // É a página home  
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue'],
  }
}
