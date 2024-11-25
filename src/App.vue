<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Topbar from '@/components/common/Topbar.vue'
import Sidebar from '@/components/common/Sidebar.vue'
</script>


<template>
    <div>
        <Topbar />

        <div class="
            w-full h-[calc(100vh-63px)]
            mt-[1px]
            flex flex-row
        ">
            <Sidebar />

            <div class="w-[calc(100vw-200px)] h-full">
                <RouterView />
            </div>
        </div>
    </div>

</template>
