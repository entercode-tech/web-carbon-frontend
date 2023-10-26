<script>
import axios from 'axios';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// Layout
import LayoutGuest from '@/layouts/LayoutGuest.vue'

// Components
import NavBar from '@/components/Navbar/Navbar.vue'
import Carousel from '@/components/Carousel/Carousel.vue'

// Image
import BackgroundImage from '@/assets/img/Background/bg-2.png'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      BackgroundImage: BackgroundImage,
      dataPostcard: [],
    };
  },
  components: {
    LayoutGuest,
    NavBar,
    Carousel
  },
  mounted() {
    axios.get(`${this.apiDomain}/api/v1/postcards`)
    .then(response => {
      this.dataPostcard = response.data.data;
    })
  },
  methods: {
  },
};
</script>

<template>
  <LayoutGuest>
    <NavBar />
    <img :src="BackgroundImage" class="fixed w-screen h-screen top-0 left-0 w-full h-full object-cover" alt="">

    <div class="flex justify-center items-center h-screen">
      <div class="bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
        <div class="flex items-center">
          <div class="bg-[#163331] p-2 rounded-full mr-4">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7C4 5.11438 4 4.17157 4.58579 3.58579C5.17157 3 6.11438 3 8 3H16C17.8856 3 18.8284 3 19.4142 3.58579C20 4.17157 20 5.11438 20 7V15C20 17.8284 20 19.2426 19.1213 20.1213C18.2426 21 16.8284 21 14 21H10C7.17157 21 5.75736 21 4.87868 20.1213C4 19.2426 4 17.8284 4 15V7Z" stroke="#FFF" stroke-width="2"/>
              <path d="M15 18L15 21M9 18L9 21" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 8L15 8" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 12L15 12" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="header text-left">
            <h1 class="text-2xl font-bold text-[#2e2e2e]">PostCard</h1>
            <p class="text-sm text-[#2e2e2e] mt-1">Carousel postcard.</p>
          </div>
        </div>

        <div >
          <Carousel :dataPostcard="dataPostcard" />
        </div>

      </div>
    </div>
  </LayoutGuest>

</template>
