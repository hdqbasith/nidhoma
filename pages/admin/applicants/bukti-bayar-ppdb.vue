<script setup lang="ts">
import { toast } from 'vue-sonner';

definePageMeta({
  title:'Bukti Pembayaran PPDB'
});
const data = ref()
const client = useSanctumClient();
await client('/download/berkas', {
  method: 'GET',
  query: {
    ...useRoute().query,
    jenis: 'bukti-bayar',
  },
  onResponse({ response }) {
    console.log(response._data);

    if (response._data) {
      data.value = response._data
    }
  },
  onResponseError({ error }) {
    toast.error("Bukti bayar belum diupload")
  }
})
</script>
<template>
  <img :src="data">
</template>