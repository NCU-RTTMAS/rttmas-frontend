<script>
import { defineComponent } from 'vue';
import apiService from  '@/services/apiService.js'
export default defineComponent({
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await apiService.getVehicles();
        this.data = response.data;
        this.vehicles = this.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  data() {
    return {
      vehicles: [],
      // vehicles: [
      //   {
      //     plate: "AMS-5371",
      //     latitude: 24.552215,
      //     longitude: 121.377216,
      //     userId: 315,
      //   },
      //   {
      //     plate: "ASJ-9552",
      //     latitude: 25.626154,
      //     longitude: 120.839071,
      //     userId: null,
      //   },
      //   {
      //     plate: "BEE-5163",
      //     latitude: 24.766221,
      //     longitude: 121.987291,
      //     userId: 9882,
      //   },
      // ]
    }
  }
})
</script>

<template>
  <main>
    <div class="w-full h-full p-10 flex flex-col">
      <h1 class="text-2xl font-bold">Vehicles</h1>

      <input
        class="mt-[10px] border border-gray-300 px-3 py-1 rounded"
        placeholder="Vehicle search..."
      >

      <table class="mt-[30px] table-auto">
        <tr>
          <th class="w-1/4">Plate No.</th>
          <th class="w-1/4">Latitude</th>
          <th class="w-1/4">Longitude</th>
          <th class="w-1/4">Possible User ID</th>
        </tr>
        <tr v-for="vehicle in vehicles">
          <td>
            <a
              :href="`/vehicle/${vehicle.plate}`"
              class="text-blue-500 hover:underline"
            >{{ vehicle.plate }}</a>
          </td>
          <td>{{ vehicle.latitude }}</td>
          <td>{{ vehicle.longitude }}</td>
          <td>
            <a
              v-if="vehicle.userId"
              :href="`/user/${vehicle.userId}`"
              class="text-blue-500 hover:underline"
            >{{ vehicle.userId }}</a>
            <span v-else>N/A</span>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>
