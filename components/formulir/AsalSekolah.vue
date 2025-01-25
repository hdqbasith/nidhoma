<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save, Search } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { useSanctumError } from '~/lib/useSanctumError';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '~/packages/@core/ui-kit/shadcn-ui';
import type { Npsn, StudentPersonal } from '~/types/user/biodataSiswa';

const setting = useSettingsStore()
const biodata = useStudentBiodataStore()
const { provinsi } = useOptionsStore()

interface wil extends Record<string, string> {
    key: string,
    value: string
}
const user = ref(<User>{});
const formSchema = toTypedSchema(z.object({
    s_akun: z.string().nullish(),
    as_nama: z.string().nullish(),
    as_npsn: z.string().nullish(),
    as_propinsi: z.string().nullish(),
    as_kabupaten: z.string().nullish(),
    as_prov: z.string().nullish(),
    as_kab: z.string().nullish(),
    as_tahun_ajaran: z.string().nullish(),
    as_kelas_mts: z.string().nullish(),
    as_alamat: z.string().nullish(),
}))
const listSekolah = ref<wil[]>()
const { handleSubmit, isSubmitting, meta, resetForm, setFieldValue, setErrors, values } = useForm({ validationSchema: formSchema, initialValues: biodata.dataPersonal })
const client = useSanctumClient();
const saveData = async () => await client<StudentPersonal>("applicant/data-personal", {
    method: "PATCH",
    body: values,
    async onResponse({ response }) {
        if (response.status === 422) {
            toast.error('Gagal', {
                description: response._data.message
            })
            setErrors(response._data.errors)
        }
        else if (response.status === 200) {
            toast.success('Data disimpan');
            biodata.fetchBiodata()
        }
    }
});
const kirim = handleSubmit(async () => {
    await saveData()
})
const wilayah = reactive({
    parent: '33',
})
const kab = ref<wil[]>([{ key: "0", value: "Pilih" }])
const getwilayah = async () => await client<wil[]>('applicant/wilayah', {
    query: wilayah,
    method: "get",
    async onResponse({ response }) {
        if (response.status === 200) {
            kab.value = response._data
            kab.value.push({ key: values.as_kabupaten ?? "0", value: "Pilih kabupaten" })
        }
    }
})
const npsn = reactive({ npsn: values.as_npsn ?? 0 })
const showForm = ref(true)
const manualNpsn = ref(false)
const getNpsn = async () => await client<Npsn>('applicant/list-npsn', {
    params: npsn,
    method: "get",
    async onResponse({ response }) {
        if (response.status === 200) {
            setFieldValue('as_nama', response._data.nama)
            setFieldValue('as_npsn', response._data.npsn)
            setFieldValue('as_prov', response._data.provinsi)
            setFieldValue('as_kab', response._data.kabupaten)
            manualNpsn.value = false
        }
    }
}).catch(()=>{
    toast.error('NPSN tidak ditemukan. Silakan isi manual')
    if (npsn.npsn) showForm.value = true
    manualNpsn.value = true
    resetForm()
    setFieldValue('as_npsn', npsn.npsn.toString())
    setFieldValue('as_tahun_ajaran', (new Date().getFullYear() - 1) + "-" + new Date().getFullYear())
})
watch(
    () => biodata.dataPersonal,
    (newValue, oldValue) => {
        if (newValue) {
            Object.entries(newValue).forEach(val => {
                if (!val[1]) newValue[val[0]] = undefined
            })
            resetForm({ values: newValue })
            if (!values.as_tahun_ajaran) setFieldValue('as_tahun_ajaran', (new Date().getFullYear() - 1) + "-" + new Date().getFullYear())
            if (newValue.as_npsn) {
                showForm.value = true
                npsn.npsn = newValue.as_npsn
                getNpsn()
            }
        }
    }
)
watch(
    () => values.as_propinsi,
    (n, o) => {
        wilayah.parent = n ?? '33'
        if (manualNpsn.value) getwilayah()
    }
)
onMounted(() => {
    if (!biodata.dataPersonal?.s_akun) {
        biodata.fetchBiodata()
    }
})
</script>
<template>
    <Card class="min-h-[calc(100vh-70px)] flex flex-col mx-6">
        <CardHeader class="md:py-8 flex flex-row space-x-5">
            <!-- <Button variant="default" class="flex flex-col h-14" @click="setting.toggleFloatInput()">
                <Boxes class="h-5" /><span class="text-xs">Ganti Tema</span>
            </Button> -->
            <div>
                <CardTitle>Asal Sekolah</CardTitle>
                <CardDescription>Isilah sesuai sekolah Anda sebelum belajar di MA NU TBS Kudus</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="flex flex-col">
            <div class="flex items-center gap-1.5 max-w-xs mb-5">
                <Input @keyup.enter="getNpsn()" placeholder="NPSN Sekolah Asal" name="as_npsn"
                    @update:model-value="npsn.npsn = $event" />
                <Button @click="getNpsn()">
                    <!-- <Loader2 class="w-4 h-4 mr-2 animate-spin" v-show="getNpsn() == 'pending'" /> -->
                    Cari &nbsp;
                    <Search />
                </Button>
            </div>
            <form @submit.prevent="kirim()" v-if="showForm">
                <span class="text-red-600 dark:text-red-400 text-sm" v-if="manualNpsn">NPSN tidak ditemukan. Silakan isi
                    manual
                    formulir di
                    bawah.</span>
                <div class="md:grid md:grid-cols-2 space-y-6 md:space-y-0 md:gap-12 mt-5">
                    <div class="space-y-6">
                        <FormInputSelect v-if="manualNpsn" name="as_propinsi" :list="provinsi"
                            :variant="setting.floatInput" />
                        <FormInputText v-else name="as_prov" :variant="setting.floatInput" />
                        <FormInputSelect v-if="manualNpsn" name="as_kabupaten" :list="kab"
                            :variant="setting.floatInput" />
                        <FormInputText v-else name="as_kab" :variant="setting.floatInput" />
                        <FormInputText name="as_npsn" :variant="setting.floatInput" />
                        <FormInputText name="as_nama" :variant="setting.floatInput" />
                        <FormInputText name="as_alamat" :variant="setting.floatInput" />
                        <FormInputText name="as_tahun_ajaran" :variant="setting.floatInput" />
                    </div>
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