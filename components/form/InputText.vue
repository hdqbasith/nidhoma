<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '~/packages/@core/ui-kit/shadcn-ui';
import { cn } from '~/packages/utils';

const props = defineProps<{
    defaultValue?: string | number
    modelValue?: string | number | null
    class?: HTMLAttributes['class']
    type?: "number" | "text" | "password" | "email" | string
    name?: string
    label?: string
    variant?: 'normal' | 'float' | 'outline'
}>()

const emits = defineEmits<{ (e: 'update:modelValue', payload: string | number): void }>()

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
})
const autoLabel = <Record<string, string>>{
    s_nisn: 'NISN',
    s_akun: 'Akun Siswa',
    s_nama_lengkap: 'Nama Lengkap',
    s_nama_arab: 'Nama dengan huruf Arab',
    s_tempat_lahir: 'Tempat Lahir',
    s_nik: 'NIK',
    s_anak_ke: 'Anak ke-',
    s_email: 'Email',
    s_hp: 'Nomor HP',
    s_kk: 'No. KK',
    s_kepala_keluarga: 'Nama Kepala Keluarga',
    as_nama: 'Nama Sekolah Asal',
    as_npsn: 'NPSN Sekolah Asal',
    as_kelas_mts: 'Kelas MTs',
    as_prov: 'Provinsi',
    as_kab: 'Kabupaten',
    as_tahun_ajaran: 'Lulus Tahun Ajaran',
    as_alamat: 'Alamat',
    ak_nama: 'Nama (tanpa gelar)',
    ak_nama_gelar: 'Nama + Gelar Pendidikan',
    ak_nama_arab: 'Nama dengan huruf Arab ',
    ak_nik: 'NIK ',
    ak_tmplahir: 'Tempat Lahir ',
    ak_hp: 'No. HP ',
    ak_rt: 'RT',
    ak_rw: 'RW',
    ak_kode_pos: 'Kode Pos',
    ak_alamat: 'Alamat Lengkap',
    ak_alamat_arab: 'Alamat dengan huruf Arab',
    ik_nama: 'Nama ',
    ik_nik: 'NIK ',
    ik_tmplahir: 'Tempat Lahir ',
    ik_hp: 'No. HP ',
    ik_rt: 'RT',
    ik_rw: 'RW',
    ik_kode_pos: 'Kode Pos',
    ik_alamat: 'Alamat Lengkap',
    m_pondok_nama: 'Sebutkan',
    m_pemilik: 'Pemilik/Pengasuh',
    m_hp_pemilik: 'No. HP Pemilik/Pengasuh',
    m_rt: 'RT',
    m_rw: 'RW',
    m_kode_pos: 'Kode Pos',
    m_alamat: 'Alamat',
    wali_nama: 'Nama ',
    wali_nik: 'NIK ',
    wali_tmplahir: 'Tempat Lahir ',
    wali_hp: 'No. HP ',
    wali_rt: 'RT',
    wali_rw: 'RW',
    wali_kode_pos: 'Kode Pos',
    wali_alamat: 'Alamat Lengkap',

    p_title: 'Nama Pembayaran',
    p_amount: 'Nominal (Tanpa titik)',

    nama_kelas: 'Nama Kelas',
    nama_kelas2: 'Nama Alias',
    tahun_ajaran: 'Tahun Ajaran',
    kode_wali: 'Wali Kelas',
    jurusan: 'Jurusan',
    tingkat: 'Tingkat',

}
</script>
<template>
    <FormField v-slot="{ componentField }" :name="name ?? 'input'">
        <FormItem :class="cn('relative', props.class)">
            <FormLabel v-if="!variant || variant == 'normal'">{{ autoLabel[name ?? 'Kasih name input'] }}</FormLabel>
            <FormControl>
                <!-- <Input v-if="!variant || variant == 'normal'" v-bind="componentField" /> -->
                <Input v-bind="componentField" :variant="variant" class="peer" placeholder="" :type="type" />
                <FormLabel v-if="variant == 'float' || variant == 'outline'"
                    class="absolute bg-card p-1 ms-1 duration-300 transform -translate-y-8 scale-90 top-3 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-90 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    {{ autoLabel[name ?? 'Kasih name input'] }}</FormLabel>
            </FormControl>
            <FormDescription class="text-xs ms-2">
            </FormDescription>
            <FormMessage />
        </FormItem>
    </FormField>
</template>