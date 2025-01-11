<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';

const formSchema = toTypedSchema(z.object({
    p_code: z.string().nullish(),
    p_title: z.string().nullish(),
    p_amount: z.number().nullish(),
    p_instalment: z.string().nullish(),
}))
const { handleSubmit, isSubmitting, meta, resetForm, setErrors, values } = useForm({ validationSchema: formSchema })
const { refresh } = useFetch<any>("admin/make-payment", {
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
const kirim = handleSubmit(() => {
    if (meta.value.dirty) refresh()
})
const setting = useSettingsStore()
const instalment=[
    {key:'0', value:'Tidak'},
    {key:'1', value:'Ya'},
]
</script>
<template>
    <Card class="min-h-[calc(100vh-70px)] flex flex-col mx-6">
        <CardHeader class="md:py-8 flex flex-row space-x-5">
            <Button variant="default" class="flex flex-col h-14" @click="setting.toggleFloatInput()">
                <Boxes class="h-5" /><span class="text-xs">Ganti Tema</span>
            </Button>
            <div>
                <CardTitle>Buat Form Pembayaran Baru</CardTitle>
            </div>
        </CardHeader>
        <CardContent class="flex flex-col">
            <form @submit.prevent="kirim()">
                <div class=" ">
                    <FormInputText name="p_title" :variant="setting.floatInput" />
                    <FormInputText name="p_amount" type="number" :variant="setting.floatInput" />
                    <FormInputSelect :list="instalment" name="p_instalment" :variant="setting.floatInput" />
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
        <CardFooter class="justify-end mt-auto">
            <span class="text-sm text-zinc-500 dark:text-zinc-400">&copy; {{ new Date().getFullYear() }} HDQ Basith
                Studio</span>
        </CardFooter>
    </Card>
</template>
