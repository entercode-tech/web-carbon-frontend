<template>
  <div class="flex items-center">
    <label v-for="(radio, index) in listRadioButton" :key="index" class="mr-4 flex items-center">
      <input type="radio" class="mr-2" v-model="selectedOption" :value="radio.value" @change="updateSelectedOption"> {{ radio.title }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    listRadioButton: Array
  },
  data() {
    return {
      selectedOption: '' // Tidak ada inisialisasi nilai di sini
    };
  },
  methods: {
    updateSelectedOption() {
      this.$emit('selected', this.selectedOption); // Mengirim nilai yang dipilih ke komponen induk
    }
  }
};
</script>
