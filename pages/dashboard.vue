<script setup lang="ts">
definePageMeta({
    
    middleware:'guard',
})
</script>
<template>
    <NuxtLayout name='basic'>
        <NuxtPage/>
    </NuxtLayout>
</template>