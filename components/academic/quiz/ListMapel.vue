<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/packages/@core/ui-kit/shadcn-ui";
import type { Mapel } from "./types";
import dayjs from "dayjs";
import { Download, Eye, Pencil, Plus, Trash2, Upload } from "lucide-vue-next";
import { toast } from "vue-sonner";

const props = defineProps<{
  date_start?: string;
  date_end?: string;
}>();
const client = useSanctumClient();
const mapel = ref<Mapel[]>();
const refreshMapel = () =>
  client<Mapel[]>("ulangan/mapel", {
    method: "get",
    query: {
      date_start: props.date_start ?? null,
      date_end: props.date_end ?? null,
    },
    onResponse({ response }) {
      mapel.value = response._data;
    },
  });
const downloadTemplate = URL.createObjectURL(
  await client("/download/template-ulangan")
);
const loading = ref(false);
const uploadSoal = (file: any) => {
  const form = new FormData();
  form.append("jenis", "soal");
  if (file=='ya') {
    form.append("overwrite", "ya");
    confirmUpload.value = false;
  } else {
    form.append("file", file);
  }
  client("/upload/soal", {
    method: "post",
    body: form,
    onResponse({ response }) {
      if (response._data.aksi == "confirm") {
        confirmUpload.value = true;
      } else {
        toast.success("Soal berhasil diupload");
        refreshMapel();
      }
    },
    onResponseError({ error }) {
      toast.error(error?.message!);
    },
  }).finally(() => {
    showUpload.value = false;
  });
};
const showUpload = ref(false);
const confirmUpload = ref(false);
onMounted(()=>{
  refreshMapel();
})
const hapusSoal=(kode:string)=>{
  client('ulangan/hapus-soal',{
    method:'delete',
    body:{
      mt_kode:kode
    },
    onResponse({response}){
      toast.success('Data sudah dihapus!');
    }
  })
}
</script>
<template>
  <Card class="m-3">
    <CardHeader>
      <div class="flex flex-row gap-2">
        <a
          :href="downloadTemplate"
          target="_blank"
          download="Template Upload Soal.xlsx"
        >
          <Button variant="teal"><Download /> Download Template</Button>
        </a>
        <Button variant="blue" @click="showUpload = true"
          ><Upload /> Upload excel...</Button
        >
      </div>
      <CardTitle> Daftar Mapel Ulangan </CardTitle>
      <CardDescription> </CardDescription>
    </CardHeader>
    <CardContent>
      <slot name="content"></slot>
      <Table>
        <TableHeader class="">
          <TableRow>
            <TableHead class="w-fit">No.</TableHead>
            <TableHead>Mapel</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Token</TableHead>
            <TableHead class="w-fit">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(m, i) in mapel">
            <TableCell>
              {{ i + 1 }}
            </TableCell>
            <TableCell>
              {{ m.mt_pelajaran }}
            </TableCell>
            <TableCell>
              {{ dayjs(m.mt_date).format("DD-MM-YYYY") }}
            </TableCell>
            <TableCell>
              {{ m.mt_token }}
            </TableCell>
            <TableCell class="grid grid-cols-3 gap-1 w-fit">
              <Button size="icon" variant="blue"><Pencil /></Button>
              <Button size="icon" variant="red"><Trash2 /></Button>
              <Button size="icon" variant="teal"><Eye /></Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <slot name="footer"></slot>
    </CardFooter>
    <Dialog v-model:open="showUpload">
      <DialogScrollContent>
        <DialogHeader>
          <DialogTitle>Upload Soal Baru</DialogTitle>
          <DialogDescription>
            Pastikan Anda menggunakan template yang sudah disediakan dan
            melengkapi isinya dengan benar
          </DialogDescription>
        </DialogHeader>
        <InputUploadFile
          jenis="soal"
          nama="Mapel"
          :loading="loading"
          @file="uploadSoal"
        />
      </DialogScrollContent>
    </Dialog>
    <Dialog v-model:open="confirmUpload">
      <DialogScrollContent>
        <DialogHeader>
          <DialogTitle>Soal mapel ini sudah ada</DialogTitle>
          <DialogDescription>
            Apakah Anda ingin mengganti dengan soal baru? Soal sebelumnya akan
            dihapus!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="mt-2 flex flex-row">
          <Button variant="red" @click="confirmUpload = false">Tidak</Button>
          <Button variant="blue" @click="uploadSoal('ya')">Ya</Button>
        </DialogFooter>
      </DialogScrollContent>
    </Dialog>
  </Card>
</template>
