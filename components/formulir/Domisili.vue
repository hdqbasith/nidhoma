<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import type { StudentDomicile } from '~/types/user/biodataSiswa';

const auth = useAuthStore();
const router = useRouter();
const setting = useSettingsStore()
const biodata = useStudentBiodataStore()
const { mtransport, mjarak, mjenisrumah } = useOptionsStore()

interface wil extends Record<string, string> {
    key: string,
    value: string
}
const user = ref(<User>{});
const formSchema = toTypedSchema(z.object({
    m_akun: z.string().nullish(),
    m_tmp_tinggal: z.string().nullish(),
    m_pondok_kode: z.string().nullish(),
    m_pondok_nama: z.string().nullish(),
    m_pemilik: z.string().nullish(),
    m_hp_pemilik: z.string().nullish(),
    m_propinsi: z.string().nullish(),
    m_kabupaten: z.string().nullish(),
    m_kecamatan: z.string().nullish(),
    m_kelurahan: z.string().nullish(),
    m_rt: z.number().nullish(),
    m_rw: z.number().nullish(),
    m_kode_pos: z.number().nullish(),
    m_alamat: z.string().nullish(),
    m_jarak: z.string().nullish(),
    m_transport: z.string().nullish(),
}))
const mpondok = ref<wil[]>()
const client = useSanctumClient();
client<wil[]>('/applicant/list-pondok', {
    method: 'get',
    onResponse({ response }) {
        mpondok.value = response._data
    }
})

