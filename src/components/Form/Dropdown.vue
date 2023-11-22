<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="flex items-center border-[1px] rounded-md border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2">
      {{ selectedOption }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <ul v-if="isDropdownOpen" class="bg-white bg-opacity-50 backdrop-blur-2xl rounded-md overflow-hidden w-full z-10"> 
      <li class="px-4 py-2 border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2" v-for="option in options" :key="option" @click="selectOption(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: this.options.length > 0 ? this.options[0] : null,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
      this.$emit('selected', option);
    },
  },
};
</script>

<style scoped>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  ul {
    position: absolute;
    top: 120%;
    left: 0;
    list-style: none;
  }
  li {
    padding: 5px 10px;
    cursor: pointer;
  }
</style>
