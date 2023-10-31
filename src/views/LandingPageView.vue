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
        <div class="w-[40%]">
          <h1 class="text-6xl text-white font-extrabold">Tackling Pollution Solutions for a Clean Future</h1>
          <p class="text-md text-white font-normal mt-4">In an increasingly environmentally conscious era, pursuing solutions to tackle pollution is an important step towards a clean and sustainable future.</p>
          <Button class="mt-6" label="Carbon" @trigger="onCarbon" />
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>
