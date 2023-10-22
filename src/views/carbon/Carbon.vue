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
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      step: 1,
      BackgroundImage: BackgroundImage,
      firstName: '',
      address: '',
      lastName: '',
      phoneNumber: '',
      photos: '',
      email: '',
      gender: '',
       genderOptions: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
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
    NavBar,
    RadioDynamic,
    TextareaDynamic,
    InputDynamic,
    CarbonSection
  },
  methods: {
    onSubmit() {
      const payload = {};
      payload.firstName = this.firstName
      payload.lastName = this.lastName
      payload.address = this.address
      payload.phoneNumber = this.phoneNumber
      payload.photos = this.photos
      payload.email = this.email
      payload.gender = this.gender

      if (!this.firstName || !this.address || !this.lastName || !this.phoneNumber || !this.photos || !this.email || !this.gender) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Failed!',
          text: 'All fields must be filled',
        });
      } else {
        this.step = 2
      }
    }
  }
};
</script>

<template>
  <LayoutGuest>
    <NavBar />
    <img :src="BackgroundImage" class="fixed w-screen h-screen top-0 left-0 w-full h-full object-cover" alt="">
    <div v-if="step === 1" class="flex justify-center items-center h-screen">
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
            <h1 class="text-2xl font-bold text-[#2e2e2e]">Fill Out the Form First</h1>
            <p class="text-sm text-[#2e2e2e] mt-1">Fill in your details to continue the Carbon calculation process.</p>
          </div>
        </div>

        <div class="content mt-10">
          <div class="carbon text-left text-[#2e2e2e]">
            <div class="grid grid-cols-3 gap-4">
              <div class="left-section col-span-2 border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
                <h1 class="text-xl font-semibold">
                  Biodata Form
                </h1>

                <div class="grid grid-cols-2 gap-4 mt-4">
                  <InputDynamic label="First Name" :value="firstName" inputId="namaDepanInput" type="text" :required="true" @value-updated="firstName = $event" />

                  <InputDynamic label="Last Name" :value="lastName" inputId="namaBelakangInput" type="text" :required="true"  @value-updated="lastName = $event" />
                </div>

                <div class="grid grid-cols-1 gap-4 mt-4">
                  <InputDynamic label="Email" :value="email" inputId="emailInput" type="email" :required="true"  @value-updated="email = $event" />
                </div>

                <div class="grid grid-cols-1 gap-4 mt-4">
                  <InputDynamic label="Phone Number" :value="phoneNumber" inputId="phoneInput" type="number" :required="true"  @value-updated="phoneNumber = $event" />
                </div>

                <div class="grid grid-cols-1 gap-4 mt-4">
                  <RadioDynamic label="Gender" inputName="gender" :genderOptions="genderOptions" :value="gender" :required="true" @value-updated="gender = $event" />
                </div>
                
                <div class="grid grid-cols-1 gap-4 mt-4">
                  <TextareaDynamic label="Address" :value="address" inputId="addressTextarea" :required="true"  @value-updated="address = $event" />
                </div>
              </div>

              <div>
                <div class="right-section border-[1px] border-[#cccccc] rounded-md py-4 px-6 bg-white bg-opacity-50">
                  <h1 class="text-xl font-semibold">
                    Additional Forms
                  </h1>

                  <div class="grid grid-cols-1 gap-4 mt-4">
                    <InputDynamic label="Photos" :value="photos" inputId="photosInput" type="file" :required="true"  @value-updated="photos = $event" />
                  </div>

                </div>
                <button class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSubmit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="flex justify-center items-center h-screen">
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
