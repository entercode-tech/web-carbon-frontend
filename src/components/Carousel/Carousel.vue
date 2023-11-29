<template>
  <div class="mt-10">
    <Carousel :items-to-show="1" :wrap-around="true">
      <Slide v-for="(item, index) in dataPostcard" :key="index">
        <div class="carousel__item px-4">
          <div class="text-left w-[330px]">
            <img class="rounded-lg" :src="item.file_carbon_path" alt="Carousel Image" />
            <div v-for="data in guest" class="mt-10">
              <div v-if="item.guest_id === data.id">
                <h1 class="text-[yellow] text-4xl font-bold">{{ data.first_name }} {{ data.last_name }}</h1>
                <div class="flex">
                  <div>
                    <h3 class="text-[yellow] text-2xl font-normal">{{ data.location }}</h3>
                    <h3 class="text-[yellow] text-2xl font-normal">{{ item.metric_tons }}</h3>
                  </div>
                  <div>
                    <!-- <img :src="cloud" alt="Cloud" class="w-[200px] absolute bottom-[-40px] left-[30%]" /> -->
                    <img :src="cloud" alt="Cloud" class="h-[100px]" />
                  </div>
                </div>
              </div>
            </div>
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
import cloud from '@/assets/img/cloud.png'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'WrapAround',
  props: {
    dataPostcard: Array,
    guest: Array
  },
  data() {
    return {
      cloud,
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