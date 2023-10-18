<script setup>
import { computed } from 'vue'
import { useDarkModeStore } from '@/stores/darkMode.js'
import { gradientBgPurplePink, gradientBgDark, gradientBgPinkRed } from '@/colors.js'
import BacgroundImage from '@/assets/img/Background/bg-1.png'

</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <img :src="BacgroundImage" class="w-screen h-screen absolute z-0" alt="">
    <slot card-class="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl" />
  </div>
</template>
