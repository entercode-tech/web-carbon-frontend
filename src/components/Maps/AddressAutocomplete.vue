<template>
  <div>
    <label class="mb-2">
      {{ $t('formUser.locationSection') }}
      <span class="text-red-500">*</span>
    </label>
    <GoogleAddressAutocomplete 
      placeholder="Where Your Location?"
      :apiKey="mapsKey"
      v-model="address"
      @callback="callbackFunction"    
      class="border-[1px] mt-2 border-[#cccccc] w-full bg-white bg-opacity-50 rounded-md"
    />
  </div>
</template>

<script>
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'

export default {
  props: {
    mapsKey: String,
  },
  components: {
    GoogleAddressAutocomplete,
  },
  methods: {
    callbackFunction(place) {
      this.$emit('searchMaps', place);
    }
  }
};
</script>
