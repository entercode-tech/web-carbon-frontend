<script>
import axios from 'axios';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NavBar from '@/components/Navbar/Navbar.vue'
import ModalPopup from '@/components/Modal/Modal.vue'
import Camera from "simple-vue-camera";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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
      step: 1,
      isSave: false,
      modalShow: false,
      allPhotos: [],
      allIncludeFile: [
        {
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },{
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },{
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },
        {
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },{
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },{
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },
        {
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },{
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        },{
          "id": 1,
          "uniq_id": "1697978515000",
          "name": "test included files",
          "image_path": "http://localhost:8000/storage/images/included_files/1697978515.jpg",
          "created_at": "2023-10-22T12:41:55.000000Z",
          "updated_at": "2023-10-22T12:41:55.000000Z"
        }
      ],
      profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0oQFYvdeYbxXLZ2quUF56tCS-EofeHprWeiBQ0VgWw&s',
      uniqId: '',
      fullName: '-',
      address: '-',
      transportationType: '-',
      tripType: '-',
      totalMetricTons: 1.55,
      totalCost: 22.44,
    };
  },
  components: {
    LayoutGuest,
    Camera,
    NavBar,
    toPng, 
    toJpeg, 
    ModalPopup,
    toBlob, 
    toPixelData, 
    toSvg
  },
  mounted() {
    const dataUser = localStorage.getItem('dataUser');
    const dataCarbon = localStorage.getItem('dataCarbon');
    const dataPhoto = localStorage.getItem('dataPhoto');

    if(dataPhoto){
      this.step = 2;
      this.allPhotos = JSON.parse(dataPhoto);
    }

    if (dataUser) {
      const userData = JSON.parse(dataUser).data;
      const carbonData = JSON.parse(dataCarbon);

      this.fullName = userData.first_name + ' ' + userData.last_name;
      this.address = userData.location;
      this.uniqId = userData.id;
      this.transportationType = carbonData.transportationType;
      this.tripType = carbonData.tripType;
      this.totalMetricTons = carbonData.totalMetricTons;
      this.totalCost = carbonData.totalPriceMetricTons;
    }
  },
  methods: {
    startDrag(index) {
      event.dataTransfer.setData('text', this.backgroundImages[index]);
    },
    allowDrop(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const imageUrl = event.dataTransfer.getData('text');
      this.BackgroundPrimary = imageUrl;
    },
    startDragProfile(index) {
      event.dataTransfer.setData('text', this.allPhotos[index]);
      this.profilePhoto = this.allPhotos[index];
    },
    allowDropProfile(event) {
      event.preventDefault();
    },
    handleDropProfile(event) {
      event.preventDefault();
      const imageUrl = event.dataTransfer.getData('text');
      this.profilePhoto = imageUrl;
    },
    onSave() {
      const self = this; 

      htmlToImage.toJpeg(document.getElementById('postcard_download'), { quality: 0.95 })
      .then(function (dataUrl) {
        const filename = "image.jpg";
        const file = self.convertJpg(dataUrl, filename);

        const payload = new FormData();
        payload.append('guest_id', self.uniqId);
        payload.append('metric_tons', self.totalMetricTons);
        payload.append('file_carbon', file);

        axios.post(`${self.apiDomain}/api/v1/postcards`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been saved successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
             self.isSave = true
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
      });
    },
    onShare() {
      this.modalShow = !this.modalShow; 
    },
    convertJpg(dataURL, filename) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    triggerPhoto(){
      let dataPhoto = localStorage.getItem('dataPhoto');
      if (dataPhoto) {
        this.allPhotos = JSON.parse(dataPhoto);
      }
    },
    deletePhoto(index) {
      let dataPhoto = localStorage.getItem('dataPhoto');
      if (dataPhoto) {
        let photoData = JSON.parse(dataPhoto);
        photoData.splice(index, 1);
        localStorage.setItem('dataPhoto', JSON.stringify(photoData));
        this.allPhotos = photoData;
      }
    }
  },
  setup() {
    const camera = ref();
    const photoSrc = ref('');

    const snapshot = async () => {
      if (camera.value) {
        const blob = await camera.value.snapshot();
        const base64 = await convertBlobToBase64(blob);
        photoSrc.value = base64;

        let dataPhoto = localStorage.getItem('dataPhoto');

        if(dataPhoto) {
          let arrPhoto = JSON.parse(dataPhoto);
          arrPhoto.push(base64)
          localStorage.setItem('dataPhoto', JSON.stringify(arrPhoto));
          
        }else{
          let arrPhoto = [];
          arrPhoto.push(base64)
          localStorage.setItem('dataPhoto', JSON.stringify(arrPhoto));
        }
        document.getElementById('trigger').click();
      }
    }
    const convertBlobToBase64 = (blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    };

    return {
      camera,
      snapshot,
      photoSrc
    }
  }
};
</script>

