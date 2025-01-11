<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { toast } from 'vue-sonner';

definePageMeta({
  middleware: ["auth",'role-admin'],
});
const to = computed(() => {
  return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf('/'));
});

const { data } = useFetch<any>(
  () => 'admin/summary',
  {
    method: "get",
    immediate: true,
    watch: false,
    onResponse({ response }) {
      if (response.status != 200) {
        toast.error('gagal mengambil data')
      }

    }
  })
</script>
<template>
  <div class="flex flex-row">
    <NavigationApp to="applicant/list-melanjutkan" label="Pendaftar Dalam" :size="50"></NavigationApp>
    <NavigationApp to="applicant/list-pendaftar" label="Pendaftar Luar" :size="50"></NavigationApp>
  </div>
</template>
