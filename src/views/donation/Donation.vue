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
      firstName: '',
      lastName: '',
      code: '',
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
        this.$router.push('/form-user');
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
      payload.postcard_id = this.dataPostcard[0].id
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
    onSearch(e){
      if(e){
        axios.get(`${this.apiDomain}/api/v1/postcards?code=${e}`)
        .then(response => {
          console.log(response)
          this.dataPostcard = response.data.data;
        })
      }else{
        this.dataPostcard = []
      }
    }
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
    <div class="flex justify-center mb-4 mt-[25%] md:mt-[7%]">
      <div class="bg-white text-left p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div class="col-span-1 md:col-span-3">
            <div class="flex items-center">
              <div class="header text-left">
                <h1 class="text-2xl font-bold text-[#2e2e2e]">Hello, {{ this.firstName + ' ' + this.lastName }}</h1>
                <p class="text-sm text-[#2e2e2e] mt-1">Thank you for helping us by donating, whatever your donation is, it means a lot to us.</p>
              </div>
            </div>

            <div class="mt-4">
              <InputDynamic label="Postcard Code" :value="code" inputId="codeInput" type="text" :required="true"  @value-updated="onSearch($event)" />
            </div>

            <button class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onPayment">
              Donation
            </button>
          </div>
          <div class="col-span-1 md:col-span-2">
            <div v-for="(item, index) in dataPostcard" :key="index">
              <img class="rounded-lg" :src="item.file_carbon_path" alt="Carousel Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutGuest>
</template>