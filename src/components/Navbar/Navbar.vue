<script setup>
  import LogoCop28 from '@/assets/img/Logo/logo COP28.png'
</script>

<template>
  <nav class="bg-black bg-opacity-10 backdrop-blur-2xl fixed z-10 top-0 w-full p-4 px-16 flex justify-between items-center">
    <div class="flex items-center">
      <img :src="LogoCop28" alt="Logo" class="h-10 rounded-md" />
    </div>

    <!-- Menu -->
    <ul class="flex space-x-4">
      <li>
        <router-link to="/carbon" class="text-white">
          <button class="bg-[#476b6b] px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out">
            Carbon
          </button>

        </router-link>
      </li>
    </ul>
  </nav>
</template>
