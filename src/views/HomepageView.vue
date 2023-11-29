<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import NavBar from '@/components/Navbar/Navbar.vue'
import VideosScreen from '@/assets/videos/welcome_screen.mp4'

const router = useRouter()
const skipVideo = () => {
  localStorage.removeItem('dataUser')
  localStorage.removeItem('dataPhoto')
  router.push('/carbon-calc')
}
</script>

<template>
  <LayoutGuest>
    <NavBar/>
    <video autoplay muted loop class="fixed top-0 left-0 w-full h-full object-cover cursor-pointer" @click="skipVideo">
      <source :src="VideosScreen" type="video/mp4" />
    </video>
  </LayoutGuest>
</template>
