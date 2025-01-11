<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';

const classRoom = z.object({
    id: z.string().uuid().nullish(),
    nama_kelas: z.string().nullish(),
    nama_kelas2: z.string().nullish(),
    tahun_ajaran: z.string().nullish(),
    kode_wali: z.string().uuid().nullish(),
    jurusan: z.number().nullish(),
    tingkat: z.string().nullish(),
});

const classRooms = toTypedSchema(z.record(z.string(), classRoom));
const huruf = 'A'.charCodeAt(0);
const { handleSubmit, isSubmitting, meta, resetForm, setErrors, values } = useForm({ validationSchema: classRooms })
const { refresh } = useFetch<any>("admin/make-class", {
    method: "POST",
    body: values,
    immediate: false,
    lazy: true,
    watch: false,
    async onResponse({ response }) {
        if (response.status === 200) {
            toast.success('Data disimpan');

        }
    }
});
const opTA = () => {
    let thn = new Date().getFullYear();
    const ta = [];
    for (let i = 0; i < 5; i++) {
        ta.push({ key: thn + '-' + (thn + 1), value: thn + '-' + (thn + 1) });
        thn--;
    }
    return ta;
};
const opTingkat = [
    { key: '10', value: '10' },
    { key: '11', value: '11' },
    { key: '12', value: '12' },
];
const opJumlah = () => {
    const jumlah = [];
    for (let i = 1; i < 20; i++) {
        jumlah.push({ key: i.toString(), value: i.toString() });
    }
    return jumlah;
};
const newClassRoom = toTypedSchema(z.object({
    tingkat: z.string().nullish(),
    jumlah: z.string().nullish(),
    tahun_ajaran: z.string().nullish(),
}));
const { refresh: createClassRooms } = useFetch<any>("kelas/new-bulk", {
    method: "POST",
    // body: ,
    immediate: false,
    lazy: true,
    watch: false,
    async onResponse({ response }) {
        if (response.status === 200) {
            toast.success('Data disimpan');

        }
    }
});
const kirim = handleSubmit(() => {
    if (meta.value.dirty) refresh()
})
const setting = useSettingsStore()

</script>
<template>
    <Card class="min-h-[calc(100vh-70px)] flex flex-col mx-6">
        <CardHeader class="md:py-8 flex flex-row space-x-5">
            <Button variant="default" class="flex flex-col h-14" @click="setting.toggleFloatInput()">
                <Boxes class="h-5" /><span class="text-xs">Ganti Tema</span>
            </Button>
            <div>
                <CardTitle>Buat Kelas Baru</CardTitle>
            </div>
        </CardHeader>
        <CardContent class="flex flex-col">
            <form @submit.prevent="kirim()">
                <div class=" ">
                    <FormInputSelect :list="opTA()" name="p_instalment" :variant="setting.floatInput" />
                    <FormInputSelect :list="opTingkat" name="p_instalment" :variant="setting.floatInput" />
                    <FormInputSelect :list="opJumlah()" name="p_instalment" :variant="setting.floatInput" />
                </div>
                <div class="grid grid-cols-3 mt-9">
                    <div></div>
                    <Button variant="default" size="lg" :disabled="!meta.dirty || isSubmitting" type="submit">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-show="isSubmitting" />
                        <Save />&nbsp; Simpan
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
