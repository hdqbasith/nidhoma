<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import type { StudentMother } from '~/types/user/biodataSiswa';

const router = useRouter();
const setting = useSettingsStore()
const biodata = useStudentBiodataStore()
const { mhasil, mhidup, mkerja, mpdd, mrumahstt, tpt_tinggal } = useOptionsStore()

const formSchema = toTypedSchema(z.object({
    ik_akun: z.string().nullish(),
    ik_nama: z.string().nullish(),
    ik_nik: z.number().nullish(),
    ik_tmplahir: z.string().nullish(),
    ik_tgllahir: z.string().nullish(),
    ik_status: z.string().nullish(),
    ik_hp: z.string().nullish(),
    ik_pendidikan: z.string().nullish(),
    ik_pekerjaan: z.string().nullish(),
    ik_penghasilan: z.string().nullish(),
    ik_tpt_tinggal: z.string().nullish(),
    ik_propinsi: z.string().nullish(),
    ik_kabupaten: z.string().nullish(),
    ik_kecamatan: z.string().nullish(),
    ik_kelurahan: z.string().nullish(),
    ik_rt: z.number().nullish(),
    ik_rw: z.number().nullish(),
    ik_kode_pos: z.number().nullish(),
    ik_alamat: z.string().nullish(),
    ik_status_rumah: z.string().nullish(),
}))
const lanjut = ref(false)
const { handleSubmit, isSubmitting, meta, resetForm, setFieldValue, setErrors, values } = useForm({ validationSchema: formSchema, initialValues: biodata.dataIbu })
const client = useSanctumClient();
const saveData = () => client<StudentMother>("applicant/data-ibu", {
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
            if (lanjut.value) biodata.stepIndex = 4;
        }
        lanjut.value = false
    }
});
const kirim = handleSubmit(async () => {
    if (meta.value.dirty) await saveData()
    else biodata.stepIndex = 4;
})
watch(
    () => biodata.dataIbu,
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
    parent: { parent: '0' },
    target: 'prov',
})
const prov = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kab = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kec = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const kel = ref<wil[]>([{ key: '0', value: 'Pilih' }])
const getwilayah = async () => await client<wil>('applicant/wilayah', {
    params: wilayah.parent,
    method: "get",
    async onResponse({ response }) {
        if (response.status === 200) {
            if (wilayah.target == 'prov') {
                prov.value = response._data
            } else if (wilayah.target == 'kab') {
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
    if (prov.value.length < 3) {
        wilayah.parent.parent = '0'
        wilayah.target = 'prov'
        await getwilayah()
    }
    if (!meta.value.dirty && biodata.dataIbu.ik_propinsi) {
        wilayah.parent.parent = biodata.dataIbu.ik_propinsi
        wilayah.target = 'kab'
        await getwilayah().then(() => {
            if (biodata.dataIbu.ik_kabupaten) {
                wilayah.parent.parent = biodata.dataIbu.ik_kabupaten
                wilayah.target = 'kec'
                getwilayah().then(() => {
                    if (biodata.dataIbu.ik_kecamatan) {
                        wilayah.parent.parent = biodata.dataIbu.ik_kecamatan
                        wilayah.target = 'kel'
                        getwilayah().then(() => resetForm())
                    }
                })
            }
        })
    }
}
onMounted(() => {
    if (!biodata.dataIbu?.ik_akun) {
        biodata.fetchBiodata().then(() => {
            updateWilayah()
        })
    } else updateWilayah()
    watch(() => values.ik_propinsi, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kab'
        getwilayah().then(() => {

            if (meta.value.dirty) kab.value.push({ key: values?.ik_kabupaten ?? '1', value: 'Pilih Ulang Kabupaten' })
            console.log(meta.value);
        })
    })
    watch(() => values.ik_kabupaten, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kec'
        getwilayah().then(() => {
            if (meta.value.dirty && values.ik_kecamatan) kec.value.push({ key: values?.ik_kecamatan ?? '1', value: 'Pilih Ulang Kecamatan' })
        })
    })
    watch(() => values.ik_kecamatan, (n, o) => {
        if (n) wilayah.parent.parent = n
        wilayah.target = 'kel'
        getwilayah().then(() => {
            if (meta.value.dirty && values.ik_kelurahan) kel.value.push({ key: values?.ik_kelurahan ?? '1', value: 'Pilih Ulang Desa/Kelurahan' })
        })
    })
    watchEffect(() => {
        if (meta.value.dirty)
            setFieldValue('ik_alamat', (values.ik_kelurahan ? kel.value.find(x => x.key == values.ik_kelurahan)?.value : "") + " " + (values.ik_rt ? values.ik_rt?.toString().padStart(3, '0') + "/" : "") + (values.ik_rw ? values.ik_rw?.toString().padStart(3, '0') : "") + " " + (values.ik_kecamatan ? kec.value.find(x => x.key == values.ik_kecamatan)?.value : "") + " " + (values.ik_kabupaten ? kab.value.find(x => x.key == values.ik_kabupaten)?.value : "") + " " + (values.ik_kode_pos ?? "") + " " + (values.ik_propinsi ? prov.value.find(x => x.key == values.ik_propinsi)?.value : ""))
    })
})
</script>
<template>
    <Card class="min-h-[calc(100vh-70px)] flex flex-col mx-6">
        <CardHeader class="md:py-8 flex flex-row space-x-5">
            <!-- <Button variant="default" class="flex flex-col h-14" @click="setting.toggleFloatInput()">
                <Boxes class="h-5" /><span class="text-xs">Ganti Tema</span>
            </Button> -->
            <div>
                <CardTitle>Data Ibu Kandung</CardTitle>
                <CardDescription>Isilah dengan lengkap sesuai dengan dokumen yang Anda miliki</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="flex flex-col">
            <form @submit.prevent="kirim()" key="dataibu">
                <div class="md:grid md:grid-cols-2 space-y-6 md:space-y-0 md:gap-12 mt-5">
                    <div class="space-y-6">
                        <CardTitle>Data Ibu Kandung</CardTitle>
                        <FormInputSelect name="ik_status" :list="mhidup" :variant="setting.floatInput" />
                        <FormInputText name="ik_nama" :variant="setting.floatInput" />
                        <div v-show="values.ik_status == '1'" class="space-y-6">
                            <FormInputText name="ik_nik" :variant="setting.floatInput" type="number" />
                            <div class="flex flex-row gap-x-5">
                                <FormInputText name="ik_tmplahir" :variant="setting.floatInput" />
                                <FormInputDate name="ik_tgllahir" :variant="setting.floatInput" />
                            </div>
                            <FormInputText name="ik_hp" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_pendidikan" :list="mpdd" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_pekerjaan" :list="mkerja" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_penghasilan" :list="mhasil" :variant="setting.floatInput" />
                        </div>
                    </div>
                    <div class="space-y-6" v-show="values.ik_status == '1'">
                        <CardTitle>Alamat Tempat Tinggal</CardTitle>
                        <FormInputSelect name="ik_tpt_tinggal" :list="tpt_tinggal" :variant="setting.floatInput" />
                        <div class="space-y-6" v-show="values.ik_tpt_tinggal == '1'">
                            <FormInputSelect name="ik_propinsi" :list="prov" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_kabupaten" :list="kab" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_kecamatan" :list="kec" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_kelurahan" :list="kel" :variant="setting.floatInput" />
                            <div class="flex flex-row gap-x-5">
                                <FormInputText name="ik_rt" :variant="setting.floatInput" type="number" />
                                <FormInputText name="ik_rw" :variant="setting.floatInput" type="number" />
                            </div>
                            <FormInputText name="ik_kode_pos" :variant="setting.floatInput" type="number" />
                            <FormInputText name="ik_alamat" :variant="setting.floatInput" />
                            <FormInputSelect name="ik_status_rumah" :list="mrumahstt" :variant="setting.floatInput" />
                        </div>
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