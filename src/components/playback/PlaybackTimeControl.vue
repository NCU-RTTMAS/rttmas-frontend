<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps(["timesteps", "displayingObjects", "mapRef"])

const currentStep = defineModel("currentStep")
const playbackProgressText = computed(() => {
    if (props.timesteps.length > 0)
        return new Date(props.timesteps[currentStep.value] * 1000).toLocaleString("EN-ZA")
    else return "null"
})

const minStep = ref(0)
const maxStep = computed(() => props.timesteps.length - 1)

const prevBtnDisable = computed(() => currentStep.value == minStep.value)
const nextBtnDisable = computed(() => currentStep.value == maxStep.value)

const previousStep = () => {
    currentStep.value = Math.max(currentStep.value - 1, 0)
}

const nextStep = () => {
    currentStep.value = Math.min(currentStep.value + 1, props.timesteps.length - 1)
}

const updateMapNodes = (oldValue, newValue) => {
    for (let [identifier, object] of Object.entries(props.displayingObjects)) {
        for (let key of Object.keys(object.mapNodes)) {
            const node = object.mapNodes[key]
            const line = object.mapLines[key]

            if (key > props.timesteps[currentStep.value]) {
                node.remove()
                if (line != null)
                    line.remove()
            }
            else {
                node.addTo(object.mapLayer)
                if (line != null)
                    line.addTo(object.mapLayer)
            }
        }
    }
}

watch(currentStep, updateMapNodes)

defineExpose({
    updateMapNodes
})
</script>

<template>
    <div class="flex flex-row items-center gap-[5px]" v-if="props.timesteps.length > 0" >
        <Button icon="pi pi-chevron-left" size="small" @click="previousStep" :disabled="prevBtnDisable"></Button>
        <Button icon="pi pi-chevron-right" size="small" @click="nextStep" :disabled="nextBtnDisable"></Button>
        <Slider v-model="currentStep" :min="minStep" :max="maxStep" class="w-full ml-[20px]" />
    </div>
    <span v-if="props.timesteps.length > 0" class="mx-auto text-center">{{ playbackProgressText }}</span>
    <span v-else class="mx-auto text-center">Please select time range and objects.</span>
</template>