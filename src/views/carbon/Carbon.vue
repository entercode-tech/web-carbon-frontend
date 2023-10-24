<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NavBar from '@/components/Navbar/Navbar.vue'
import InputDynamic from '@/components/Form/Input.vue'
import TextareaDynamic from '@/components/Form/Textarea.vue'
import RadioDynamic from '@/components/Form/Radio.vue'
import CarbonSection from '@/components/Carbon/Carbon.vue'
import BackgroundImage from '@/assets/img/Background/bg-2.png'
import Swal from 'sweetalert2'
import "leaflet/dist/leaflet.css"

export default {
  data() {
    return {
      BackgroundImage: BackgroundImage,
      listRadioButton: [
        {
          title: 'One Trips',
          value: 'One Trips',
        },
        {
          title: 'Multiple Trips',
          value: 'Multiple Trips',
        },
        {
          title: 'Charter',
          value: 'Charter',
        },
      ],
    }
  },
  components: {
    LayoutGuest,
    NavBar,
    RadioDynamic,
    TextareaDynamic,
    InputDynamic,
    CarbonSection,
  },
  methods: {
    redirectToFormUser() {
      const dataUser = localStorage.getItem('dataUser');
      if (!dataUser) {
        this.$router.push('/form-user');
      }
    },
  },
  created() {
    this.redirectToFormUser();
  },
}
</script>


<template>
  <LayoutGuest>
    <NavBar />
    <img :src="BackgroundImage" class="fixed w-screen h-screen top-0 left-0 w-full h-full object-cover" alt="">
    <div class="flex justify-center items-center h-screen mt-[200px]">
      <div class="bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
        <div class="flex items-center">
          <div class="bg-[#163331] p-2 rounded-full mr-4">
            <img src="https://sustainabletravel.org/wp-content/plugins/sti_client/public/assets/images/calculator.svg" alt="">
          </div>
          <div class="header text-left">
            <h1 class="text-2xl font-bold text-[#2e2e2e]">Calculate Your Travel Carbon Footprint</h1>
            <p class="text-sm text-[#2e2e2e] mt-1">Use our carbon footprint calculator to calculate your travel emissions and purchase carbon offsets. </p>
          </div>
        </div>

        <div class="content mt-10">
          <CarbonSection />
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>