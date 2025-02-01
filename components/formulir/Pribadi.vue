<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Boxes, Loader2, Save } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import type { StudentPersonal } from '~/types/user/biodataSiswa';
import Student from '../dashboard/student.vue';

const router = useRouter();
const setting = useSettingsStore()
const biodata = useStudentBiodataStore()
const { mcita, mhobi } = useOptionsStore()

const user = ref(<User>{});
const formSchema = toTypedSchema(z.object({
  s_akun: z.string().nullish(),
  s_nisn: z.string().nullish(),
  s_nama_lengkap: z.string().nullish(),
  s_nama_arab: z.string().nullish(),
  s_tempat_lahir: z.string().nullish(),
  s_tanggal_lahir: z.string().nullish(),
  s_nik: z.number().nullish(),
  s_anak_ke: z.number().nullish(),
  s_jml_saudara: z.string().nullish(),
  s_email: z.string().nullish(),
  s_hp: z.string().nullish(),
  s_hobi: z.string().nullish(),
  s_citacita: z.string().nullish(),
  s_kk: z.number().nullish(),
  s_kepala_keluarga: z.string().nullish(),
  as_nama: z.string().nullish(),
  as_npsn: z.string().nullish(),
  as_propinsi: z.string().nullish(),
  as_kabupaten: z.string().nullish(),
  as_tahun_ajaran: z.string().nullish(),
  as_kelas_mts: z.string().nullish(),
  as_alamat: z.string().nullish()
}))
const lanjut = ref(false)
const { handleSubmit, isSubmitting, meta, resetForm, setErrors, values } = useForm({ validationSchema: formSchema, initialValues: biodata.dataPersonal })
const client = useSanctumClient();
const saveData = () => client<StudentPersonal>("/applicant/data-personal", {
  method: "PATCH",
  body: {
    ...values,
    s_akun:biodata.studentId
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
      if (lanjut.value) biodata.stepIndex = 2
    }
    lanjut.value = false
  }
});
const kirim = handleSubmit(() => {
  if (meta.value.dirty) saveData()
  else biodata.stepIndex = 2
})
const jmlSaudara = computed(() => {
  let sdr = [
    {
      key: '0',
      value: ''
    },
    {
      key: '1',
      value: 'Anak tunggal'
    }]
  for (let i = 2; i <= 10; i++) {
    sdr.push({
      key: i.toString(),
      value: i + ' bersaudara'
    })
  }
  sdr.push({
    key: '11',
    value: 'lebih dari 10 bersaudara'
  })
  return sdr
})
watch(
  () => biodata.dataPersonal,
  (newValue, oldValue) => {
    if (newValue) {
      Object.entries(newValue).forEach(val => {
        if (!val[1]) newValue[val[0]] = undefined
      })
      resetForm({ values: newValue })
    }
  }
)
onMounted(() => {
  if (!biodata.dataPersonal?.s_akun)
    biodata.fetchBiodata()
})

</script>
<template>
  <Card class="min-h-[calc(100vh-70px)] flex flex-col mx-6">
    <CardHeader class="md:py-8 flex flex-row space-x-5">
      <!-- <Button variant="default" class="flex flex-col h-14" @click="setting.toggleFloatInput()">
        <Boxes class="h-5" /><span class="text-xs">Ganti Tema</span>
      </Button> -->
      <div>
        <CardTitle>Data Pribadi Calon Siswa</CardTitle>
        <CardDescription>Isilah dengan lengkap sesuai dengan ijazah terakhir Anda</CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col">
      <form @submit.prevent="kirim()">
        <div class="md:grid md:grid-cols-2 md:gap-8 ">
          <div class="space-y-6">
            <FormInputText name="s_nisn" :variant="setting.floatInput" />
            <!-- <FormInputText name="s_email" :variant="setting.floatInput" label="Email" /> -->
            <FormInputText name="s_nama_lengkap" :variant="setting.floatInput" />
            <FormInputText name="s_nama_arab" :variant="setting.floatInput" />
            <div class="flex flex-row gap-x-5">
              <FormInputText name="s_tempat_lahir" :variant="setting.floatInput" class="w-1/2" />
              <FormInputDate name="s_tanggal_lahir" :variant="setting.floatInput" class="w-1/2" />
            </div>
            <FormInputText name="s_nik" type="number" :variant="setting.floatInput" />
            <FormInputText name="s_kk" type="number" :variant="setting.floatInput" />
          </div>
          <div class="space-y-6">
            <FormInputText name="s_kepala_keluarga" :variant="setting.floatInput" />
            <div class="md:flex md:flex-row items-end gap-x-5">
              <FormInputText name="s_anak_ke" type="number" :variant="setting.floatInput" class="w-full md:w-48" />
              <span class="pb-4">dari</span>
              <FormInputSelect :list="jmlSaudara" name="s_jml_saudara" :variant="setting.floatInput"
                placeholder="termasuk Anda" />
            </div>
            <FormInputText name="s_hp" :variant="setting.floatInput" />
            <FormInputSelect :list="mhobi" name="s_hobi" :variant="setting.floatInput" />
            <FormInputSelect :list="mcita" name="s_citacita" :variant="setting.floatInput" />
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