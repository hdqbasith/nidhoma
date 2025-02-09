<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { toast } from "vue-sonner";
import UploadBerkas from "~/components/formulir/uploadBerkas.vue";
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
  CardDescription,
} from "~/packages/@core/ui-kit/shadcn-ui";

const biodata = useStudentBiodataStore();
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
    val: ttl,
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
const foto = ref({
  nama: "Foto Calon Siswa",
  url: "",
  jenis: "foto",
});
const client = useSanctumClient();
const applicant = useStudentBiodataStore().studentId;
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
      foto.value.url = response._data;
    }
  },
});

const form = new FormData();
const loading = ref(false);
const file = async (f: any) => {
  loading.value = true;
  form.append("jenis", f.jenis);
  form.append("file", f.file);
  form.append("applicant", applicant);
  await client("/upload/berkas", {
    method: "POST",
    body: form,
    onResponse({ response }) {
      toast.success("Berkas berhasil diupload");
      foto.value.url=f.file
    },
  }).finally(() => {
    loading.value = false;
  });
};
</script>
<template>
  <Card class="m-5">
    <CardHeader>
      <CardTitle class="text-lg/6">
        Kartu Uji Kompetensi PPDB
      </CardTitle>
      <CardDescription>
        Silakan periksa kembali data Anda, lalu upload pas foto setengah badan 3x4, berpakaian putih berpeci songkok hitam. Apabila ada data yang masih keliru, silakan update lewat menu <NuxtLink class="text-blue-600 underline" to="/applicant/formulir-ppdb">Formulir PPDB</NuxtLink>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRow v-for="d in dataKartu">
            <TableCell class="w-32">{{ d.key }}</TableCell>
            <TableCell>: {{ d.val }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <FormInputFile
        class="mt-3 w-48"
        :jenis="foto.jenis"
        :nama="foto.nama"
        :url="foto.url"
        :loading="loading"
        @file="file"
      ></FormInputFile>
    </CardContent>
    <CardFooter>
      <NuxtLink to="/applicant/cetak-kartu-tes">
        <Button :disabled="foto.url==''">Cetak Kartu Uji Kompetensi</Button>
      </NuxtLink>
    </CardFooter>
  </Card>
</template>
