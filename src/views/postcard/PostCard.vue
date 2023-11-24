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
      allMetric: [],
      allIncludeFile: [],
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
    const dataAllCarbon = localStorage.getItem('dataAllCarbon');
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

    if(dataAllCarbon) {
      this.allMetric = JSON.parse(dataAllCarbon)
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
      let load = document.querySelector('.in-load')
      load.innerHTML += '<i class="ml-2 fa-solid fa-circle-notch load"></i>'

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
              self.$router.push({ name: 'sharePostcard', params: { code: response.data.data.code } });
              self.isSave = true;
            }
          });
        })
        .catch(error => {
          load.innerHTML = 'Save'
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
    async onShare() {
      axios.get(`${this.apiDomain}/api/v1/included-files`)
        .then(response => {
          this.allIncludeFile = response.data.data
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
      <div v-if="step === 1" class="resp-box bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
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
              <div class="resp-col col-span-1 rounded-md overflow-hidden">
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
              <div class="resp-col col-span-2 rounded-md overflow-hidden">
                <div class="resp-flex flex justify-between">
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
      <div v-else class="resp-box bg-white text-center p-10 z-10 rounded-lg bg-opacity-70 backdrop-blur-2xl w-[80%]">
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
            <div class="grid grid-cols-3 gap-4">

              <div v-if="step === 2" class="resp-col col-span-1">
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
              <div v-if="step === 3" class="resp-col col-span-1 rounded-md overflow-hidden">
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

              <div id="postcard_download" class="resp-col resp-h col-span-2 border-[1px] h-[500px] border-[#cccccc] rounded-md overflow-hidden bg-white bg-opacity-50 relative"
                @dragover="allowDrop"
                @drop="handleDrop">
                
                <div class="resp-logo flex absolute top-4 left-4 z-10">
                  <img :src="LogoKLHK" alt="Logo" class="resp-img-logo h-10 rounded-md mr-2" />
                  <img :src="LogoIndonesia" alt="Logo" class="resp-img-logo h-10 rounded-md mr-2" />
                  <img :src="LogoCop28" alt="Logo" class="resp-img-logo h-10 rounded-md mr-2" />
                </div>

                <img class="resp-capture absolute top-[22%] left-[8.3%] rounded-full h-[268px] w-[268px]" :src="profilePhoto" alt="Captured Photo" />
                <img :src="FramePostcard" class="absolute left-0 top-0 h-full" />
                <img :src="BackgroundPrimary" class="resp-h h-[500px] object-cover w-full" />

                <div class="resp-right absolute top-4 right-6 text-right">
                  <h1 class="resp-text-title2 text-4xl font-bold text-[#2e2e2e]">My Carbon Footprint</h1>
                  <h1 class="text-md font-normal text-[#2e2e2e]">{{fullName}}, {{address}}</h1>
                </div>

                <div class="resp-box2 bg-white absolute top-20 right-6 w-[50%] p-4 bg-opacity-80 rounded-md">
                  <h1 class="resp-text-title3 text-lg font-bold text-[#2e2e2e]">Your Carbon Footprint</h1>

                  <div class="relative">
                    <svg class="mx-auto mt-10 resp-svg" width="242" height="94" viewBox="0 0 242 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M240.733 56.4533C240.452 56.4531 240.182 56.3582 239.976 56.1879C239.771 56.0175 239.646 55.7843 239.626 55.5352C238.9 46.7639 234.475 38.5599 227.235 32.5648C219.996 26.5697 210.476 23.2258 200.582 23.2021C199.398 23.2021 198.154 23.2556 196.885 23.3612C196.672 23.3789 196.459 23.3419 196.269 23.2546C196.08 23.1673 195.923 23.0335 195.817 22.869C191.272 15.7976 184.485 10.0726 176.303 6.40835C168.121 2.74413 158.905 1.30301 149.808 2.26484C140.71 3.22666 132.132 6.54883 125.145 11.8167C118.157 17.0847 113.07 24.065 110.518 31.8867C110.451 32.0963 110.307 32.28 110.109 32.409C109.911 32.5379 109.671 32.6048 109.426 32.599L109.13 32.5911C108.977 32.5865 108.823 32.5817 108.668 32.5817C101.164 32.6026 93.8927 34.9037 88.0616 39.1032C82.2306 43.3027 78.1902 49.1482 76.6109 55.6697C76.5583 55.8913 76.4216 56.0901 76.2237 56.2328C76.0259 56.3755 75.7788 56.4533 75.524 56.4533H1.11074C0.816151 56.4533 0.53363 56.3493 0.325327 56.1642C0.117023 55.979 0 55.7279 0 55.466C0 55.2042 0.117023 54.953 0.325327 54.7679C0.53363 54.5827 0.816151 54.4787 1.11074 54.4787H74.6351C76.486 47.6954 80.8397 41.6587 87.0014 37.3319C93.1631 33.005 100.778 30.6375 108.63 30.607C111.426 22.5693 116.787 15.4261 124.063 10.0454C131.339 4.66461 140.216 1.27785 149.616 0.296527C159.016 -0.684798 168.534 0.78155 177.015 4.51743C185.495 8.2533 192.572 14.0979 197.387 21.3412C198.48 21.2655 199.551 21.2274 200.582 21.2274C211.038 21.2526 221.098 24.7866 228.748 31.1222C236.398 37.4577 241.075 46.1276 241.842 55.3968C241.852 55.5262 241.834 55.6561 241.788 55.779C241.741 55.902 241.668 56.0157 241.573 56.1136C241.477 56.2115 241.361 56.2917 241.23 56.3495C241.099 56.4074 240.957 56.4419 240.812 56.4509C240.785 56.4526 240.759 56.4533 240.733 56.4533Z" fill="#9CA3AF"></path>
                      <path d="M227.517 69.1124H45.3563C45.0618 69.1124 44.7792 69.0084 44.5709 68.8233C44.3626 68.6381 44.2456 68.387 44.2456 68.1251C44.2456 67.8633 44.3626 67.6121 44.5709 67.427C44.7792 67.2418 45.0618 67.1378 45.3563 67.1378H227.517C227.812 67.1378 228.094 67.2418 228.303 67.427C228.511 67.6121 228.628 67.8633 228.628 68.1251C228.628 68.387 228.511 68.6381 228.303 68.8233C228.094 69.0084 227.812 69.1124 227.517 69.1124Z" fill="#9CA3AF"></path>
                      <path d="M89.7862 83.4289H28.6957C28.4011 83.4289 28.1186 83.3249 27.9103 83.1397C27.702 82.9546 27.585 82.7034 27.585 82.4416C27.585 82.1797 27.702 81.9286 27.9103 81.7434C28.1186 81.5583 28.4011 81.4543 28.6957 81.4543H89.7862C90.0808 81.4543 90.3633 81.5583 90.5716 81.7434C90.78 81.9286 90.897 82.1797 90.897 82.4416C90.897 82.7034 90.78 82.9546 90.5716 83.1397C90.3633 83.3249 90.0808 83.4289 89.7862 83.4289Z" fill="#9CA3AF"></path>
                      <path d="M240.733 56.7536C240.452 56.7534 240.182 56.6585 239.976 56.4882C239.771 56.3178 239.646 56.0846 239.626 55.8355C238.9 47.0642 234.475 38.8602 227.235 32.8651C219.996 26.87 210.476 23.526 200.582 23.5024C199.398 23.5024 198.154 23.5559 196.885 23.6615C196.672 23.6792 196.459 23.6422 196.269 23.5549C196.08 23.4676 195.923 23.3337 195.817 23.1693C191.272 16.0979 184.485 10.3729 176.303 6.70864C168.121 3.04443 158.905 1.6033 149.808 2.56513C140.71 3.52695 132.132 6.84912 125.145 12.117C118.157 17.385 113.07 24.3653 110.518 32.187C110.451 32.3966 110.307 32.5803 110.109 32.7093C109.911 32.8382 109.671 32.9051 109.426 32.8993L109.13 32.8913C108.977 32.8868 108.823 32.882 108.668 32.882C101.164 32.9028 93.8927 35.204 88.0616 39.4035C82.2306 43.603 78.1902 49.4485 76.6109 55.97C76.5583 56.1916 76.4216 56.3904 76.2237 56.5331C76.0259 56.6758 75.7788 56.7536 75.524 56.7536H1.11074C0.816151 56.7536 0.53363 56.6496 0.325327 56.4645C0.117023 56.2793 0 56.0282 0 55.7663C0 55.5045 0.117023 55.2533 0.325327 55.0682C0.53363 54.883 0.816151 54.779 1.11074 54.779H74.6351C76.486 47.9957 80.8397 41.959 87.0014 37.6322C93.1631 33.3053 100.778 30.9378 108.63 30.9073C111.426 22.8696 116.787 15.7264 124.063 10.3457C131.339 4.9649 140.216 1.57815 149.616 0.59682C159.016 -0.384506 168.534 1.08184 177.015 4.81772C185.495 8.5536 192.572 14.3982 197.387 21.6415C198.48 21.5658 199.551 21.5277 200.582 21.5277C211.038 21.5529 221.098 25.0869 228.748 31.4225C236.398 37.758 241.075 46.4279 241.842 55.6971C241.852 55.8265 241.834 55.9564 241.788 56.0793C241.741 56.2023 241.668 56.316 241.573 56.4139C241.477 56.5118 241.361 56.592 241.23 56.6498C241.099 56.7077 240.957 56.7422 240.812 56.7512C240.785 56.7529 240.759 56.7536 240.733 56.7536Z" fill="url(#paint0_linear_588:8903)"></path>
                      <path d="M227.517 69.4127H45.3563C45.0618 69.4127 44.7792 69.3087 44.5709 69.1235C44.3626 68.9384 44.2456 68.6873 44.2456 68.4254C44.2456 68.1636 44.3626 67.9124 44.5709 67.7273C44.7792 67.5421 45.0618 67.4381 45.3563 67.4381H227.517C227.812 67.4381 228.094 67.5421 228.303 67.7273C228.511 67.9124 228.628 68.1636 228.628 68.4254C228.628 68.6873 228.511 68.9384 228.303 69.1235C228.094 69.3087 227.812 69.4127 227.517 69.4127Z" fill="url(#paint1_linear_588:8903)"></path>
                      <path d="M89.7862 83.7292H28.6957C28.4011 83.7292 28.1186 83.6252 27.9103 83.44C27.702 83.2549 27.585 83.0037 27.585 82.7419C27.585 82.48 27.702 82.2289 27.9103 82.0437C28.1186 81.8586 28.4011 81.7545 28.6957 81.7545H89.7862C90.0808 81.7545 90.3633 81.8586 90.5716 82.0437C90.78 82.2289 90.897 82.48 90.897 82.7419C90.897 83.0037 90.78 83.2549 90.5716 83.44C90.3633 83.6252 90.0808 83.7292 89.7862 83.7292Z" fill="url(#paint2_linear_588:8903)"></path>
                      <path d="M130.785 87.5V78.162H129.119L126.221 85.358L123.309 78.162H121.643V87.5H122.805V79.646L125.983 87.5H126.459L129.623 79.646V87.5H130.785ZM135.988 87.668C137.08 87.668 137.99 87.29 138.676 86.618L138.172 85.932C137.626 86.492 136.856 86.8 136.072 86.8C134.616 86.8 133.734 85.736 133.65 84.462H139.11V84.196C139.11 82.166 137.906 80.57 135.862 80.57C133.93 80.57 132.53 82.152 132.53 84.112C132.53 86.226 133.972 87.668 135.988 87.668ZM138.074 83.678H133.636C133.692 82.656 134.406 81.438 135.848 81.438C137.388 81.438 138.06 82.684 138.074 83.678ZM142.532 87.668C143.134 87.668 143.512 87.486 143.778 87.234L143.47 86.436C143.33 86.59 143.064 86.73 142.756 86.73C142.308 86.73 142.084 86.366 142.084 85.862V81.662H143.456V80.738H142.084V78.89H141.02V80.738H139.9V81.662H141.02V86.086C141.02 87.094 141.524 87.668 142.532 87.668ZM145.975 87.5V82.712C146.283 82.166 147.165 81.634 147.823 81.634C147.977 81.634 148.103 81.648 148.229 81.662V80.584C147.305 80.584 146.521 81.116 145.975 81.816V80.738H144.925V87.5H145.975ZM150.079 79.772C150.471 79.772 150.779 79.464 150.779 79.072C150.779 78.68 150.471 78.358 150.079 78.358C149.687 78.358 149.365 78.68 149.365 79.072C149.365 79.464 149.687 79.772 150.079 79.772ZM150.597 87.5V80.738H149.547V87.5H150.597ZM155.673 87.668C156.905 87.668 157.633 87.164 158.151 86.492L157.451 85.848C157.003 86.45 156.429 86.73 155.729 86.73C154.301 86.73 153.391 85.61 153.391 84.112C153.391 82.614 154.301 81.508 155.729 81.508C156.429 81.508 157.003 81.76 157.451 82.376L158.151 81.746C157.633 81.074 156.905 80.57 155.673 80.57C153.657 80.57 152.299 82.11 152.299 84.112C152.299 86.114 153.657 87.668 155.673 87.668ZM164.981 87.668C165.583 87.668 165.961 87.486 166.227 87.234L165.919 86.436C165.779 86.59 165.513 86.73 165.205 86.73C164.757 86.73 164.533 86.366 164.533 85.862V81.662H165.905V80.738H164.533V78.89H163.469V80.738H162.349V81.662H163.469V86.086C163.469 87.094 163.973 87.668 164.981 87.668ZM170.329 87.668C172.387 87.668 173.675 86.072 173.675 84.112C173.675 82.152 172.387 80.57 170.329 80.57C168.271 80.57 166.983 82.152 166.983 84.112C166.983 86.072 168.271 87.668 170.329 87.668ZM170.329 86.73C168.887 86.73 168.089 85.498 168.089 84.112C168.089 82.74 168.887 81.508 170.329 81.508C171.771 81.508 172.569 82.74 172.569 84.112C172.569 85.498 171.771 86.73 170.329 86.73ZM181 87.5V82.754C181 81.284 180.258 80.57 178.858 80.57C177.836 80.57 176.912 81.144 176.436 81.718V80.738H175.386V87.5H176.436V82.558C176.842 82.012 177.612 81.508 178.438 81.508C179.348 81.508 179.964 81.872 179.964 83.076V87.5H181ZM185.267 87.668C187.003 87.668 187.913 86.758 187.913 85.624C187.913 82.992 183.727 83.958 183.727 82.488C183.727 81.886 184.301 81.424 185.225 81.424C186.107 81.424 186.835 81.788 187.241 82.278L187.731 81.55C187.199 81.004 186.387 80.57 185.225 80.57C183.615 80.57 182.719 81.452 182.719 82.516C182.719 85.022 186.905 84.014 186.905 85.652C186.905 86.324 186.331 86.814 185.295 86.814C184.371 86.814 183.517 86.366 183.069 85.848L182.537 86.604C183.223 87.318 184.147 87.668 185.267 87.668ZM196.196 87.668C198.254 87.668 199.542 86.072 199.542 84.112C199.542 82.152 198.254 80.57 196.196 80.57C194.138 80.57 192.85 82.152 192.85 84.112C192.85 86.072 194.138 87.668 196.196 87.668ZM196.196 86.73C194.754 86.73 193.956 85.498 193.956 84.112C193.956 82.74 194.754 81.508 196.196 81.508C197.638 81.508 198.436 82.74 198.436 84.112C198.436 85.498 197.638 86.73 196.196 86.73ZM202.598 87.5V81.662H203.97V80.738H202.598V80.22C202.598 79.352 202.976 78.89 203.676 78.89C204.012 78.89 204.278 79.016 204.502 79.212L204.936 78.54C204.516 78.148 204.054 78.022 203.508 78.022C202.318 78.022 201.548 78.834 201.548 80.22V80.738H200.428V81.662H201.548V87.5H202.598ZM213.321 87.668C214.973 87.668 216.093 86.884 216.877 85.806L215.897 85.274C215.365 86.058 214.385 86.632 213.321 86.632C211.277 86.632 209.723 85.05 209.723 82.838C209.723 80.598 211.277 79.044 213.321 79.044C214.385 79.044 215.365 79.604 215.897 80.402L216.863 79.856C216.121 78.792 214.973 78.008 213.321 78.008C210.633 78.008 208.519 79.968 208.519 82.838C208.519 85.708 210.633 87.668 213.321 87.668ZM222.614 87.668C225.372 87.668 227.262 85.596 227.262 82.838C227.262 80.08 225.372 78.008 222.614 78.008C219.856 78.008 217.98 80.08 217.98 82.838C217.98 85.596 219.856 87.668 222.614 87.668ZM222.614 86.632C220.514 86.632 219.184 85.008 219.184 82.838C219.184 80.654 220.514 79.044 222.614 79.044C224.7 79.044 226.058 80.654 226.058 82.838C226.058 85.008 224.7 86.632 222.614 86.632ZM232.745 89.544V88.858H229.903C231.555 87.654 232.717 86.632 232.717 85.512C232.717 84.364 231.737 83.86 230.715 83.86C229.931 83.86 229.119 84.154 228.657 84.742L229.119 85.274C229.413 84.882 230.001 84.546 230.687 84.546C231.289 84.546 231.877 84.854 231.877 85.568C231.877 86.478 230.813 87.374 228.671 88.914V89.544H232.745Z" fill="#333333"></path>
                      <defs>
                      <linearGradient id="paint0_linear_588:8903" x1="120.922" y1="0.300293" x2="120.922" y2="56.7536" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#008370"></stop>
                      <stop offset="1" stop-color="#97C93D"></stop>
                      </linearGradient>
                      <linearGradient id="paint1_linear_588:8903" x1="136.437" y1="67.4381" x2="136.437" y2="69.4127" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#008370"></stop>
                      <stop offset="1" stop-color="#97C93D"></stop>
                      </linearGradient>
                      <linearGradient id="paint2_linear_588:8903" x1="59.241" y1="81.7545" x2="59.241" y2="83.7292" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#008370"></stop>
                      <stop offset="1" stop-color="#97C93D"></stop>
                      </linearGradient>
                      </defs>
                    </svg>
                    <p class="resp-text-md text-md font-bold absolute top-[40%] right-[38%]">{{totalMetricTons}}</p>
                  </div>

                  <div v-for="(category, categoryIndex) in allMetric" :key="categoryIndex">
                    <h1 class="text-md font-bold mt-4 text-[#2e2e2e]">{{category.category}}</h1>
                    <div class="flex justify-between" v-for="(logData, logIndex) in category.data" :key="logIndex">
                      <h1 class="text-sm font-normal text-[#2e2e2e]">{{logData.title}}</h1>
                      <h1 class="text-sm font-normal text-[#2e2e2e]">{{logData.metric}} MT</h1>
                    </div>
                  </div>

                  <hr class="resp-my text-[#000] border-[1] border-[#000] my-4">

                  <div class="flex justify-between mt-4">
                    <h1 class="resp-text-md text-md font-normal text-[#2e2e2e]">Total Metric Tons</h1>
                    <h1 class="resp-text-md text-md font-normal text-[#2e2e2e]">{{totalMetricTons}} MT</h1>
                  </div>
                  <div class="flex justify-between">
                    <h1 class="resp-text-md text-md font-bold text-[#2e2e2e]">Cost to Offset</h1>
                    <h1 class="resp-text-md text-md font-bold text-[#2e2e2e]">$ {{totalCost}}</h1>
                  </div>
                </div>
              </div>
            </div>

            <button v-if="step === 2" class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="step = 3">
              Next Step
            </button>
            <div v-if="step === 3">
              <button v-if="!isSave" class="in-load bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onSave">
                Save
              </button>
              <button v-else class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onShare">
                Share
              </button>
            </div>
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
