<template>
  <div>
    <button class="bg-[#476b6b] mt-4 text-white px-8 py-2 rounded-md font-medium hover:bg-[#223d3d] transition duration-300 ease-in-out" @click="onClick">
        {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
  methods: {
    onClick(event) {
      this.$emit('trigger');
    },
  },
};
</script>
