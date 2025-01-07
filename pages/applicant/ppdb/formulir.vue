<script setup lang="ts">
import { toast } from 'vue-sonner';

const akun=useStudentBiodataStore()
onMounted(() => {
    toast.promise(akun.fetchBiodata, {
        loading: 'Sedang mengambil data',
        success: () => {
            return `Data sudah dimuat`;
        }
    });
})
</script>
<template>
  <NuxtPage/>
</template>