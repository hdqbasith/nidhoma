<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useUserStore } from '~/packages/stores'

const { handleFileInput, files } = useFileStorage({ clearOldFiles: true })
const client = useSanctumClient()

interface Berkas {
    jenis: string,
    nama: string,
    url: any|null
}
const berkas = ref<Berkas[]>([
    {
        jenis:'akta',
        nama: 'Akta Lahir',
        url: null
    },
    {
        jenis:'kk',
        nama: 'KK',
        url: null
    },
    {
        jenis:'ijazah-mi',
        nama: 'Ijazah MI/SD',
        url: null
    },
    {
        jenis: 'ijazah',
        nama: 'Ijazah MTs/SMP atau SKL',
        url: null
    },
    {
        jenis:'raport',
        nama: 'Raport',
        url: null
    },
])
const {user}=useSanctumAuth<User>();
berkas.value.forEach((b,i)=>{
    berkas.value[i].url=useRuntimeConfig().public.apiBase+'/storage/berkas-siswa/'+b.jenis+'/'+user.value?.id+'.jpg';
})
// berkas.value.forEach(async (b,i)=>{
//     await client('/download/berkas',{
//         method:'GET',
//         query:{
//             jenis:b.jenis
//         },
//         onResponse({response}){
//             if(response._data){
//                 berkas.value[i].url='http://localhost/storage/berkas-siswa/'+b.jenis+response._data+'.jpg'
//             }
//         }
//     })

// })

const form=new FormData;
const loading=ref(false);
const file = async (f:any) => {
    loading.value=true;
    form.append('jenis',f.jenis);
    form.append('file',f.file);    
    await client('/upload/berkas',{
        method:'POST',
        body:form,
        onResponse({response}){
            toast.success('Berkas berhasil diupload')
        }
    }).finally(()=>{
        loading.value=false;
    });
}
</script>
<template>
    <div class="grid md:grid-cols-5 gap-3">
        <FormInputFile :loading="loading" @file="file" v-for="(b, i) in berkas" :key="b.nama"
            :nama="b.nama" :url="b.url" :jenis="b.jenis"></FormInputFile>
            {{ berkas }}
    </div>
</template>