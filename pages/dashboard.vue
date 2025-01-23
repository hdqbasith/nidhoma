<script setup lang="ts">
definePageMeta({
    middleware:['sanctum:verified']
})
</script>
<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>