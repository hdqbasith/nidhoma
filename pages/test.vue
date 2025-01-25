<script lang="ts" setup>
import type { MenuRecordRaw } from '~/packages/types';

const client=useSanctumClient();
const respons=ref();
const cek=()=>client<MenuRecordRaw>('/menu/all',{
  method:"GET",
  onResponse({response}){
    respons.value=response._data
    console.log(response);
    
  },
  onResponseError({error}){
    respons.value=error
    console.log(error);
    
  }
})
cek()
</script>
<template>
  <NuxtLayout name="blank">
    <div>
      {{ respons }}
    </div>
  </NuxtLayout>
</template>

