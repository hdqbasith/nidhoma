<script setup lang="ts">
import { UploadIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  Button,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
const confirmUpload=ref(false)
const showUpload=ref(false)
const loading=ref(false)
const emit = defineEmits(["uploaded"]);
const client = useSanctumClient();
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
        emit('uploaded',true)
      }
    },
    onResponseError({ error }) {
      toast.error(error?.message!);
    },
  }).finally(() => {
    showUpload.value = false;
  });
};
</script>
<template>
  <Button variant="blue" @click="showUpload = true"
    ><UploadIcon /> Upload excel...</Button
  >
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
        <Button variant="red" @click="confirmUpload=false"
          >Tidak</Button
        >
        <Button variant="blue" @click="uploadSoal('ya')">Ya</Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
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
</template>
