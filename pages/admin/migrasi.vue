<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';

definePageMeta({
  middleware: ["auth"],
});
const to = computed(() => {
  return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf('/'));
});
</script>
<template>
    <div>
      <div class="flex items-center">
        <NuxtLink :to="to">
          <LandingLogoBrand class="h-12 w-24 fill-green-700" v-if="to == '/admin'" />
          <button v-else
            class="p-3 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground rounded-full">
            <Icon icon="mingcute:arrow-left-fill" height="24" />
          </button>
        </NuxtLink>
      </div>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Migrasi dari Idary Admin</CardTitle>
      </CardHeader>
      <CardContent> 
          <Button>Migrasi student</Button>
        
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
</template>