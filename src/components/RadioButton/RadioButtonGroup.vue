<template>
  <div class="flex items-center">
    <label v-for="(radio, index) in listRadioButton" :key="index" class="mr-4 flex items-center text-xs md:text-lg">
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
      selectedOption: ''
    };
  },
  methods: {
    updateSelectedOption() {
      this.$emit('selected', this.selectedOption);
    }
  }
};
</script>
