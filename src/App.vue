<script setup>
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
  export default defineComponent({
    data() {
      return {
        sidebarCollapsed: false,
        navLinks: [
          { label: "Dashboard", href: "/" },
          { label: "Live Map", href: "/map" },
          { label: "Vehicles", href: "/vehicles" },
          { label: "Users", href: "/users" },
          { label: "About", href: "/about" },
        ],
        timeNow: new Date()
      }
    },
    mounted() {
      setInterval(() => {
        this.timeNow = new Date()
      }, 500)
    }
  })
</script>

<template>
  <!-- <span class="text-4xl font-bold underline">Hello World</span> -->

  <nav class="
    w-full h-[50px]
    px-[20px]
    flex flex-row
    items-center z-[100]
    border-b border-gray-300
    shadow
  ">
    <a
      href="/"
      class="
        mr-auto
        cursor-pointer hover:underline transition-[.15s]
      "
    >
      Realtime Traffic Monitoring & Analysis
    </a>

    <span>{{ timeNow.toLocaleTimeString("EN-ZA") }}</span>
  </nav>


  <div
    class="
      w-full h-[calc(100vh-51px)]
      mt-[1px]
      flex flex-row
    "
  >
    <nav
      class="
        w-[250px] h-full
        flex flex-col
        border-r border-gray-300 shadow
        bg-gray-50
      "
      :class="{ 'w-0': sidebarCollapsed }"
    >
      <a
        v-for="navLink in navLinks"
        :href="navLink.href"
        class="px-[20px] py-[10px] border-b border-gray-300 hover:bg-gray-200"
      >{{ navLink.label }}</a>
    </nav>

    <div
      class="w-[calc(100vw-200px)] h-full"
    >
      <RouterView />
    </div>
  </div>

</template>
