<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NavBar from '@/components/Navbar/Navbar.vue'
import VideosScreen from '@/assets/videos/welcome_screen.mp4'
</script>

<template>
  <LayoutGuest>
    <NavBar/>
    <video autoplay muted loop class="fixed top-0 left-0 w-full h-full object-cover">
      <source :src="VideosScreen" type="video/mp4" />
    </video>
    <h1 class="text-white text-3xl">Selamat Datang</h1>
  </LayoutGuest>
</template>
