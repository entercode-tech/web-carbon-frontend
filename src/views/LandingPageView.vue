<script>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import LayoutGuest from '@/layouts/LayoutGuest.vue'
  import BackgroundHeader from '@/assets/img/Background/bg-4.jpg'
  import NavBar from '@/components/Navbar/Navbar.vue'
  import Button from '@/components/Button/Button.vue'

  export default {
    data() {
      return {
        BackgroundHeader: BackgroundHeader
      };
    },
    components: {
      NavBar,
      Button
    },
    methods: {
      onCarbon(){
        this.$router.push('/carbon')
      }
    }
  };
</script>

<template>
  <LayoutGuest>
    <NavBar/>
    <div class="cb-header relative w-full h-screen">
      <div class="w-full h-screen bg-[#000] bg-opacity-50 absolute top-0 z-10 backdrop-blur-sm"></div>
      <img :src="BackgroundHeader" class="w-full h-screen absolute top-0 object-cover" alt="Background Header">

      <div class="flex items-center pl-[10%] h-screen w-full absolute z-10">
        <div class="resp-box w-[40%]">
          <h1 class="resp-text-title text-6xl text-white font-extrabold">{{ $t('landingPage.title') }}</h1>
          <p class="text-md text-white font-normal mt-4">{{ $t('landingPage.description') }}</p>
          <Button class="mt-6" :label="$t('landingPage.button')" @trigger="onCarbon" />
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>
