<script setup lang="ts">
definePageMeta({
  middleware: ["auth",'role-admin'],
});
import { split, toArray, toLower } from "lodash";
const data = [{"s_akun":"9c122ab5-abe9-4c83-832c-616ea9fbdb98","s_nisn":"123456789","s_nama_lengkap":"applicant 1","as_nama":null}]
const filtered=ref()
const filter= (search: string | undefined) => {
  filtered.value = toArray(data).filter((dataArray) =>
    Object.values(dataArray).some(value =>
      toLower(value??'').indexOf(toLower(search)) > -1
    )
  )
};
filter('567')
</script>
<template>
{{ filtered.length }}
{{ Object.values(toArray(data)[0]) }}
</template>