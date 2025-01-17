<script setup>
import { ref, computed, onMounted } from 'vue';

import PlaybackService from '@/services/PlaybackService'

import PlaybackMap from '@/components/playback/PlaybackMap.vue'
import PlaybackObjectSelector from '@/components/playback/PlaybackObjectSelector.vue'
import PlaybackTimeSettings from '@/components/playback/PlaybackTimeSettings.vue'
import PlaybackTimeControl from '@/components/playback/PlaybackTimeControl.vue'

const mapRef = ref()
const timeControlRef = ref()

const timesteps = ref([])
const currentStep = ref(0)

const queryTargetIdentifiers = ref([])
const queryStartTime = ref(new Date())
const queryEndTime = ref(new Date())

const displayingObjects = ref({})


const playbackService = new PlaybackService()

const queryPlaybackData = () => {
    let startTime = Math.floor(queryStartTime.value / 1000)
    let endTime = Math.floor(queryEndTime.value / 1000)

    currentStep.value = 0
    timesteps.value = []

    for (let [queryTargetIdentifier, object] of Object.entries(displayingObjects.value)) {
        playbackService.queryObjectPlayback(object.type, queryTargetIdentifier, startTime, endTime).then(
            response => {

                object.pathHistory = response.data

                for (let timestamp of Object.keys(response.data)) {
                    const timestep = parseInt(timestamp)

                    if (!timesteps.value.includes(timestep))
                        timesteps.value.push(timestep)
                }

                mapRef.value.updateForObject(queryTargetIdentifier, object)
                timeControlRef.value.updateMapNodes()

                timesteps.value = timesteps.value.sort((a, b) => { return a - b })
            }
        )
    }
}

onMounted(() => {
    // queryPlaybackData()    
})
</script>

<template>
    <main class="px-[20px]">

        <div class="w-full flex flex-row gap-[20px]">

            <!-- Left -->
            <div class="w-[70%] flex flex-col gap-[20px]">
                <PlaybackMap ref="mapRef"/>
                <PlaybackTimeControl ref="timeControlRef" :timesteps="timesteps" v-model:currentStep="currentStep" :displayingObjects="displayingObjects" :mapRef="mapRef" />
            </div>

            <!-- Right -->
            <div class="w-[30%] flex flex-col gap-[20px]">
                <PlaybackTimeSettings v-model:queryStartTime="queryStartTime" v-model:queryEndTime="queryEndTime"/>
                <PlaybackObjectSelector v-model:displayingObjects="displayingObjects" v-model:queryTargetIdentifiers="queryTargetIdentifiers" :playbackService="playbackService" :mapRef="mapRef" />

                <Button
                    icon="pi pi-play"
                    label="Update"
                    @click="queryPlaybackData"
                />
            </div>
        </div>
    </main>
</template>


<style>
.leaflet-control-container {
    display: none;
}
</style>