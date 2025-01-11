<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
const auth = useAuthStore();
const router = useRouter();
const setting = useSettingsStore()
const biodata = useStudentBiodataStore()
const { mhasil, mhidup, mkerja, mpdd, mrumahstt, provinsi } = useOptionsStore()

const user = ref(<User>{});
const formSchema = toTypedSchema(z.object({
    ak_akun: z.string().nullish(),
    ak_nama: z.string().nullish(),
    ak_nama_gelar: z.string().nullish(),
    ak_nama_arab: z.string().nullish(),
    ak_nik: z.number().nullish(),
    ak_tmplahir: z.string().nullish(),
    ak_tgllahir: z.string().nullish(),
    ak_status: z.string().nullish(),
    ak_hp: z.string().nullish(),
    ak_pendidikan: z.string().nullish(),
    ak_pekerjaan: z.string().nullish(),
    ak_penghasilan: z.string().nullish(),
    ak_propinsi: z.string().nullish(),
    ak_kabupaten: z.string().nullish(),
    ak_kecamatan: z.string().nullish(),
    ak_kelurahan: z.string().nullish(),
    ak_rt: z.number().nullish(),
    ak_rw: z.number().nullish(),
    ak_kode_pos: z.number().nullish(),
    ak_alamat: z.string().nullish(),
    ak_alamat_arab: z.string().nullish(),
    ak_status_rumah: z.string().nullish(),
}))
const lanjut = ref(false)
const { handleSubmit, isSubmitting, meta, resetForm, setFieldValue, setErrors, values } = useForm({ validationSchema: formSchema, initialValues: biodata.dataAyah })
const { refresh: saveData } = useFetch<any>("applicant/data-ayah", {
    method: "PATCH",
    body: values,
    immediate: false,
    watch: false,
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
            if (lanjut.value) router.push("/applicant/ppdb/formulir/ibu")
        }
        lanjut.value = false
    }
});
const kirim = handleSubmit(async () => {
    if (meta.value.dirty) await saveData()
    else router.push("/applicant/ppdb/formulir/ibu")
})
watch(
    () => biodata.dataAyah,
    (newValue, oldValue) => {
        if (newValue) {
            Object.entries(newValue).forEach(val => {
                if (!val[1]) newValue[val[0]] = undefined
            })
            resetForm({ values: newValue })
        }
    }
)
interface wil extends Record<string, string> {
    key: string,
    value: string
}
const wilayah = reactive({
    parent: { parent: '11' },
    target: 'kab',
})
const prov = ref<wil[]>(provinsi)
const kab = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kec = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kel = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const getwilayah = useFetch('applicant/wilayah', {
    params: wilayah.parent,
    method: "get",
    immediate: true,
    watch: false,
    async onResponse({ response }) {
        if (response.status === 200) {
            if (wilayah.target == 'kab') {
                kab.value = response._data
            } else if (wilayah.target == 'kec') {
                kec.value = response._data
            } else if (wilayah.target == 'kel') {
                kel.value = response._data
            }
        }
    }
})
const updateWilayah = async () => {
    if (!meta.value.dirty && biodata.dataAyah.ak_propinsi) {
        wilayah.parent.parent = biodata.dataAyah.ak_propinsi
        wilayah.target = 'kab'
        await getwilayah.refresh().then(() => {
            if (biodata.dataAyah.ak_kabupaten) {
                wilayah.parent.parent = biodata.dataAyah.ak_kabupaten
                wilayah.target = 'kec'
                getwilayah.refresh().then(() => {
                    if (biodata.dataAyah.ak_kecamatan) {
                        wilayah.parent.parent = biodata.dataAyah.ak_kecamatan
                        wilayah.target = 'kel'
                        getwilayah.refresh().then(() => resetForm())
                    }
                })
            }
        })
    }
}
onMounted(() => {
    if (!biodata.dataAyah?.ak_akun) {
        biodata.fetchBiodata().then(() => {
            updateWilayah()
        })
    } else updateWilayah()
    watch(() => values.ak_propinsi, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kab'
        getwilayah.refresh().then(() => {
            if (meta.value.dirty) kab.value.push({ key: values?.ak_kabupaten ?? '1', value: 'Pilih Ulang Kabupaten' })
        })
    })
    watch(() => values.ak_kabupaten, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kec'
        getwilayah.refresh().then(() => {
            if (meta.value.dirty) kec.value.push({ key: values?.ak_kecamatan ?? '1', value: 'Pilih Ulang Kecamatan' })
        })
    })
    watch(() => values.ak_kecamatan, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kel'
        getwilayah.refresh().then(() => {
            if (meta.value.dirty) kel.value.push({ key: values?.ak_kelurahan ?? '1', value: 'Pilih Ulang Desa/Kelurahan' })
        })
    })
    watchEffect(() => {
        if (meta.value.dirty)
            setFieldValue('ak_alamat', (values.ak_kelurahan ? kel.value.find(x => x.key == values.ak_kelurahan)?.value : "") + " " + (values.ak_rt ? values.ak_rt?.toString().padStart(3, '0') + "/" : "") + (values.ak_rw ? values.ak_rw?.toString().padStart(3, '0') : "") + " " + (values.ak_kecamatan ? kec.value.find(x => x.key == values.ak_kecamatan)?.value : "") + " " + (values.ak_kabupaten ? kab.value.find(x => x.key == values.ak_kabupaten)?.value : "") + " " + (values.ak_kode_pos ?? "") + " " + (values.ak_propinsi ? prov.value.find(x => x.key == values.ak_propinsi)?.value : ""))
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
                <CardTitle>Data Ayah Kandung</CardTitle>
                <CardDescription>Isilah dengan lengkap sesuai dengan dokumen yang Anda miliki</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="flex flex-col">
            <form @submit.prevent="kirim()">
                <div class="md:grid md:grid-cols-2 space-y-6 md:space-y-0 md:gap-12 mt-5">
                    <div class="space-y-6">
                        <CardTitle>Data Ayah Kandung</CardTitle>
                        <FormInputSelect name="ak_status" :list="mhidup" :variant="setting.floatInput" />
                        <FormInputText name="ak_nama" :variant="setting.floatInput" />
                        <div v-show="values.ak_status == '1'" class="space-y-6">
                            <FormInputText name="ak_nama_gelar" :variant="setting.floatInput" />
                            <FormInputText name="ak_nama_arab" :variant="setting.floatInput" />
                            <FormInputText name="ak_nik" :variant="setting.floatInput" type="number" />
                            <div class="flex flex-row gap-x-5">
                                <FormInputText name="ak_tmplahir" :variant="setting.floatInput" />
                                <FormInputDate name="ak_tgllahir" :variant="setting.floatInput" />
                            </div>
                            <FormInputText name="ak_hp" :variant="setting.floatInput" />
                            <FormInputSelect name="ak_pendidikan" :list="mpdd" :variant="setting.floatInput" />
                            <FormInputSelect name="ak_pekerjaan" :list="mkerja" :variant="setting.floatInput" />
                            <FormInputSelect name="ak_penghasilan" :list="mhasil" :variant="setting.floatInput" />
                        </div>
                    </div>
                    <div class="space-y-6" v-show="values.ak_status == '1'">
                        <CardTitle>Alamat Tempat Tinggal</CardTitle>
                        <FormInputSelect name="ak_propinsi" :list="prov" :variant="setting.floatInput" />
                        <FormInputSelect name="ak_kabupaten" :list="kab" :variant="setting.floatInput" />
                        <FormInputSelect name="ak_kecamatan" :list="kec" :variant="setting.floatInput" />
                        <FormInputSelect name="ak_kelurahan" :list="kel" :variant="setting.floatInput" />
                        <div class="flex flex-row gap-x-5">
                            <FormInputText name="ak_rt" :variant="setting.floatInput" type="number" />
                            <FormInputText name="ak_rw" :variant="setting.floatInput" type="number" />
                        </div>
                        <FormInputText name="ak_kode_pos" :variant="setting.floatInput" type="number" />
                        <FormInputText name="ak_alamat" :variant="setting.floatInput" />
                        <FormInputText name="ak_alamat_arab" :variant="setting.floatInput" />
                        <FormInputSelect name="ak_status_rumah" :list="mrumahstt" :variant="setting.floatInput" />
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