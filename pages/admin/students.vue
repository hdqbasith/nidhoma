<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

definePageMeta({
  middleware: ["auth"],
});
const to=computed(()=>{
  return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf('/'));
});
</script>
<template>
    <NuxtPage class="col-span-10 md:col-span-8" />
</template>
