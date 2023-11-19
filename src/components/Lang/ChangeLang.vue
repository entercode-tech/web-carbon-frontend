<template>
  <div class="dropdown inline-block z-40 fixed bottom-10 right-10">
    <button class="p-1 bg-white rounded-full" @click="showLang">
      <img :src="selectedFlag" 
      class="w-12 h-12 rounded-full object-cover border-2 border-gray" alt="">
    </button>
    <div v-if="isOpen" class="absolute bottom-16 p-1 bg-white rounded-md">
      <img :src="flagId" 
      class="w-14 h-8 rounded-md object-cover border-2 border-gray cursor-pointer" @click="selectLang('id')" alt="">
      <img :src="flagEn" 
      class="w-14 mt-2 h-8 rounded-md object-cover border-2 border-gray cursor-pointer" @click="selectLang('en')" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      flagId: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/255px-Flag_of_Indonesia.svg.png',
      flagEn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/255px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png',
    };
  },
  computed: {
    selectedFlag() {
      const storedLang = localStorage.getItem('lang');
      if (storedLang === 'id') {
        return this.flagId;
      } else if (storedLang === 'en') {
        return this.flagEn;
      } else {
        return this.flagEn;
      }
    }
  },
  methods: {
    showLang() {
      this.isOpen = !this.isOpen
    },
    selectLang(lang) {
      this.isOpen = false;
      localStorage.setItem('lang', lang);
      window.location.reload();
    }
  }
};
</script>

<style></style>