const lanjut = ref(false)
const { handleSubmit, isSubmitting, meta, resetForm, setFieldValue, setErrors, values } = useForm({ validationSchema: formSchema, initialValues: biodata.dataDomisili })
const saveData = async () => await client<StudentDomicile>("applicant/data-domisili", {
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
            if (lanjut.value) biodata.stepIndex = 6
        }
        lanjut.value = false
    }
});
const kirim = handleSubmit(async () => {
    if (meta.value.dirty) await saveData()
    else biodata.stepIndex = 6
})
watch(
    () => biodata.dataDomisili,
    (newValue, oldValue) => {
        if (newValue) {
            Object.entries(newValue).forEach(val => {
                if (!val[1]) newValue[val[0]] = undefined
            })
            resetForm({ values: newValue })
        }
    }
)
const wilayah = reactive({
    parent: { parent: '33' },
    target: 'kab',
})
const kab = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kec = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kel = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const getwilayah = () => client<wil>('applicant/wilayah', {
    params: wilayah.parent,
    method: "get",
    async onResponse({ response }) {
        console.log(response);
        if (response.status === 200) {
            if (wilayah.target == 'kab') {
                kab.value = response._data.filter((a: any) => a.value == 'Kab. Kudus')
            } else if (wilayah.target == 'kec') {
                kec.value = response._data
            } else if (wilayah.target == 'kel') {
                kel.value = response._data
            }
        }
    }
})
const updateWilayah = async () => {
    if (!meta.value.dirty) {
        wilayah.parent.parent = '33'
        wilayah.target = 'kab'
        await getwilayah().then(() => {
            
            if (biodata.dataDomisili.m_kabupaten) {
                wilayah.parent.parent = biodata.dataDomisili.m_kabupaten
                wilayah.target = 'kec'
                getwilayah().then(() => {
                    if (biodata.dataDomisili.m_kecamatan) {
                        wilayah.parent.parent = biodata.dataDomisili.m_kecamatan
                        wilayah.target = 'kel'
                        getwilayah().then(() => resetForm())
                    }
                })
            }
        })
    }
}
onMounted(() => {
    if (!biodata.dataDomisili?.m_akun) {
        biodata.fetchBiodata().then(() => {
            updateWilayah()
        })
    } else updateWilayah()
    watch(() => values.m_kabupaten, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kec'
        getwilayah().then(() => {
            if (meta.value.dirty) kec.value.push({ key: values?.m_kecamatan ?? '1', value: 'Pilih Ulang Kecamatan' })
        })
    })
    watch(() => values.m_kecamatan, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kel'
        getwilayah().then(() => {
            if (meta.value.dirty) kel.value.push({ key: values?.m_kelurahan ?? '1', value: 'Pilih Ulang Desa/Kelurahan' })
        })
    })
    watchEffect(() => {
        if (meta.value.dirty)
            setFieldValue('m_alamat', (values.m_kelurahan ? kel.value.find(x => x.key == values.m_kelurahan)?.value : "") + " " + (values.m_rt ? values.m_rt?.toString().padStart(3, '0') + "/" : "") + (values.m_rw ? values.m_rw?.toString().padStart(3, '0') : "") + " " + (values.m_kecamatan ? kec.value.find(x => x.key == values.m_kecamatan)?.value : "") + " " + (values.m_kabupaten ? kab.value.find(x => x.key == values.m_kabupaten)?.value : "") + " " + (values.m_kode_pos ?? ""))
    })
})
</script>
<template>
    <Card class="min-h-[calc(100vh-70px)] flex flex-col mx-6">
        <CardHeader class="md:py-8 flex flex-row space-x-5">
            <Button variant="default" class="flex flex-col h-14" @click="setting.toggleFloatInput()">
                <Boxes class="h-5" /><span class="text-xs">Ganti Tema</span>
            </Button>
            <div>
                <CardTitle>Tempat Tinggal</CardTitle>
                <CardDescription>Isilah sesuai tempat tinggal Anda selama belajar di MA NU TBS Kudus</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="flex flex-col">
            <form @submit.prevent="kirim()" key="formDomicile">
                <div class="md:grid md:grid-cols-2 space-y-6 md:space-y-0 md:gap-12 mt-5">
                    <div class="space-y-6">
                        <FormInputSelect name="m_tmp_tinggal" :list="mjenisrumah" :variant="setting.floatInput" />
                        <FormInputSelect name="m_pondok_kode" :list="mpondok" :variant="setting.floatInput"
                            v-if="values.m_tmp_tinggal == '5'" />
                        <FormInputText name="m_pondok_nama" :variant="setting.floatInput"
                            v-if="values.m_pondok_kode == '99'" />
                        <FormInputText name="m_pemilik" :variant="setting.floatInput"
                            v-if="values.m_tmp_tinggal != '1'" />
                        <FormInputText name="m_hp_pemilik" :variant="setting.floatInput"
                            v-if="values.m_tmp_tinggal != '1'" />
                        <FormInputSelect name="m_jarak" :list="mjarak" :variant="setting.floatInput" />
                        <FormInputSelect name="m_transport" :list="mtransport" :variant="setting.floatInput" />
                    </div>
                    <div class="space-y-6" v-if="values.m_tmp_tinggal != '1'">
                        <FormInputSelect name="m_kabupaten" :list="kab" :variant="setting.floatInput" />
                        <FormInputSelect name="m_kecamatan" :list="kec" :variant="setting.floatInput" />
                        <FormInputSelect name="m_kelurahan" :list="kel" :variant="setting.floatInput" />
                        <div class="flex flex-row gap-x-5">
                            <FormInputText name="m_rt" :variant="setting.floatInput" type="number" />
                            <FormInputText name="m_rw" :variant="setting.floatInput" type="number" />
                        </div>
                        <FormInputText name="m_kode_pos" :variant="setting.floatInput" type="number" />
                        <FormInputText name="m_alamat" :variant="setting.floatInput" />
                    </div>
                </div>
                <div class="grid grid-cols-3 mt-9">
                    <div></div>
                    <Button variant="default" size="lg" :disabled="!meta.dirty || isSubmitting" type="submit">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-show="isSubmitting" />
                        <Save />&nbsp; Simpan
                    </Button>
                    <Button variant="secondary" @click.prevent="lanjut = true; kirim()">Lanjut
                        ></Button>
                </div>
            </form>
        </CardContent>
        <CardFooter class="justify-end mt-auto">
            <span class="text-sm text-zinc-500 dark:text-zinc-400">&copy; {{ new Date().getFullYear() }} HDQ Basith
                Studio</span>
        </CardFooter>
    </Card>
</template>