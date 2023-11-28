<script>
import axios from 'axios';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NavBar from '@/components/Navbar/Navbar.vue'
import ModalPopup from '@/components/Modal/Modal.vue'
import InputDynamic from '@/components/Form/Input.vue'

// SweetAlert2
import Swal from 'sweetalert2';

// Image
import BackgroundImage from '@/assets/img/Background/bg-2.png'
import BackgroundTiger from '@/assets/img/PostCard/Tiger.png'
import BackgroundElephant from '@/assets/img/PostCard/Elephant.png'
import BackgroundKomodo from '@/assets/img/PostCard/Komodo.png'
import BackgroundBird from '@/assets/img/PostCard/Bird.png'

// Logo
import LogoCop28 from '@/assets/img/Logo/logo COP28.png'
import LogoKLHK from '@/assets/img/Logo/logo klhk.png'
import LogoIndonesia from '@/assets/img/Logo/Logo Indonesia.png'

import FramePostcard from '@/assets/img/PostCard/Frame.png'

export default {
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL,
      backgroundImages: [
        BackgroundTiger,
        BackgroundElephant,
        BackgroundBird,
        BackgroundKomodo,
      ],
      LogoKLHK: LogoKLHK,
      LogoIndonesia: LogoIndonesia,
      LogoCop28: LogoCop28,
      BackgroundPrimary: BackgroundTiger,
      BackgroundImage: BackgroundImage,
      FramePostcard: FramePostcard,
      sharePostcard: null,
      email: '',
      dataPostcard: [],
      uniq: '',
      selectFile: [],
      isSave: false,
      modalShow: false,
      allIncludeFile: [

        // {
        //   "id": 1,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },{
        //   "id": 2,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },{
        //   "id": 3,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },
        // {
        //   "id": 4,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },{
        //   "id": 5,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },{
        //   "id": 6,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },
        // {
        //   "id": 7,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },{
        //   "id": 8,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // },{
        //   "id": 9,
        //   "uniq_id": "1697978515000",
        //   "name": "test included files",
        //   "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
        //   "created_at": "2023-10-22T12:41:55.000000Z",
        //   "updated_at": "2023-10-22T12:41:55.000000Z"
        // }
      
      ],
    };
  },
  components: {
    LayoutGuest,
    InputDynamic,
    NavBar,
  },
  mounted() {
    const code = this.$route.params.code;
  
    axios.get(`${this.apiDomain}/api/v1/included-files`)
      .then(res => {
        this.allIncludeFile = res.data.data
      })

    axios.get(`${this.apiDomain}/api/v1/postcards?code=${code}`)
      .then(response => {
        console.log(response.data.data);
        if (response.data.data.length > 0) {
          this.dataPostcard = response.data.data[0];
          this.uniq = response.data.data[0].uniq_id;
        } else {
          // Tampilkan pesan jika postcard tidak ditemukan
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Postcard not found',
          });
        }
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
  methods: {
    async onSend() {
      const uniq_id = this.uniq;
      let load = document.querySelector('.in-load')
      load.disable = true
      load.innerHTML = 'Send <i class="ml-2 fa-solid fa-circle-notch load"></i>'
      const payload = {};
      payload.included_files = this.selectFile
      axios.post(`${this.apiDomain}/api/v1/postcards/${uniq_id}/send-email`, payload)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been sended successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/');
            }
          });
        })
        .catch(error => {
          load.innerHTML = 'Send'
          load.disable = false
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

      this.modalShow = !this.modalShow; 
    },
  },
};
</script>

<template>
  <LayoutGuest>
    <NavBar />
    <img :src="BackgroundImage" class="fixed w-screen h-screen top-0 left-0 w-full h-full object-cover" alt="">
    <div class="flex justify-center mb-4 mt-[25%] md:mt-[7%]">
      <div class="resp-box bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
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
            <h1 class="text-md md:text-2xl font-bold text-[#2e2e2e]">Share Postcard</h1>
            <p class="text-xs md:text-sm text-[#2e2e2e] mt-1">Send your postcard to yourself or to your friend.</p>
          </div>
        </div>

        <div class="content mt-10 text-left">
          <div class="grid grid-cols-1 gap-4 mt-4">
            <InputDynamic placeholder="Email ?" label="Email" :value="email" inputId="emailInput" type="email" :required="true"  @value-updated="email = $event" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <div>
              <img :src="dataPostcard.file_carbon_path" class="rounded-lg" alt="">
            </div>
            <div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="file in allIncludeFile" :key="file.id">
                  <div class="bg-transparent border-[1px] border-gray-300 bg-white bg-opacity-50 rounded-md h-40 relative">
                    <img :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png'" class="mx-auto h-20 mt-4 object-cover" alt="">
                    <h2 class="text-sm mt-4 text-center font-normal">{{ file.name }}</h2>

                    <input type="checkbox" :value="file.id" v-model="selectFile" class="absolute top-0 left-0 border-[#ccccc] rounded-sm">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="in-load bg-[#476b6b] text-white px-8 mt-4 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSend">
            Send
          </button>
        </div>
      </div>
    </div>
  </LayoutGuest>

</template>
