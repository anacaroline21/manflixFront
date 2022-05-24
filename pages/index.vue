<template>
  <main>
    <header>
      <img class="manflixLogo" src="@/static/logo.png" alt="logo" />
    </header>
    <div class="loginContainer flex align-items-center justify-content-center">
      <form
        v-on:submit.prevent="makeLogin()"
        class="login pl-2 pr-2 w-8 sm:w-4"
      >
        <!---Vai ser menor (w-8) quando ainda a tela estiver menor, quando ela  passar do small (sm) ele vai passar a ser w-4 um pouco maior----->
        <h2 class="mb-3 sm:mb-4">Sign in</h2>
        <input
          type="email"
          class="loginField w-full pl-3 mb-3 h-2rem"
          required
          placeholder="Email"
          v-model="user.username"
          v-on:input="
            () => {
              this.message = '';
            }
          "
        />

        <Password
          v-model="user.password"
          required
          placeholder="Password"
          toggleMask
          :feedback="false"
          inputClass="loginField pl-3 primeFieldReset primeFieldPassword"
          v-on:input="
            () => {
              this.message = '';
            }
          "
        />

        <p class="errorMessage">{{ message }}</p>
        <Toast/>
        <button class="loginField buttonLogin mb-2 mt-5 h-2rem sm:h-3rem">
          Sign in
        </button>

        <div class="remember flex justify-content-between">
          <div>
            <input type="checkbox" checked id="check" />
            <label for="check">Lembre-se de mim</label>
          </div>

          <a href="#">Precisa de ajuda?</a>
        </div>
      </form>
    </div>
    <footer></footer>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        //tem que bater com os campos que o django aceita
        username: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    makeLogin: async function () {
      this.$auth
        .loginWith("local", { data: this.user }) //Login sucesso
        .then((resposta) => {
          console.log("USUÁRIO LOGADO!!");
        }) //falha no login
        .catch((resposta) => {
          console.log(resposta);
          this.user.username = "";
          this.user.password = "";
          this.message = "Usuário ou Senha inválidos!";
          setTimeout(() => {
            this.message = "";
          }, 5000);


          this.$toast.add(
            {
              severity: "error",
              summary: 'Erro no Login',
              detail:'Usuário ou Senha inválidos',
              life: 5000,
            }
          )
        });
    },
  },
};
</script>
<style lang="scss" scoped>
$header-height: 10vh;
$footer-height: 16vh;
main {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;

  background-image: url("@/static/fundo_login.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-image: cover;

  header {
    width: 100vw;
    height: 10vh;
    min-width: 60px;
    /* background-color: black; */

    .manflixLogo {
      height: 90%;
      width: 250px;
      margin-left: 10px;
    }
  }

  .loginContainer {
    width: 100vw;
    height: calc(100vh - $footer-height - $header-height);
    /* background-color: burlywood; */

    .login {
      display: flex;
      flex-direction: column;
      width: 25vw;
      height: 80%;
      background-color: var(--dark-transparent-color);
      color: white;
      padding-top: 35px;
      padding-bottom: 35px;

      .loginField {
        border: none;
        border-radius: 3px;
        color: white;
        outline: 0;
        background-color: var(--background-field-color);

        &::placeholder {
          color: var(--placeholder-field-color);
          font-size: 14px;
          font-family: "NetflixSansRegular";
        }
      }

      .buttonLogin {
        background-color: var(--background-btn-color);
        cursor: pointer;
      }
      .remember {
        font-size: 11px;
        input {
          margin-left: 5px;
          width: auto;
          color: var(--placeholder-field-color);
        }
        label {
          width: auto;
        }
        a {
          margin-left: 5px;
          width: auto;
          text-decoration: none;
          color: var(--placeholder-field-color);
        }
      }
      .errorMessage {
        color: var(--background-btn-color);
        font-size: 12px;
        width: 100%;
        text-align: center;
      }
    }
  }

  footer {
    width: 100vw;
    height: $footer-height;
    background-color: var(--dark-transparent-color);
  }
}

// PARA RESPONSIVIDADE

// a ordem importa

/* @media screen and (max-width: 1000px) {
  main .loginContainer .login{
    width: 40vw !important ;
    h2{
      color: red;
    }
  }
}
*/
@media screen and (max-width: 450px) {
  header {
    background-color: var(--dark-transparent-color) !important;
  }

  .loginContainer {
    height: calc(100vh - $header-height) !important;
  }

  .login {
    width: 100vw !important ;
    height: 100vh !important;
  }

  footer {
    display: none !important;
  }
}
</style>
