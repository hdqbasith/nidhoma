<script setup lang="ts">
import imageCompression from 'browser-image-compression';
import { Eye, HardDriveDownload, LoaderCircle, PenBox, Trash2 } from 'lucide-vue-next';
import { AlertDialogCancel } from 'radix-vue';
import { toast } from 'vue-sonner';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '~/packages/@core/ui-kit/shadcn-ui/ui/alert-dialog';
interface Berkas {
    jenis: string,
    nama: string,
    url: any,
    loading: boolean,
}
const props = defineProps<Berkas>();
const emit = defineEmits(["file"]);
const preview = ref();
const ubah = async(e: any) => {
    const file=e.target.files[0];
    imageCompression(file, {
        initialQuality:0.8,
        maxWidthOrHeight:1280
    })
    .then(function (compressedFile) {
        emit('file', {
            file: compressedFile,
            jenis: props.jenis
        });
    })
    .catch(function (error) {
      console.log(error.message); // output: I just want to stop
    });
    preview.value = URL.createObjectURL(file)
}
const client=useSanctumClient();
const showConfirm=ref(false);
const applicant =  useStudentBiodataStore().studentId;
const hapus=()=>{
    client('/delete/berkas',{
        method:"DELETE",
        query:{
            jenis:props.jenis,
            applicant:applicant
        },
        onResponse({response}){
            toast.success("Berkas sudah dihapus. Silakan upload lagi...");
            preview.value='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
            showConfirm.value=false;
        },
        onResponseError({error}){
            toast.error(error?.message!);
        }
    })
}
</script>
<template>
    <div>

        <Card>
            <CardHeader>
                <CardTitle>
                    {{ props.nama }}
                </CardTitle>
            </CardHeader>
        <CardContent>
            <div class="flex items-center justify-center w-full">
                <label :for="nama"
                    class="flex flex-col items-center justify-center w-full max-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    
                    <LoaderCircle v-if="loading" class="text-md mr-2 size-4 flex-shrink-0 animate-spin" />
                    <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
                        <img :src="preview?? props.url" class="max-h-48"/>
                        <!-- <svg v-else class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg> -->
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Klik untuk mengubah</span></p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input :id="nama" type="file" class="hidden" @input="ubah($event)" />
                </label>
            </div>
        </CardContent>
        <CardFooter class="grid grid-cols-3">
            <a :href="props.url?? preview" target="_blank">
                <Button variant="ghost">
                    <Eye class="text-green-500"></Eye>
                </Button>
            </a>
            <Button variant="ghost" @click="showConfirm=true">
                <Trash2 class="text-red-500"></Trash2>
            </Button>
        </CardFooter>
    </Card>
  <AlertDialog :open="showConfirm" >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Anda benar-benar yakin?</AlertDialogTitle>
        <AlertDialogDescription>
            Aksi ini tidak bisa dibatalkan. File Anda akan terhapus selamanya dan kami tidak menyimpan cadangannya. Pastikan Anda benar-benar yakin ingin menghapus file ini.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="showConfirm=false">Batal</AlertDialogCancel>
        <AlertDialogAction class="bg-red-800" @click="hapus()">Hapus</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
</template>