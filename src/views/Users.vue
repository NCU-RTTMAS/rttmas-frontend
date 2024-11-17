<script>
import apiService from '@/services/apiService';
import { defineComponent } from 'vue';

export default defineComponent({
  mounted(){
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await apiService.getUsers()
        
        this.data = response.data
        console.log(this.data)
        this.users = this.data
        console.log(this.users)

      } catch(error ) {
        console.error("error")
      }
    }
  },

  data() {
    return {
      // users: [
      //   {
      //     uid: 315,
      //     latitude: 24.552215,
      //     longitude: 121.377216,
      //     lastReported: new Date(),
      //   },
      //   {
      //     uid: 1361,
      //     latitude: 25.626154,
      //     longitude: 120.839071,
      //     lastReported: new Date(),
      //   },
      //   {
      //     uid: 9882,
      //     latitude: 24.766221,
      //     longitude: 121.987291,
      //     lastReported: new Date(),
      //   },
      // ]
      users: []
    }
  }
})
</script>

<template>
  <main>
    <div class="w-full h-full p-10 flex flex-col">
      <h1 class="text-2xl font-bold">Users</h1>

      <input
        class="mt-[10px] border border-gray-300 px-3 py-1 rounded"
        placeholder="User search..."
      >

      <table class="mt-[30px] table-auto">
        <tr>
          <th class="w-1/4">User ID</th>
          <th class="w-1/4">Latitude</th>
          <th class="w-1/4">Longitude</th>
          <th class="w-1/4">Last Reported</th>
        </tr>
        <tr v-for=" user in users">
          <td>
            <a
              :href="`/user/${user.uid}`"
              class="text-blue-500 hover:underline"
            >{{ user.uid }}</a>
          </td>
          <td>{{ user.latitude }}</td>
          <td>{{ user.longitude }}</td>
          <!-- <td>{{ user.lastReported.toLocaleString("EN-ZA") }}</td> -->
        </tr>
      </table>
    </div>
  </main>
</template>
