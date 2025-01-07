<script setup lang="ts">
import { useAccessStore } from '~/packages/stores';
definePageMeta({
    title:"Home",
    name:"Index"
})

const access=useAccessStore();

</script>
<template>
     <div>
          {{ access.accessMenus }}
          <LandingFeaturesSection/>
     </div>
</template>