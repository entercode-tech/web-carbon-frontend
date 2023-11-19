<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// SweetAlert2
import Swal from 'sweetalert2';

// Layout
import LayoutGuest from '@/layouts/LayoutGuest.vue'

// Components
import NavBar from '@/components/Navbar/Navbar.vue'
import InputDynamic from '@/components/Form/Input.vue'
import TextareaDynamic from '@/components/Form/Textarea.vue'
import RadioDynamic from '@/components/Form/Radio.vue'
import CarbonSection from '@/components/Carbon/Carbon.vue'
import GoogleMaps from '@/components/Maps/GoogleMaps.vue'
import AddressAutocomplete from '@/components/Maps/AddressAutocomplete.vue'

// Image
import BackgroundImage from '@/assets/img/Background/bg-2.png'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      mapsKey: import.meta.env.VITE_MAPS_KEY,
      BackgroundImage: BackgroundImage,
      firstName: '',
      address: '',
      latitude: 40.689247,
      longitude: -74.044502,
      lastName: '',
      email: '',
      showGoogleMaps: false,
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
      ]
    };
  },
  components: {
    LayoutGuest,
    GoogleMaps,
    AddressAutocomplete,
    NavBar,
    RadioDynamic,
    TextareaDynamic,
    InputDynamic,
    CarbonSection
  },
  created() {
    setTimeout(() => {
      this.showGoogleMaps = true;
    }, 1000);
  },
  methods: {
    onSubmit() {
      if (!this.firstName || !this.address || !this.lastName || !this.email) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Failed!',
          text: 'All fields must be filled',
        });
      } else {
        const payload = {};
        payload.first_name = this.firstName
        payload.last_name = this.lastName
        payload.location = this.address
        payload.email = this.email

        axios.post(`${this.apiDomain}/api/v1/guests`, payload)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been saved successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem('dataUser', JSON.stringify(response.data));
              this.$router.push('/carbon');
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
      }
    },
    onSearchMap(e) {
      this.showGoogleMaps = false;
      const latitude = e.geometry.location.lat();
      const longitude = e.geometry.location.lng();
      const address = e.formatted_address;
    
      this.address = address
      this.latitude = latitude
      this.longitude = longitude  
      
      setTimeout(() => {
        this.showGoogleMaps = true;
      }, 500);
    }
  }
};
</script>

<template>
  <LayoutGuest>
    <NavBar />
    <img :src="BackgroundImage" class="fixed w-screen h-screen top-0 left-0 w-full h-full object-cover" alt="">
    <div class="flex justify-center mb-4 mt-[25%] md:mt-[7%]">
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
            <h1 class="text-md md:text-2xl font-bold text-[#2e2e2e]">{{ $t('formUser.formTitle') }}</h1>
            <p class="text-xs md:text-sm text-[#2e2e2e] mt-1">{{ $t('formUser.formSubtitle') }}</p>
          </div>
        </div>

        <div class="content mt-10">
          <div class="carbon text-left text-[#2e2e2e]">
            <div class="grid grid-cols-1 gap-4">
              <div class="left-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
                <h1 class="text-xl font-semibold">
                  {{ $t('formUser.biodataSection') }}
                </h1>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                  <InputDynamic :label="$t('formUser.firstNameLabel')" :value="firstName" inputId="namaDepanInput" type="text" :required="true" @value-updated="firstName = $event" />
                  <InputDynamic :label="$t('formUser.lastNameLabel')" :value="lastName" inputId="namaBelakangInput" type="text" :required="true"  @value-updated="lastName = $event" />
                </div>
                <div class="grid grid-cols-1 gap-4 mt-4">
                  <InputDynamic :label="$t('formUser.emailLabel')" :value="email" inputId="emailInput" type="email" :required="true"  @value-updated="email = $event" />
                </div>
              </div>
              <div class="left-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
                <h1 class="text-xl font-semibold">
                  {{ $t('formUser.locationSection') }}
                </h1>

                <div class="grid grid-cols-1 gap-4 mt-4">
                  <AddressAutocomplete :mapsKey="mapsKey" @searchMaps="onSearchMap" />

                  <div class="grid grid-cols-1 gap-4 mt-4 rounded-md overflow-hidden">
                    <div class="h-[500px]">
                      <GoogleMaps :mapsKey="mapsKey" v-if="showGoogleMaps" :longitude="longitude" :latitude="latitude"/>
                      <div v-else class="flex items-center justify-center h-full bg-white bg-opacity-50 rounded-md border-[1px] relative border-[#cccccc]">
                        <div class="animate-spin w-16 h-16 border-t-4 border-[#476b6b] border-solid rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSubmit">
              {{ $t('formUser.submitButton') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </LayoutGuest>

</template>
