<script setup>
import { defineComponent, ref, computed } from 'vue';

const navItems = computed(() => [
  { label: "Dashboard",   href: "/",          icon: "pi pi-home" },
  { label: "Playback",    href: "/playback",  icon: "pi pi-play" },
])
</script>

<template>
    <Menu :model="navItems">
      <template #item="{ item, props }">
          <router-link v-slot="{ href, navigate }" :to="item.href" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
              </a>
          </router-link>
      </template>
    </Menu>
</template>