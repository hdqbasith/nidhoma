<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

definePageMeta({
  middleware: ['guard'],
});
const to=computed(()=>{
  return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf('/'));
});
</script>
<template>
  <NuxtLayout name="basic">
      <div class="flex items-center">
        <NuxtLink :to="to">
          <LandingLogoBrand class="h-12 w-24 fill-green-700" v-if="to=='/applicant'"/>
          <button v-else
            class="p-3 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground rounded-full">
            <Icon icon="mingcute:arrow-left-fill" height="24" />
          </button>
        </NuxtLink>
      </div>
    <NuxtPage class="col-span-10 md:col-span-8" />
  </NuxtLayout>
</template>
