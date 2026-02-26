<script setup lang="ts">
definePageMeta({
    middleware:['sanctum:verified'],
})
</script>
<template>
    <NuxtLayout name="default">
        <NuxtPage/>
    </NuxtLayout>
</template>