<script setup lang="ts">
import DataTable from "~/components/ui/DataTable/DataTable.vue";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import { columnsRekap } from "./table/columnsRekap";
import { Download } from "lucide-vue-next";

const props = defineProps<{
  mapel?: string;
}>();
const client = useSanctumClient();
const data = ref([]);
const namaMapel = ref();
const refresh = () =>
  client("ulangan/rekap", {
    method: "get",
    query: {
      mapel: props.mapel,
    },
    onResponse({ response }) {
      data.value = response._data.peserta;
      namaMapel.value = response._data.mapel;
      download.value = URL.createObjectURL(
        new Blob([arrayToCsv(data.value)], { type: "csv" })
      );
    },
  });
refresh();
const arrayToCsv = (data: any) => {
  const array = [Object.keys(data[0])].concat(data);
  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
};
const download = ref();
</script>
<template>
  <Card class="m-3">
    <CardHeader>
      <CardTitle>Rekap Hasil Ujian Madrasah</CardTitle>
      <CardDescription
        >Mata Pelajaran
        <NuxtLink to="/admin/ulangan/um" class="font-bold text-blue-500">{{
          namaMapel
        }}</NuxtLink>
        <a :href="download" :download="namaMapel + '.csv'"
          ><Button variant="teal" size="sm" class="m-2"
            ><Download :size="15" />&nbsp;Download Data</Button
          ></a
        ></CardDescription
      >
    </CardHeader>
    <CardContent>
      <DataTable :columns="columnsRekap" :data="data" />
    </CardContent>
    <CardFooter>
      <ul>
        <b>Catatan</b>
        <li>
          Untuk menghapus jawaban siswa, silakan masuk menu
          <NuxtLink to="/admin/ulangan/um/" class="text-blue-500 font-bold">Ujian Madrasah - Mulai</NuxtLink>, pilih mapel, lalu
          masuk menu <NuxtLink to="/admin/ulangan/monitor/" class="text-blue-500 font-bold">Monitor</NuxtLink>, pilih nama siswa, baru klik <b>Hapus Jawaban</b>
        </li>
      </ul>
    </CardFooter>
  </Card>
</template>
