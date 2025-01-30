<script setup lang="ts">
import imageCompression from 'browser-image-compression';
import { LoaderCircle } from 'lucide-vue-next';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import VuePdfEmbed, {useVuePdfEmbed} from 'vue-pdf-embed'
import { toast } from 'vue-sonner';
const { doc } = useVuePdfEmbed({ source: null })
interface Raport extends Record<string,any>{
    cover: any,
    identitas: any,
    smt1: any,
    smt2: any,
    smt3: any,
    smt4: any,
    smt5: any,
}; 
const raport = ref<Raport>({
    cover: null,
    identitas: null,
    smt1: null,
    smt2: null,
    smt3: null,
    smt4: null,
    smt5: null,
});

interface Berkas {
    jenis: string,
    nama: string,
    url: any | null
};
const berkas = ref<Berkas[]>([
    {
        jenis: 'cover',
        nama: 'Halaman Sampul',
        url: !raport.value.cover? null: URL.createObjectURL(raport.value.cover)
    },
    {
        jenis: 'identitas',
        nama: 'Halaman Identitas',
        url: !raport.value.identitas? null:URL.createObjectURL(raport.value.identitas)
    },
    {
        jenis: 'smt1',
        nama: 'Nilai Kelas VII Semester 1',
        url: !raport.value.smt1? null:URL.createObjectURL(raport.value.smt1)
    },
    {
        jenis: 'smt2',
        nama: 'Nilai Kelas VII Semester 2',
        url: !raport.value.smt2? null:URL.createObjectURL(raport.value.smt2)
    },
    {
        jenis: 'smt3',
        nama: 'Nilai Kelas VIII Semester 1',
        url: !raport.value.smt3? null:URL.createObjectURL(raport.value.smt3)
    },
    {
        jenis: 'smt4',
        nama: 'Nilai Kelas VIII Semester 2',
        url: !raport.value.smt4? null:URL.createObjectURL(raport.value.smt4)
    },
    {
        jenis: 'smt5',
        nama: 'Nilai Kelas IX Semester 1',
        url: !raport.value.smt5? null:URL.createObjectURL(raport.value.smt5)
    },
]);
const pdf = ref();
const ubah = (e: any) => {
    const file = e.target.files[0]
    if (file.type == "application/pdf") {
        pdf.value = URL.createObjectURL(file);
        doc.value=file;
    } else {
        toast.error('File bukan PDF')
    }
}
const tes = useTemplateRef('tes');
const client = useSanctumClient();
const form = new FormData;
form.append('jenis', 'raport');
const upload = () => {
    client('upload/raport', {
        method: 'POST',
        body: form,
        onResponse({ response }) {
            console.log(response);

            toast.success('Raport berhasl diupload');
        },
        onResponseError({ error }) {
            toast.error(error?.message!);
        }
    })
}
const cek = async (e: any) => {
    for (let i = 1; i < e.numPages + 1; i++) {
        const page = await e.getPage(i)
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const task = page.render({ canvasContext: ctx, viewport: viewport })
        task.promise.then(async () => {
            await canvas.toBlob(async (blob: any) => {
                await imageCompression((blob), {
                    initialQuality: 1,
                    maxWidthOrHeight: 1920
                }).then(function (compressedFile) {
                    switch (i) {
                        case 1: raport.value.cover = compressedFile;
                            break;
                        case 2: raport.value.identitas = compressedFile;
                            break;
                        case 3: raport.value.smt1 = compressedFile;
                            break;
                        case 4: raport.value.smt2 = compressedFile;
                            break;
                        case 5: raport.value.smt3 = compressedFile;
                            break;
                        case 6: raport.value.smt4 = compressedFile;
                            break;
                        case 7: raport.value.smt5 = compressedFile;
                            break;
                    }
                    if (i == e.numPages) {
                        form.append('cover', raport.value.cover);
                        form.append('identitas', raport.value.identitas);
                        form.append('smt1', raport.value.smt1);
                        form.append('smt2', raport.value.smt2);
                        form.append('smt3', raport.value.smt3);
                        form.append('smt4', raport.value.smt4);
                        form.append('smt5', raport.value.smt5);
                        upload();
                    }
                }).catch(function (error) {
                    console.log(error.message); // output: I just want to stop
                });

            })
        })
    }
}
onMounted(() => {
    const getRaport = () => client<Raport>('/download/raport', {
        method: 'GET',
    })
    getRaport().then((data) => {
        raport.value = data
    })
})
const loading = ref(false)
const file = async (f: any) => {
    loading.value = true;
    form.append('jenis', f.jenis);
    form.append('file', f.file);
    await client('/upload/raport', {
        method: 'POST',
        body: form,
        onResponse({ response }) {
            toast.success('Berkas berhasil diupload')
        }
    }).finally(() => {
        loading.value = false;
    });
}

onBeforeUnmount(()=>{
    doc.value?.destroy();
})
//
// Jangan lupa ganti file index.mjs baris 17360 if(a)
//
</script>
<template>
    <Card>
        <CardHeader>
            <CardTitle class="mb-3 text-lg">
                Berkas Raport
            </CardTitle>
            <CardDescription>
                <ul class="list-disc mb-3" >
                    Berkas raport yang perlu diupload adalah:
                    <li v-for="b in berkas" class="ms-3">
                        {{ b.nama }}
                    </li>
                </ul>
                <p>Silakan upload satu persatu atau apabila berkas Anda berupa PDF, langsung klik <b>Upload PDF</b>. Berkas Anda akan otomatis dikonversi menjadi gambar</p>
            </CardDescription>
        </CardHeader>
        <CardContent class="md:grid md:grid-cols-4">
            <div class="flex items-center justify-center w-full">
                <label for="raport"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="border border-gray-500 rounded-sm p-5">
                        Upload PDF (7 halaman)
                    </div>
                    <input id="raport" type="file" class="hidden" @input="ubah($event)" />
                </label>
            </div>
            <FormInputFile :loading="loading" @file="file" v-for="(b, i) in berkas" :key="b.nama" :nama="b.nama"
            :url="raport[b.jenis]" :jenis="b.jenis" class="m-3"></FormInputFile>
        </CardContent>
    </Card>
    <ClientOnly>
        <VuePdfEmbed :source="doc" @loaded="cek" :page="1" ref="tes" class="hidden" />
    </ClientOnly>
</template>