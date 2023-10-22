<template>
  <div class="flex items-center justify-end">
    <button @click="decrement" class="px-2 py-1 bg-[#163331] text-white font-bold rounded-l-md" style="cursor: pointer">-</button>
    <input type="number" :value="value" @input="updateValue" :required="required" class="border-[1px] w-[30%] border-[#163331] w-full bg-transparent bg-opacity-50 rounded-md">
    
    <button @click="increment" class="px-2 py-1 bg-[#163331] text-white font-bold rounded-r-md" style="cursor: pointer">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    min: Number,
    max: Number
  },
  data() {
    return {
      internalValue: 0
    };
  },
  methods: {
    updateValue(event) {
      this.internalValue = event.target.value
      this.$emit('value-updated', event.target.value);
    },
    updateValues(event) {
      this.$emit('value-updated', event);
    },
    decrement() {
      if (this.internalValue > 0) {
        this.internalValue -= 1;
        this.updateValues(this.internalValue);
      }
    },
    increment() {
      if (this.max === undefined || this.internalValue < this.max) {
        this.internalValue += 1;
        this.updateValues(this.internalValue);
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.internalValue = newVal;
      },
      immediate: true
    }
  }
};
</script>
