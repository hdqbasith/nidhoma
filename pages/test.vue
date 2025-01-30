<script lang="ts" setup>
import type { MenuRecordRaw } from '~/packages/types';

const client = useSanctumClient();
const respons = ref();
const cek = () => client<Blob>('/download/berkas', {
  method: "GET",
  query: {
    jenis: "kk"
  },
  onResponse({ response }) {
    respons.value = response._data
    console.log(response);

  },
  onResponseError({ error }) {
    respons.value = error
    console.log(error);

  }
})
cek()

</script>
<template>
  <NuxtLayout name="blank">
    <div>
      <img :src="respons">
    </div>
  </NuxtLayout>
</template>
