<template>
  <div class="dropdown">
    <input
      type="text"
      :value="value" 
      :placeholder="placeholder"
      @input="updateValue"
      class="border-[1px] border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md"
    />
    <ul
      v-if="isLoading"
      class="z-10 bg-white bg-opacity-50 backdrop-blur-2xl rounded-md overflow-hidden w-full"
    >
      <li class="px-4 py-2 border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2">
        <div class="animate-spin w-6 h-6 my-2 mx-auto border-t-4 border-[#476b6b] border-solid rounded-full"></div>
      </li>
    </ul>
    <ul
      v-if="isDropdownOpen"
      class="z-10 bg-white bg-opacity-50 backdrop-blur-2xl rounded-md overflow-hidden w-full"
    >
      <li
        class="px-4 py-2 border-[#163331] hover:text-white hover:bg-[#163331] px-4 py-2"
        v-for="item in dataArray"
        :key="item"
        @click="selectOption(item)"
      >
        {{ item.name }}, {{ item.cityName }} ({{ item.countryName }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import _debounce from 'lodash/debounce';

export default {
  props: {
    options: Array,
    placeholder: String,
  },
  data() {
    return {
      apiDomain: import.meta.env.VITE_API_URL_CARBON,
      apiKey: import.meta.env.VITE_API_KEY_CARBON,
      isDropdownOpen: false,
      isLoading: false,
      value: '', // Tidak perlu memberikan nilai default di sini
      dataArray: [],
      selectedOption: [],
    };
  },
  created() {
    // Tetapkan nilai default ke nilai pertama dalam dataArray
    if (this.dataArray.length > 0) {
      this.value = `${this.dataArray[0].name}, ${this.dataArray[0].cityName} (${this.dataArray[0].countryName})`;
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
      this.value = `${option.name}, ${option.cityName} (${option.countryName})`;
      this.$emit('selected', option);
    },
    debouncedSearch: _debounce(function (searchValue) {
      this.isLoading = true;
      this.value = searchValue;
      const payload = { search: searchValue };

      axios
        .post(`${this.apiDomain}/api/get-airports-list`, payload, {
          headers: {
            'Client-Key': this.apiKey,
          },
        })
        .then((response) => {
          const data = response.data.result.airports;
          const mappedData = data.reduce((result, region) => {
            const regionName = Object.keys(region)[0];
            const airportsInRegion = region[regionName];
            return result.concat(airportsInRegion);
          }, []);

          this.isDropdownOpen = true;
          this.dataArray = mappedData;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error('Error:', error);
        });
    }, 1000),
    updateValue(event) {
      this.debouncedSearch(event.target.value);
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
