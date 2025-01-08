<script setup lang="ts">
definePageMeta({
    middleware:'guard',
    title:"page.dashboard.title",
    name:"Applicant"
})
</script>
<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>