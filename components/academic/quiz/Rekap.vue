<script setup lang="ts">
import DataTable from '~/components/ui/DataTable/DataTable.vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import { columns } from './table/columns';


const props=defineProps<{
  mapel?:string
}>()
const client=useSanctumClient();
const data = await client('ulangan/rekap',{
  method:'get',
  query:{
    mapel:props.mapel
  }
})

</script>
<template>
  <Card class="m-3">
    <CardHeader>
      <CardTitle>Rekap Hasil Ujian Madrasah</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable :columns="columns" :data="data"/>
    </CardContent>
    <CardFooter>
      
    </CardFooter>
  </Card>
</template>