<template>
  <LayoutGuest>
    <NavBar />
    <img :src="BackgroundImage" class="fixed w-screen h-screen top-0 left-0 w-full h-full object-cover" alt="">
    <div class="flex justify-center items-center h-screen">
      <div v-if="step === 1" class="bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
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
            <h1 class="text-2xl font-bold text-[#2e2e2e]">Camera</h1>
            <p class="text-sm text-[#2e2e2e] mt-1">Take photo.</p>
          </div>
        </div>

        <div class="content mt-10">
          <div class="carbon text-left text-[#2e2e2e]">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-1 rounded-md overflow-hidden">
                <div class="grid grid-cols-1 gap-4">
                    <div class="rounded-md overflow-hidden">
                      <camera class="w-full" :resolution="{ width: 220, height: 220 }" ref="camera" autoplay></camera>
                    </div>
                    <button class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="snapshot">
                      Caputure
                    </button>
                    <button class="hidden" id="trigger" @click="triggerPhoto">Trigger</button>
                </div>
              </div>
              <div class="col-span-2 rounded-md overflow-hidden">
                <div class="flex justify-between">
                  <h1 class="text-2xl font-bold text-[#2e2e2e]">Photo Post Card</h1>

                  <button v-if="allPhotos.length" class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="step = 2">
                    Next Step
                  </button>
                </div>
                <div class="grid grid-cols-4 gap-4 mt-4">
                    <div v-for="(photo, index) in allPhotos" :key="index" class="relative">
                      <div @click="deletePhoto(index)" class="absolute top-0 right-0 w-[30px] h-[30px] text-center flex items-center justify-center rounded-md cursor-pointer bg-[#cd7272] text-[#891111]">
                        x
                      </div>
                      <img
                        :src="photo"
                        :alt="`Photo ${index}`"
                      />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
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
            <h1 class="text-2xl font-bold text-[#2e2e2e]">Post Card</h1>
            <p class="text-sm text-[#2e2e2e] mt-1">Print and email your postcard.</p>
          </div>
        </div>

        <div class="content mt-10">
          <div class="carbon text-left text-[#2e2e2e]">
            <div class="grid grid-cols-4 gap-4">
              <div id="postcard_download" class="col-span-2 border-[1px] h-[400px] border-[#cccccc] rounded-md overflow-hidden bg-white bg-opacity-50 relative"
                @dragover="allowDrop"
                @drop="handleDrop">
                
                <div class="flex absolute top-4 left-4 z-10">
                  <img :src="LogoKLHK" alt="Logo" class="h-10 rounded-md mr-2" />
                  <img :src="LogoIndonesia" alt="Logo" class="h-10 rounded-md mr-2" />
                  <img :src="LogoCop28" alt="Logo" class="h-10 rounded-md mr-2" />
                </div>

                <img class="absolute top-[22%] left-[8.3%] rounded-full h-[220px] w-[220px]" :src="profilePhoto" alt="Captured Photo" />
                <img :src="FramePostcard" class="absolute left-0 top-0 h-full" />
                <img :src="BackgroundPrimary" class="h-[400px] object-cover w-full" />


                <div class="bg-white absolute top-20 right-6 w-[50%] p-4 bg-opacity-60 rounded-md">
                  <h1 class="text-md font-bold text-[#2e2e2e]">My Carbon Footprint</h1>
                  <h1 class="text-md font-normal text-[#2e2e2e]">{{fullName}}, {{address}}</h1>

                  <h1 class="text-md font-bold mt-4 text-[#2e2e2e]">{{transportationType}} Footprint</h1>
                  <div class="flex justify-between">
                    <h1 class="text-md font-normal text-[#2e2e2e]">{{transportationType}}: {{tripType}}</h1>
                    <h1 class="text-md font-normal text-[#2e2e2e]">{{totalMetricTons}} MT</h1>
                  </div>

                  <hr class="text-[#000] border-[1] border-[#000] my-4">

                  <div class="flex justify-between mt-4">
                    <h1 class="text-md font-normal text-[#2e2e2e]">Total Metric Tons</h1>
                    <h1 class="text-md font-normal text-[#2e2e2e]">{{totalMetricTons}} MT</h1>
                  </div>
                  <div class="flex justify-between">
                    <h1 class="text-md font-bold text-[#2e2e2e]">Cost to Offset</h1>
                    <h1 class="text-md font-bold text-[#2e2e2e]">$ {{totalCost}}</h1>
                  </div>
                </div>
              </div>

              <div class="col-span-1 rounded-md overflow-hidden">
                <h1 class="text-2xl font-bold text-[#2e2e2e]">Background Post Card</h1>
                <div class="grid grid-cols-2 gap-4 border-[1px] mt-4 border-[#cccccc] bg-white bg-opacity-50">
                  <img v-for="(backgroundImage, index) in backgroundImages" 
                    :key="index" 
                    :src="backgroundImage" 
                    class="object-cover w-full rounded-md cursor-pointer" 
                    draggable="true" 
                    @dragstart="startDrag(index)" 
                  />
                </div>
              </div>

              <div class="col-span-1">
                <h1 class="text-2xl font-bold text-[#2e2e2e]">Photo Assets</h1>
                <div class="grid grid-cols-2 gap-4 border-[1px] mt-4 border-[#cccccc] bg-white bg-opacity-50">
                  <div v-for="(photo, index) in allPhotos" :key="index" class="relative">
                    <img
                      :src="photo"
                      :alt="`Photo ${index}`"
                      draggable="true" 
                      @dragstart="startDragProfile(index)" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <button v-if="!isSave" class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSave">
              Save
            </button>
            <button v-else class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onShare">
              Share
            </button>
          </div>
        </div>
      </div>
      <ModalPopup :show="modalShow">
        <div class="p-4">
          <h2 class="text-xl font-bold">Select the additional files you want to select</h2>
          <p>This is optional, if you don't have any files to add, then just continue.</p>

          <div class="grid grid-cols-3 gap-4 mt-10">
            <div v-for="file in allIncludeFile" :key="file.id" class="flex justify-center items-center">
              <div class="bg-transparent border-[1px] border-gray-300 rounded-md w-40 h-40 relative">
                <img :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png'" class="mx-auto h-20 mt-4 object-cover" alt="">
                <h2 class="text-sm mt-4 text-center font-normal">{{ file.name }}</h2>

                <input type="checkbox" name="" class="absolute top-0 left-0 border-[#ccccc] rounded-sm" id="">
              </div>  
            </div>
          </div>
          <div class="flex mt-8 justify-end">
            <button @click="onShare" class="bg-red-500 text-white px-4 py-2 mr-3 rounded">Close</button>
            <button @click="onShare" class="bg-[#476b6b] text-white px-4 py-2 rounded">Send Email</button>
          </div>
        </div>
      </ModalPopup>
    </div>
  </LayoutGuest>

</template>
