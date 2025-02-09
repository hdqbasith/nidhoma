<script setup lang="ts">
import { toast } from 'vue-sonner'

const client = useSanctumClient()

interface Berkas {
  jenis: string,
  nama: string,
  url: any | null
}
const berkas = ref<Berkas[]>([
  {
    jenis: 'akta',
    nama: 'Akta Lahir',
    url: null
  },
  {
    jenis: 'kk',
    nama: 'KK',
    url: null
  },
  {
    jenis: 'ijazah-mi',
    nama: 'Ijazah MI/SD',
    url: null
  },
  {
    jenis: 'kip',
    nama: 'Kartu Indonesia Pintar (KIP/PKH)',
    url: null
  },
  {
    jenis: 'skl',
    nama: 'SKL',
    url: null
  },
  {
    jenis: 'ijazah',
    nama: 'Ijazah MTs/SMP (Depan)',
    url: null
  },
  {
    jenis: 'ijazah-belakang',
    nama: 'Ijazah MTs/SMP (Belakang)',
    url: null
  },
])
// const {user}=useSanctumAuth<User>();
// berkas.value.forEach((b,i)=>{
//     berkas.value[i].url=useRuntimeConfig().public.apiBase+'/storage/berkas-siswa/'+b.jenis+'/'+user.value?.id+'.jpg';
// })
const applicant = useStudentBiodataStore().studentId;
berkas.value.forEach(async (b, i) => {
  await client('/download/berkas', {
    method: 'GET',
    query: {
      jenis: b.jenis,
      applicant: applicant
    },
    onResponse({ response }) {
      if (response._data) {
        berkas.value[i].url = response._data
      }
    },
    onResponseError({ error }) {
      toast.error("Berkas " + b.nama + " belum diupload")
    }
  })

})

const form = new FormData;
const loading = ref(false);
const file = async (f: any) => {
  loading.value = true;
  form.append('jenis', f.jenis);
  form.append('file', f.file);
  form.append('applicant', applicant);
  await client('/upload/berkas', {
    method: 'POST',
    body: form,
    onResponse({ response }) {
      toast.success('Berkas berhasil diupload')
    }
  }).finally(() => {
    loading.value = false;
  });
}
</script>
<template>
  <div>
    <div class="grid md:grid-cols-4 gap-3 mb-5">
      <FormInputFile :loading="loading" @file="file" v-for="(b, i) in berkas" :key="b.nama" :nama="b.nama" :url="b.url"
        :jenis="b.jenis"></FormInputFile>
    </div>
    <FormulirUploadRaport></FormulirUploadRaport>
  </div>
</template>