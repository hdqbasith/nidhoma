<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { log } from 'node:console';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import type { StudentGuardian } from '~/types/user/biodataSiswa';

const router = useRouter();
const setting = useSettingsStore()
const biodata = useStudentBiodataStore()
const { mhasil, mhidup, mkerja, mpdd, mrumahstt, tpt_tinggal_wali, mhubwali } = useOptionsStore()

const formSchema = toTypedSchema(z.object({
  wali_akun: z.string().nullish(),
  ortu_kepala_keluarga: z.string().nullish(),
  ortu_kk: z.number().nullish(),
  wali_hubungan: z.string().nullish(),
  wali_nama: z.string().nullish(),
  wali_nik: z.number().nullish(),
  wali_tmplahir: z.string().nullish(),
  wali_tgllahir: z.string().nullish(),
  wali_hp: z.string().nullish(),
  wali_pendidikan: z.string().nullish(),
  wali_pekerjaan: z.string().nullish(),
  wali_penghasilan: z.string().nullish(),
  wali_tpt_tinggal: z.string().nullish(),
  wali_propinsi: z.string().nullish(),
  wali_kabupaten: z.string().nullish(),
  wali_kecamatan: z.string().nullish(),
  wali_kelurahan: z.string().nullish(),
  wali_rt: z.number().nullish(),
  wali_rw: z.number().nullish(),
  wali_kode_pos: z.number().nullish(),
  wali_alamat: z.string().nullish(),
  wali_status_rumah: z.string().nullish(),
}))
const lanjut = ref(false)
const { handleSubmit, isSubmitting, meta, resetForm, setFieldValue, setErrors, values } = useForm({ validationSchema: formSchema, initialValues: biodata.dataWali })
const client = useSanctumClient();
const saveData = async () => await client<StudentGuardian>("applicant/data-wali", {
  method: "PATCH",
  body: {
    ...values,
    wali_akun: biodata.studentId
  },
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
      if (lanjut.value) biodata.stepIndex = 5
    }
    lanjut.value = false
  }
});
const kirim = handleSubmit(async () => {
  if (meta.value.dirty) await saveData()
  else biodata.stepIndex = 5
})
watch(
  () => biodata.dataWali,
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
  if (!meta.value.dirty && biodata.dataWali.wali_propinsi) {
    wilayah.parent.parent = biodata.dataWali.wali_propinsi
    wilayah.target = 'kab'
    await getwilayah().then(() => {
      if (biodata.dataWali.wali_kabupaten) {
        wilayah.parent.parent = biodata.dataWali.wali_kabupaten
        wilayah.target = 'kec'
        getwilayah().then(() => {
          if (biodata.dataWali.wali_kecamatan) {
            wilayah.parent.parent = biodata.dataWali.wali_kecamatan
            wilayah.target = 'kel'
            getwilayah().then(() => resetForm())
          }
        })
      }
    })
  }
}
onMounted(() => {
  if (!biodata.dataWali?.wali_akun) {
    biodata.fetchBiodata().then(() => {
      updateWilayah()
    })
  } else updateWilayah()
  watch(() => values.wali_propinsi, (n, o) => {
    if (n) wilayah.parent.parent = n
    wilayah.target = 'kab'
    getwilayah().then(() => {
      if (meta.value.dirty) kab.value.push({ key: values?.wali_kabupaten ?? '1', value: 'Pilih Ulang Kabupaten' })
    })
  })
  watch(() => values.wali_kabupaten, (n, o) => {
    if (n) wilayah.parent.parent = n
    wilayah.target = 'kec'
    getwilayah().then(() => {
      if (meta.value.dirty) kec.value.push({ key: values?.wali_kecamatan ?? '1', value: 'Pilih Ulang Kecamatan' })
    })
  })
  watch(() => values.wali_kecamatan, (n, o) => {
    if (n) wilayah.parent.parent = n
    wilayah.target = 'kel'
    getwilayah().then(() => {
      if (meta.value.dirty) kel.value.push({ key: values?.wali_kelurahan ?? '1', value: 'Pilih Ulang Desa/Kelurahan' })
    })
  })
  watchEffect(() => {
    if (meta.value.dirty) {
      setFieldValue('wali_alamat', (values.wali_kelurahan ? kel.value.find(x => x.key == values.wali_kelurahan)?.value : "") + " " + (values.wali_rt ? values.wali_rt?.toString().padStart(3, '0') + "/" : "") + (values.wali_rw ? values.wali_rw?.toString().padStart(3, '0') : "") + " " + (values.wali_kecamatan ? kec.value.find(x => x.key == values.wali_kecamatan)?.value : "") + " " + (values.wali_kabupaten ? kab.value.find(x => x.key == values.wali_kabupaten)?.value : "") + " " + (values.wali_kode_pos ?? "") + " " + (values.wali_propinsi ? prov.value.find(x => x.key == values.wali_propinsi)?.value : ""))
    }
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
        <CardTitle>Data Wali (Yang membiayai sekolah)</CardTitle>
        <CardDescription>Isilah dengan lengkap sesuai dengan dokumen yang Anda miliki</CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col">
      <form @submit.prevent="kirim()">
        <div class="md:grid md:grid-cols-2 space-y-6 md:space-y-0 md:gap-12 mt-5">
          <div class="space-y-6">
            <CardTitle>Data Wali</CardTitle>
            <FormInputSelect name="wali_hubungan" :list="mhubwali" :variant="setting.floatInput" />
            <div class="space-y-6" v-show="values.wali_hubungan != '1'">
              <FormInputText name="wali_nama" :variant="setting.floatInput" />
              <FormInputText name="wali_nik" :variant="setting.floatInput" type="number" />
              <div class="flex flex-row gap-x-5">
                <FormInputText name="wali_tmplahir" :variant="setting.floatInput" class="w-1/2" />
                <FormInputDate name="wali_tgllahir" :variant="setting.floatInput" class="w-1/2" />
              </div>
              <FormInputText name="wali_hp" :variant="setting.floatInput" />
              <FormInputSelect name="wali_pendidikan" :list="mpdd" :variant="setting.floatInput" />
              <FormInputSelect name="wali_pekerjaan" :list="mkerja" :variant="setting.floatInput" />
              <FormInputSelect name="wali_penghasilan" :list="mhasil" :variant="setting.floatInput" />
            </div>
          </div>
          <div class="space-y-6" v-show="values.wali_hubungan != '1'">
            <CardTitle>Alamat Tempat Tinggal</CardTitle>
            <FormInputSelect name="wali_tpt_tinggal" :list="tpt_tinggal_wali" :variant="setting.floatInput" />
            <div class="space-y-6" v-show="values.wali_tpt_tinggal == '1'">
              <FormInputSelect name="wali_propinsi" :list="prov" :variant="setting.floatInput" />
              <FormInputSelect name="wali_kabupaten" :list="kab" :variant="setting.floatInput" />
              <FormInputSelect name="wali_kecamatan" :list="kec" :variant="setting.floatInput" />
              <FormInputSelect name="wali_kelurahan" :list="kel" :variant="setting.floatInput" />
              <FormInputText name="wali_rt" :variant="setting.floatInput" type="number" />
              <FormInputText name="wali_rw" :variant="setting.floatInput" type="number" />
              <FormInputText name="wali_kode_pos" :variant="setting.floatInput" type="number" />
              <FormInputText name="wali_alamat" :variant="setting.floatInput" />
              <FormInputSelect name="wali_status_rumah" :list="mrumahstt" :variant="setting.floatInput" />
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