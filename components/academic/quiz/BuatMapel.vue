<script setup lang="ts">
import { toast } from 'vue-sonner';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogScrollContent, DialogTitle, DialogTrigger } from '~/packages/@core/ui-kit/shadcn-ui';

const client = useSanctumClient();
const form = new FormData();
const upload = (file: any) => {
  loading.value = true;
  form.append("file", file);
  client("/ulangan/upload", {
    method: "post",
    body: form,
    onResponse({ response }) {
      if (response.status == 200) {
        toast.success('Sudah diupload')
      }
    },
    onResponseError({error}){
      toast.error(error!.message)
    }
  }).finally(() => {
    loading.value = false;
  });
};
const loading = ref(false);
const berkas={
  nama:'Mapel',
  jenis:'ulangan'
}
const openEdit=ref(false)
</script>
<template>
  <div>
    <InputUploadFile @file="upload" :loading="loading" :jenis="berkas.jenis" :nama="berkas.nama"></InputUploadFile>
  </div>
</template>
