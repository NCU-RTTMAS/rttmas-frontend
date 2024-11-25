<script setup>
const queryStartTime = defineModel('queryStartTime')
const queryEndTime = defineModel('queryEndTime')
</script>

<template>
    <div class="flex flex-col gap-[10px]">
        <b>Time Range</b>


        <IftaLabel>
            <DatePicker id="datepicker-24h" v-model="queryStartTime" showTime hourFormat="24" fluid showIcon showButtonBar />
            <label for="date">Playback Start</label>
        </IftaLabel>


        <IftaLabel>
            <DatePicker id="datepicker-24h" v-model="queryEndTime" showTime hourFormat="24" fluid showIcon showButtonBar />
            <label for="date">Playback End</label>
        </IftaLabel>
    </div>
</template>