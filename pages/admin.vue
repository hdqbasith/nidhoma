<script setup lang="ts">
definePageMeta({
    middleware:'guard',
    title:"page.dashboard.title"
})
</script>
<template>
    <NuxtLayout>

        <NuxtPage/>
    </NuxtLayout>
</template>