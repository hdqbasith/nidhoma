<script setup lang="ts">
definePageMeta({
    middleware:['sanctum:auth']
})
</script>
<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>