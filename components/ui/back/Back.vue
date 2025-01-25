<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
const props = defineProps({
    to: String
})
</script>
<template>
    <NuxtLink :to="to ?? '/'">
        <button
            class="p-3 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground rounded-full">
            <Icon icon="mingcute:arrow-left-fill" height="24" />
        </button>
    </NuxtLink>
</template>