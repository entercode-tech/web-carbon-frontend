<template>
  <div>
    <label :for="inputId" class="mb-2">
      {{ label }}
      <span class="text-red-500" v-if="required">*</span>
    </label>
    <textarea :id="inputId" :value="value" @input="updateValue" :required="required" class="border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    inputId: String,
    required: Boolean,
  },
  methods: {
    updateValue(event) {
      this.$emit('value-updated', event.target.value);
    },
  },
};
</script>
