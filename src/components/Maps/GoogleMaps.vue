<template>
  <div>
    <GoogleMap :api-key="mapsKey" class="w-full h-[500px]" :center="center" :zoom="15">
      <Marker :options="{ position: { lat: latitude, lng: longitude } }" />
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  props: {
    mapsKey: String,
    latitude: Number,
    longitude: Number,
  },
  data() {
    return {
      center: { lat: this.latitude, lng: this.longitude },
    };
  },
  components: {
    GoogleMap,
    Marker,
  },
  watch: {
    latitude: function(newLatitude) {
      this.center.lat = newLatitude;
    },
    longitude: function(newLongitude) {
      this.center.lng = newLongitude;
    },
  },
};
</script>
