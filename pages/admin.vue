<script setup lang="ts">
definePageMeta({
    middleware:'guard',
    title:"page.dashboard.title"
})
</script>
<template>
    <NuxtLayout name='basic'>

        <NuxtPage/>
    </NuxtLayout>
</template>