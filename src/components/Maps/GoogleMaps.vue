<template>
  <div>
    <GoogleMap :api-key="mapsKey" class="w-full h-[500px]" :center="center" :zoom="15">
      <Marker :options="{ position: { lat: latitude, lng: longitude }, icon: flagIcon }" />
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import flag from "@/assets/icon/flag.ico";

export default {
  props: {
    mapsKey: String,
    latitude: Number,
    longitude: Number,
    flagPath: String, // Tambahkan prop untuk path gambar bendera
  },
  data() {
    return {
      center: { lat: this.latitude, lng: this.longitude },
      flagIcon: null,
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
  mounted() {
    this.loadFlagIcon();
  },
  methods: {
    loadFlagIcon() {
      // Logic untuk menentukan path gambar bendera berdasarkan negara
      // Misalnya, flagPath dapat diatur sebagai path default atau diberikan melalui properti
      this.flagIcon = {
        url: this.flagPath || flag,
        scaledSize: new window.google.maps.Size(70, 70), // Sesuaikan ukuran bendera sesuai kebutuhan
      };
    },
  },
};
</script>
