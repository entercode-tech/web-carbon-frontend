<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axios from 'axios'

// Layout
import LayoutGuest from '@/layouts/LayoutGuest.vue'

// Image
import BackgroundImage from '@/assets/img/Background/bg-2.png'

// Components
import NavBar from '@/components/Navbar/Navbar.vue'
import InputDynamic from '@/components/Form/Input.vue'
import Carousel from '@/components/Carousel/Carousel.vue'

export default {
  data() {
    return {
      BackgroundImage: BackgroundImage,
      apiDomain: import.meta.env.VITE_API_URL,
      guestId: '',
      guest: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      postcardId: '',
      dataPostcard: [],
      amount: 0,
      step: 1,
    }
  },
  components: {
    LayoutGuest,
    InputDynamic,
    Carousel,
    NavBar,
  },
  methods: {
    redirectToFormUser() {
      const dataUser = localStorage.getItem('dataUser');
      if (!dataUser) {
        // this.$router.push('/form-user');
      }else{
        const userData = JSON.parse(dataUser).data;

        this.guestId = userData.id;
        this.firstName = userData.first_name;
        this.lastName = userData.last_name;
        this.email = userData.email;
        this.phoneNumber = '08';
        this.amount = 0;
      }
    },
    onPayment() {
      const payload = {}
      payload.guest_id = this.guestId
      payload.postcard_id = this.postcardId
      payload.currency = 'IDR'

      axios.post(`${this.apiDomain}/api/v1/donations`, payload)
        .then(response => {
          const data = response.data.data;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been saved successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = data
            }
          });
        })
        .catch(error => {
          let errorMessage = "An error occurred";

          if (error.message) {
            errorMessage = error.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: errorMessage,
          });
        });
    },
    onSelectPostcard(postcard) {
      this.postcardId = postcard.id
      this.onPayment();
    }

  },
  mounted() {
    axios.get(`${this.apiDomain}/api/v1/guests`)
    .then(res => {
      this.guest = res.data.data;
    })

    axios.get(`${this.apiDomain}/api/v1/postcards`)
    .then(response => {
      // console.log(response.data.data);
      this.dataPostcard = response.data.data;
    })
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
    <div class="mod-bg"></div>
    <div class="flex justify-center mb-4 mt-[25%] md:mt-[7%]">
      <div class="text-left p-10 z-10 rounded-lg w-[80%]">
        <!-- <div class="flex items-center">
          <div class="header text-left">
            <h1 class="text-2xl font-bold text-[#2e2e2e]">{{ $t('allPostCard.title') }} {{ this.firstName + ' ' + this.lastName }}</h1>
            <p class="text-sm text-[#2e2e2e] mt-1">{{ $t('allPostCard.description') }}</p>
          </div>
        </div> -->

        <div>
          <Carousel :guest="guest" :dataPostcard="dataPostcard" @onSelectPostcard="onSelectPostcard"/>
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>