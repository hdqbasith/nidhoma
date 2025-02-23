<script setup lang="ts">
definePageMeta({
    // title:"Applicant",
    // name:"Applicant",
    middleware:"sanctum:verified"
})
</script>
<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>