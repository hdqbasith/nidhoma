<script setup lang="ts">
definePageMeta({
    title:"page.dashboard.title",
    name:"Applicant",
    middleware:"guard"
})
</script>
<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>