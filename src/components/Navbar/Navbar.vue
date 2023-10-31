<template>
  <nav class="bg-black bg-opacity-80 backdrop-blur-3xl fixed z-50 top-0 w-full p-4 px-16 flex justify-between items-center">
    <div class="flex items-center">
      <img :src="LogoKLHK" alt="Logo" class="h-10 rounded-md mr-4" />
      <img :src="LogoCop28" alt="Logo" class="h-10 rounded-md mr-4" />
      <img :src="LogoIndonesia" alt="Logo" class="h-10 rounded-md" />
    </div>

    <!-- Desktop Menu -->
    <ul class="hidden md:flex space-x-6">
      <li>
        <router-link to="/" class="text-white font-medium text-xl">
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/about" class="text-white font-medium text-xl">
          About
        </router-link>
      </li>
      <li>
        <router-link to="/all-postcard" class="text-white font-medium text-xl">
          Post Card
        </router-link>
      </li>
      <li>
        <router-link to="/carbon" class="text-white font-medium text-xl">
          Carbon
        </router-link>
      </li>
    </ul>
    <ul class="flex space-x-4 hidden md:block">
      <li>
        <router-link to="/donation" class="text-white">
          <button class="bg-[#476b6b] px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out">
            Donation
          </button>
        </router-link>
      </li>
    </ul>

    <!-- Mobile Menu (Hamburger Menu) -->
    <div class="md:hidden relative">
      <button
        @click="toggleMobileMenu"
        class="text-white text-2xl focus:outline-none"
      >
        &#9776;
      </button>
      <div
        v-if="showMobileMenu"
        @click="toggleMobileMenu"
        class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-40"
      ></div>
      <ul
        v-if="showMobileMenu"
        class="bg-black bg-opacity-80 fixed top-0 right-0 h-screen w-64 z-50 flex flex-col space-y-4 p-10"
      >
        <li>
          <router-link to="/" class="text-white font-medium text-lg">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="text-white font-medium text-lg">
            About
          </router-link>
        </li>
        <li>
          <router-link to="/all-postcard" class="text-white font-medium text-lg">
            Post Card
          </router-link>
        </li>
        <li>
          <router-link to="/carbon" class="text-white font-medium text-lg">
            Carbon
          </router-link>
        </li>
        <li>
          <router-link to="/donation" class="text-white">
            <button class="bg-[#476b6b] w-full px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out">
              Donation
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LogoCop28 from '@/assets/img/Logo/logo COP28.png'
import LogoKLHK from '@/assets/img/Logo/logo klhk.png'
import LogoIndonesia from '@/assets/img/Logo/Logo Indonesia.png'

export default {
  data() {
    return {
      LogoCop28: LogoCop28,
      LogoKLHK: LogoKLHK,
      LogoIndonesia: LogoIndonesia,
      showMobileMenu: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};
</script>
