!
<template>
  <main
    class="w-screen h-auto min-h-screen flex flex-column align-items-center justify-content-start"
  >
    <section
      class="banner w-screen flex flex-row align-items-center justify-content-center"
    >
      <div
        class="banner-info flex flex-row align-items-center justify-content-center"
      >
        <div
          class="info-content flex flex-column align-items-start justify-content-center"
        >
          <img :src="banner.logo" alt="Movie Logo" />
          <div class="rating">
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <span>2016 2 Temporadas</span>
          </div>
          <p v-if="banner.description">{{ banner.description }}</p>
        </div>
      </div>
      <img class="logoManflix" src="logo.png" alt="Logo" />
      <div class="banner-image">
        <img :src="banner.image" alt="Movie Image" />
      </div>
    </section>

     <section
      class="movies w-screen h-auto flex flex-column align-items-start justify-content-center"
    >
      <div class="movies-category">
        <section 
        v-for="index in noSection" 
        :key="index" 
        :id="'section' + index">

          <a :href="'#section' + (index - 1 <= 0? noSection : index - 1)"><</a>
          <div v-for="subIndex in noItems" :key="subIndex" class="item" 
          @click="()=>{
            banner.image =  $store.state.BASE_URL + movies[2].movies[(((index - 1)* noItems)+(subIndex - 1))].banner;
            banner.logo =  $store.state.BASE_URL + movies[2].movies[(((index - 1)* noItems)+(subIndex - 1))].logo;
            banner.description =   $store.state.BASE_URL + movies[2].movies[(((index - 1)* noItems)+(subIndex - 1))].banner;
            }">
            <img
              v-if=" movies[2] !== undefined" 
              :src="$store.state.BASE_URL + movies[2].movies[(((index - 1)* noItems)+(subIndex - 1))].foto"
            />
          </div>
          
          <a :href="'#section' + (index + 1 > noSection ? 1 : index + 1)">></a>
        </section>
      </div>
    </section> 
  </main>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      banner: {
        image:
          "https://www.dci.com.br/wp-content/uploads/2021/01/Matteo-foto-destacada-1130x580.jpg",
        logo: "https://i.pinimg.com/originals/25/cc/0f/25cc0fdfae3b599cdc07f662eff83577.png",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },

      movies: [],
      categories: [],
      noSection: 2,
      noItems: 4,
    };
  },
  methods: {
    getCategorias: async function () {
     await this.$axios
        .get(this.$store.state.BASE_URL + "/categoria")
        .then((resposta) => {
          console.log("categories:", resposta.data);
          this.categories = resposta.data;
        })
        .catch((error) => {
          console.log("categories ERRO!:", error);
        });
    },
    getMovie: async function () {
      console.log("dbnigfjn")
      this.categories.map((category) => {
        this.$axios
          .get('http://localhost:8000' + "/filmes?categoria=" + category.id)
          .then((resposta) => {
            console.log(resposta.data);
            this.movies.push({
              category: category,
              movies: resposta.data,
            });
            console.log("this.movies", this.movies);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  async created() {
    await Promise.all([this.getCategorias()]);
    this.getMovie();
  },
  // middlename: 'auth'
};
</script>

<style lang="scss" scoped>
$height-banner: 52vh;
$width-banner-image: 55vw;
main {
  background-color: var(--background-banner);
  color: var(--placeholder-field-color);
  
  .banner {
    background-color: var(--background-banner);
    .logoManflix {
      position: absolute;
      top: 10px;
      right: 45vw;
      /*width: 100px;
        eight: 80px; */
      z-index: 100; //eixo de altura assim como os eixo x e y
    }

    .banner-info {
      height: 100%;
      width: calc(100vw - $width-banner-image);

      .info-content {
        background-color: var(--background-banner);
        width: 80%;
        img {
          width: 350px;
          height: 80%;
        }
        i {
          color: var(--background-btn-color);
        }
      }
    }
    .banner-image {
      height: 100%;
      width: $width-banner-image;
      img {
        width: 100%;
        height: 100%;
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 11%
        );
        mask-image: linear-gradient(to right, transparent 0%, black 11%);
      }
    }
  }
  .movies {

    img{
      height: 100%;
      width: 100%;
    }

    $itemGrow: 1.2;
    $duration: 250ms;
    min-height: calc(100vh - $height-banner);
    background-color: var(--background-banner);

    scroll-behavior: smooth;
    .movies-category {
      display: grid;
      grid-template-columns: repeat(3, 100%);
      overflow: hidden;
      scroll-behavior: smooth;

      section{
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, auto);
        margin: 20px 0;
        .item{
          padding: 0 2px;
          transition: $duration all;
          cursor: pointer;
          &:hover{
            margin: 0 40px ;
            transform: scale($itemGrow);
          }
        }
        a{
          position: absolute;
          color: white;
          text-decoration: none;
          font-size: 6rem;
          background-color:black;
          width: 80px;
          padding: 20px;
          text-align: center;
          z-index: 1;

          &:nth-of-type(1){
            top: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(
              -90deg,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,1) 100%,
            )
          }
          &:nth-of-type(2){
            top: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(
              -90deg,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,1) 100%,
            )
          }
        }
      }
    }
  }
}
</style>
