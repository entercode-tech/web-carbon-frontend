<template>
  <div class="mt-10">
    <Carousel :items-to-show="1" :wrap-around="true">
      <Slide v-for="(item, index) in dataPostcard" :key="index">
        <div class="carousel__item px-4">
          <div>
            <!-- <h1 class="font-bold text-lg mb-2 bg-white">Code: {{ item }}</h1> -->
            <img class="rounded-lg" :src="item.file_carbon_path" alt="Carousel Image" />
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'WrapAround',
  props: {
    dataPostcard: Array
  },
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
})
</script>