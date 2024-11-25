<script setup>
import { ref } from 'vue'

const panelItems = ref([
    { title: "Plate Lookup", description: "View details of a specific plate number." }
])
</script>

<template>
    <main>
        <div class="w-full p-10 grid grid-cols-3 gap-[20px]">
            <Card v-for="item in panelItems" :header="item.title">
                <template #title>Simple Card</template>
                <template #content>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                        quas!
                    </p>
                </template>
                <p class="m-0">
                    {{ item.description }}
                </p>
                <template #icons>
                    <i class="pi pi-arrow-right"></i>
                </template>
            </Card>
        </div>
    </main>
</template>
