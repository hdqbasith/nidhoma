<script setup lang='ts'>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { toTypedSchema } from '@vee-validate/zod';
import { createReusableTemplate, tryOnBeforeMount, useMediaQuery } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle, Button, Dialog, DialogDescription, DialogHeader, DialogScrollContent, DialogTitle } from '~/packages/@core/ui-kit/shadcn-ui';


const [UseTemplate, GridForm] = createReusableTemplate();
const crStore = useClassroomStore();
const { handleFileInput,files } = useFileStorage();
const formSchema = toTypedSchema(z.object({
    id: z.string().nullish(),
    file: z.instanceof(FileList).optional(),
}));
const { handleSubmit, values } = useForm({ validationSchema: formSchema, keepValuesOnUnmount: true })
const kirim = handleSubmit(async () => {
    crStore.values = {
        id: values.id,
        file: files.value[0]
    }
    await crStore.importClassroom()
})
type list = {
    key: string
    value: string
}
const listKelas = ref()
listKelas.value = crStore.data?.map(a => {
    return {
        key: a.id!,
        value: a.nama_kelas!
    };
});

watch(
    () => crStore.data,
    (n) => {
        listKelas.value = n?.map(a => {
            return {
                key: a.id!,
                value: a.nama_kelas!
            };
        });
        listKelas.value.unshift({
            key: '0',
            value: 'Sesuai file excel'
        })
    }
)
</script>
<template>
    <div>
        <UseTemplate>
            <form @submit.prevent="kirim()">
                <Alert variant="destructive">
                    <AlertTitle>Perhatian!</AlertTitle>
                    <AlertDescription>
                        Apabila ada perbedaan kelas antara dokumen yang diupload dengan kelas yang dipilih disini, maka
                        yang digunakan adalah kelas yang dipilih disini.
                    </AlertDescription>
                </Alert>
                <FormInputSelect name="id" :list="listKelas" variant="float" />
                <input type="file" name="file" @input="handleFileInput" />

                <div class="grid grid-cols-2 gap-x-4">
                    <Button type="submit">
                        Import
                    </Button>
                    <Button @click.prevent="crStore.showModalImport = false">Batal</Button>
                </div>
            </form>
        </UseTemplate>
        <Dialog v-model:open="crStore.showModalImport">
            <DialogScrollContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Siswa</DialogTitle>
                    <DialogDescription>
                        Download template terlebih dahulu. Pastikan NISN sesuai dengan yang ada di sistem.
                    </DialogDescription>
                    <div class="grid grid-cols-2 gap-x-4">
                        <Button size="sm">
                            <Icon icon="mdi:download"></Icon>
                            Template
                        </Button>
                        <Button size="sm">
                            <Icon icon="mdi:download"></Icon>
                            Data Siswa
                        </Button>
                    </div>
                </DialogHeader>
                <GridForm />
            </DialogScrollContent>
        </Dialog>
    </div>
</template>