<template>
  <div class="carousel">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide  v-for="(item, index) in dataPostcard" :key="index">
        <img :src="item.file_carbon_path" alt="Carousel Image" />
      </swiper-slide>
    </swiper>
    <button @click="ss">{{dataPostcard.length}}</button>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/pagination';
  import { EffectCoverflow, Pagination } from 'swiper/modules';

  export default {
    props: {
      dataPostcard: Array
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
      return{
        modules: [EffectCoverflow, Pagination],
      };
    },
    methods: {
      ss(){
        console.log(this.dataPostcard)
      }
    }
  };
</script>

<style scoped>
  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 600px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
</style>
