<script>
import { defineComponent } from 'vue';
import L from 'leaflet';

export default defineComponent({
  methods: {
    initializeMap(){
      this.map = L.map('map').setView([24.956960, 121.199508], 18);
      /*
      * Maps collections: https://leaflet-extras.github.io/leaflet-providers/preview/
      */
      L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    },
    startCount(startTime, stopTime) {
      this.currentTime = startTime;
      this.intervalId = setInterval(() => {
          if (this.currentTime < stopTime) {
            this.currentTime += 1;
          } else {
            this.stopCount();
          }
      }, 1000);
    },

    stopCount() {
      clearInterval(this.intervalId);
    },
    
    submitTimes() {
      console.log('Start Time:', this.startTime);
      console.log('Stop Time:', this.stopTime);
      this.startCount(this.startTime, this.stopTime);
      // Add your logic here to handle the submitted times
    }
  },
  mounted() {
    this.initializeMap();
  }, 
  data() {
    return {
      startTime: 0,
      stopTime: 0,
      currentTime: 0,
      map: null
    }
  }
})
</script>

<template>
  <main>
    <div class="w-full h-full p-10 flex flex-col">
      <h1 class="text-2xl font-bold">Live Map Replay</h1>
      <h4 v-if="currentTime != 0">Current Timestamp: {{ currentTime }}</h4>
      <div class="mt-4 mb-2">
        <input
          type="text"
          v-model="startTime"
          placeholder="Starting time"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          v-model="stopTime"
          placeholder="Stop time"
          class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="submitTimes"
          class="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Times
        </button>
      </div>
      <div
        id="map"
        class="
          w-full h-[600px]
          mt-5
          border border-gray-300
          outline-0 rounded-lg
          overflow-hidden
        "
      ></div>
    </div>
  </main>
</template>
