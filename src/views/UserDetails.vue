<script>
import { defineComponent } from 'vue';
import L from 'leaflet';
import apiService from  '@/services/apiService.js'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await apiService.getUserById(this.id);
        console.log(response.data)
        this.data = response.data;
        this.pathHistory = this.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  data() {
    return {
      vehicle: {
        plate: this.id,
        lastSeen: new Date(),
        latitude: 24.552215,
        longitude: 121.377216,
        userId: 315,
        status: "Inactive",
        rating: "DANGER",
      },
      flagHistory: [
        {"time": "2024-02-13T10:15:00.000Z", "info": "Frequent Overtake"},
        {"time": "2024-02-07T13:11:37.000Z", "info": "Unstable Driving"},
        {"time": "2024-02-03T04:31:28.000Z", "info": "Wrong-way Driving"},
      ],
      pathHistory: [
        // {"time": "2024-02-13T10:15:00.000Z", "lat": 38.8977, "lon": -77.0365},
        // {"time": "2024-02-13T10:16:00.000Z", "lat": 34.0522, "lon": -118.2437},
        // {"time": "2024-02-13T10:17:00.000Z", "lat": 40.7128, "lon": -74.0060},
        // {"time": "2024-02-13T10:18:00.000Z", "lat": 41.8781, "lon": -87.6298},
        // {"time": "2024-02-13T10:19:00.000Z", "lat": 29.7604, "lon": -95.3698},
        // {"time": "2024-02-13T10:20:00.000Z", "lat": 51.5074, "lon": -0.1278},
        // {"time": "2024-02-13T10:21:00.000Z", "lat": 48.8566, "lon": 2.3522},
        // {"time": "2024-02-13T10:22:00.000Z", "lat": 35.6895, "lon": 139.6917},
        // {"time": "2024-02-13T10:23:00.000Z", "lat": 55.7558, "lon": 37.6176},
        // {"time": "2024-02-13T10:24:00.000Z", "lat": -33.8688, "lon": 151.2093},
        // {"time": "2024-02-13T10:25:00.000Z", "lat": -22.9068, "lon": -43.1729},
        // {"time": "2024-02-13T10:26:00.000Z", "lat": -34.6037, "lon": -58.3816},
      ]
    }
  },
  mounted() {
    this.fetchData()
    // this.pathHistory = this.pathHistory.reverse()

    setTimeout(() => {
      var map = L.map('map').setView([24.956960, 121.199508], 18);

      /*
      * Maps collections: https://leaflet-extras.github.io/leaflet-providers/preview/
      */
      L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    }, 1000);
  }
})
</script>

<template>
  <main>
    <div class="w-full p-10 flex flex-col gap-[30px]">

      <a
        href="/users"
        class="mr-auto text-blue-500 cursor-pointer hover:underline"
      >← Back</a>

      <section>
        <h1 class="text-2xl font-bold">User # {{ vehicle.plate }}</h1>

        <table class="w-full mt-[10px] table-auto">
          <tr>
            <th class="w-1/4">Plate No.</th>
            <td class="w-3/4">{{ vehicle.plate }}</td>
          </tr>
          <tr>
            <th class="w-1/4">Possible User ID</th>
            <td class="w-3/4">
              <a
                v-if="vehicle.userId"
                :href="`/user/${vehicle.userId}`"
                class="text-blue-500 hover:underline"
              >{{ vehicle.userId }}</a>
              <span v-else>N/A</span>
            </td>
          </tr>
          <tr>
            <th class="w-1/4">Status</th>
            <td class="w-3/4">{{ vehicle.status }}</td>
          </tr>
          <tr>
            <th class="w-1/4">Rating</th>
            <td class="w-3/4">{{ vehicle.rating }}</td>
          </tr>
          <tr>
            <th class="w-1/4">Last Seen</th>
            <td class="w-3/4">{{ vehicle.lastSeen }}</td>
          </tr>
          <tr>
            <th class="w-1/4">Last Latitude</th>
            <td class="w-3/4">{{ vehicle.latitude }}</td>
          </tr>
          <tr>
            <th class="w-1/4">Last Longitude</th>
            <td class="w-3/4">{{ vehicle.longitude }}</td>
          </tr>
        </table>
      </section>

      <section>
        <h2 class="text-lg font-bold">Map History</h2>
        <div
          id="map"
          class="
            w-full h-[400px]
            mt-5
            border border-gray-300
            outline-0 rounded-lg
            overflow-hidden
          "
        ></div>
      </section>

      <section>
        <h2 class="text-lg font-bold">Flag History</h2>

        <table class="mt-[10px] w-full table-auto">
          <tr>
            <th class="w-1/4">Time</th>
            <th class="w-3/4">Info</th>
          </tr>
          <tr v-for="record in flagHistory">
            <td>{{ (new Date(record.time)).toLocaleString("EN-ZA") }}</td>
            <td>{{ record.info }}</td>
          </tr>
        </table>
      </section>

      <section>
        <h2 class="text-lg font-bold">Path History</h2>

        <table class="mt-[10px] w-full table-auto">
          <tr>
            <th class="w-1/3">Time</th>
            <th class="w-1/3">Latitude</th>
            <th class="w-1/3">Longitude</th>
          </tr>
          <tr v-for="record in pathHistory">
            <td>{{ (new Date(record.timestep * 1000)).toLocaleString("EN-ZA") }}</td>
            <td>{{ record.lat }}</td>
            <td>{{ record.lon }}</td>
          </tr>
        </table>
      </section>
    </div>
  </main>
</template>
