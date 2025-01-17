<script setup>
import { ref, computed } from "vue";

const props = defineProps(["playbackService", "mapRef"])
const displayingObjects = defineModel("displayingObjects")

const selectedObjectsToAdd = ref([]);
const availableObjects = ref([]);

const getDisplayingObjects = computed(() => Object.entries(displayingObjects.value))

const addObjects = () => {
    selectedObjectsToAdd.value.forEach(object => {
        displayingObjects.value[object.identifier] = {
            type: object.type,
            isHidden: object.isHidden,
        }
    })

    availableObjects.value = []
    selectedObjectsToAdd.value = []
}

const removeDisplayingObject = (key) => {
    displayingObjects.value[key].mapLayer.clearLayers()
    delete displayingObjects.value[key]
}

const toggleHideDisplayingObject = (key) => {
    const object = displayingObjects.value[key]
    object.isHidden = !object.isHidden

    if (object.isHidden)
        object.mapLayer.remove()
    else
        props.mapRef.addToMap(object.mapLayer)
}

const fetchAvailableObjects = (event) => {
    props.playbackService.queryAvailableObjects(event.value).then(
        response => {
            const UIDs = response.data.uids
            const plateNumbers = response.data.plate_numbers

            availableObjects.value = []

            UIDs.forEach(uid => {
                if (displayingObjects.value[uid] == null) {
                    availableObjects.value.push({
                        type: 1, identifier: uid, isHidden: false
                    })
                }
            })

            plateNumbers.forEach(plateNumber => {
                if (displayingObjects.value[plateNumber] == null) {
                    availableObjects.value.push({
                        type: 2, identifier: plateNumber, isHidden: false
                    })
                }
            })
        }
    )
}
</script>

<template>
    <div class="flex flex-col gap-[10px]">

        <b>Objects</b>

        <div class="flex flex-row gap-[10px]">
            <MultiSelect
                v-model="selectedObjectsToAdd"
                :options="availableObjects"
                filter
                optionLabel="identifier"
                placeholder="Search Objects"
                class="w-[90%]"
                @filter="fetchAvailableObjects"
            />

            <Button icon="pi pi-plus" aria-label="Add object" @click="addObjects" class="w-[10%]"/>
        </div>


        <Listbox v-model="selectedCountry" :options="getDisplayingObjects" optionLabel="identifier" class="w-full" listStyle="max-height:250px">
            <template #option="slotProps">
                <div class="w-full flex flex-row items-center">
                    <span v-if="slotProps.option[1].type == 2" class="pi pi-car"></span>
                    <span v-else class="pi pi-user"></span>

                    <div class="ml-[15px]">{{ slotProps.option[0] }}</div>
                    <Button v-if="slotProps.option[1].isHidden" icon="pi pi-eye" size="small" class="m-0 ml-auto !p-0 !w-[30px]" variant="text" @click="toggleHideDisplayingObject(slotProps.option[0])" />
                    <Button v-else icon="pi pi-eye-slash" size="small" class="m-0 ml-auto !p-0 !w-[30px]" variant="text" @click="toggleHideDisplayingObject(slotProps.option[0])" />

                    <Button icon="pi pi-times" size="small" class="m-0 !p-0 !w-[30px]" variant="text" severity="danger" @click="removeDisplayingObject(slotProps.option[0])" />
                </div>
            </template>
        </Listbox>
    </div>
</template>