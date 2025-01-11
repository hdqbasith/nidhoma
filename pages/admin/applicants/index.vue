<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

definePageMeta({
  middleware: ["auth",'role-admin'],
});
const query = useRouter().currentRoute.value.query['dari']

</script>
<template>
  <TableListApplicant :dari="query?.toString()" />
</template>
