<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { toast } from 'vue-sonner';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/packages/@core/ui-kit/shadcn-ui";
definePageMeta({
  layout:'blank'
})
const biodata=useStudentBiodataStore();
biodata.fetchBiodata();
const ttl = computed(() =>
  useDateFormat(
    new Date(biodata.dataPersonal?.s_tanggal_lahir!),
    "DD MMMM YYYY",
    { locales: "id-ID" }
  )
);
const dataKartu = computed(() => [
  {
    key: "NISN",
    val: biodata.dataPersonal?.s_nisn,
  },
  {
    key: "Nama Siswa",
    val: biodata.dataPersonal?.s_nama_lengkap,
  },
  {
    key: "TTL",
    val: biodata.dataPersonal?.s_tempat_lahir+', '+ttl.value.value,
  },
  {
    key: "Nama Ayah",
    val: biodata.dataAyah?.ak_nama,
  },
  {
    key: "Alamat",
    val:
      biodata.dataAyah?.ak_alamat ??
      biodata.dataIbu?.ik_alamat ??
      biodata.dataWali?.wali_alamat ??
      biodata.dataDomisili?.m_alamat,
  },
  {
    key: "Asal Sekolah",
    val: biodata.dataAsalSekolah?.as_nama,
  },
]);
const client = useSanctumClient();
const applicant = useStudentBiodataStore().studentId;
const foto=ref();
client("/download/berkas", {
  method: "GET",
  query: {
    jenis: 'foto',
    applicant: applicant,
  },
  onResponseError({ error }) {
    toast.error("Berkas foto belum diupload");
  },
  onResponse({ response }) {
    if (response.status==200) {
      foto.value = response._data;
    }
  },
});

</script>
<template>
  <Card class="m-5 border-b-2  rounded-none border-black">
    <UiBack to="/applicant/kartu-tes" class="print:hidden"></UiBack>
    <CardHeader>
      <img src="/images/logo-TBS.jpg" class="w-20 absolute">
      <CardTitle class="text-lg/6 text-center">
        Kartu Uji Kompetensi PPDB<br />
        MA NU TBS Kudus<br />
        Tahun Ajaran 1447-1448 H / 2025-2026 M
        <img :src="foto" class="w-24 h-32 absolute right-12 mt-12">
      </CardTitle>
    </CardHeader>
    <CardContent class="border-t-black border-t-2">
      <Table class="grid grid-flow-col">
        <TableBody>
          <TableRow v-for="d in dataKartu">
            <TableCell class="w-32 p-2">{{ d.key }}<span class="float-right">: </span></TableCell>
            <TableCell class="p-2">{{ d.val }}</TableCell>
          </TableRow>
        </TableBody>
        <div class="w-28"></div>
      </Table>
    </CardContent>
  </Card>
</template>
<style>
body{
  min-height: fit-content !important;
  height: fit-content !important;
}
</style>