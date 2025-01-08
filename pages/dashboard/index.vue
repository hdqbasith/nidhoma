<script setup lang="ts">
import { useAccessStore } from '~/packages/stores';
definePageMeta({
    title:"page.dashboard.title",
    name:"Index"
})

const access=useAccessStore();

</script>
<template>
     <div>
          <div v-for="a in access.accessRoutes" class="flex flex-col">
               {{a}}
          </div>
          <LandingFeaturesSection/>
     </div>
</template>