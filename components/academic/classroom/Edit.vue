<script setup lang='ts'>
import { toTypedSchema } from '@vee-validate/zod';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { Button, Dialog, DialogHeader, DialogScrollContent, DialogTitle } from '~/packages/@core/ui-kit/shadcn-ui';

const [UseTemplate, GridForm] = createReusableTemplate();
const crStore = useClassroomStore();

const formSchema = toTypedSchema(z.object({
    id: z.string().nullish(),
    nama_kelas: z.string().nullish(),
    nama_kelas2: z.string().nullish(),
    tahun_ajaran: z.string().nullish(),
    kode_wali: z.string().nullish(),
    jurusan: z.number().nullish(),
    tingkat: z.string().nullish()
}));
const { handleSubmit, resetForm, values } = useForm({ validationSchema: formSchema, initialValues: crStore.values, keepValuesOnUnmount: true })

watch(
    () => crStore.values,
    (newValue, oldValue) => {
        if (newValue) {
            resetForm({ values: newValue })
        }
    }
)
const kirim = handleSubmit(async () => {
    crStore.values = values
    await crStore.editClassroom()
})
</script>
<template>
    <div>
        <UseTemplate>
            <form @submit.prevent="kirim()">
                <FormInputText name="nama_kelas" variant="float" />
                <FormInputText name="nama_kelas2" variant="float" />
                <FormInputText name="kode_wali" variant="float" />
                <FormInputText name="jurusan" variant="float" />
                <FormInputText name="tingkat" variant="float" />
                <Button type="submit">
                    Simpan
                </Button>
                <Button @click.prevent="crStore.showModalEdit = false">Batal</Button>
            </form>
        </UseTemplate>
        <Dialog v-model:open="crStore.showModalEdit">
            <DialogScrollContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Kelas</DialogTitle>
                    <!-- <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> -->
                </DialogHeader>
                <GridForm />
            </DialogScrollContent>
        </Dialog>
    </div>
</template>