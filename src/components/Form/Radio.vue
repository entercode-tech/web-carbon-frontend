<template>
  <div>
    <label class="mb-2">
      {{ label }}
      <span class="text-red-500" v-if="required">*</span>
    </label>
    <div class="flex">
      <label v-for="option in genderOptions" :key="option.value" class="flex items-center mr-4">
        <input class="mr-2" type="radio" :name="inputName" :value="option.value" v-model="selectedGenderInternal"> {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    inputName: String,
    genderOptions: Array,
    selectedGender: String,
    required: Boolean,
  },
  data() {
    return {
      selectedGenderInternal: this.selectedGender,
    };
  },
  watch: {
    selectedGenderInternal(newValue) {
      this.$emit('value-updated', event.target.value);
    },
  },
};
</script>
