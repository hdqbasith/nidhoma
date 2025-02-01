<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

definePageMeta({
  // redirect: "/dashboard",
  name:'pendaftar-baru',
  title:'Pendaftar Baru'
});
const query = useRouter().currentRoute.value.query['dari']?? 'luar'

</script>
<template>
  <TableListApplicant :dari="query?.toString()" />
</template>
