<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/packages/@core/ui-kit/shadcn-ui';
import { cn } from '~/packages/utils';
type list = {
    key: string
    value: string
}
const props = defineProps<{
    class?: HTMLAttributes['class']
    name?: string,
    label?: string,
    placeholder?: string,
    variant?: 'normal' | 'float' | 'outline',
    list?: list[] |undefined
}>()

const floatClass = computed(() => {
    if (!props.variant || props.variant == 'normal') {
        return 'flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    } else if (props.variant == 'float') {
        return 'py-2.5 px-2.5 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600'
    } else if (props.variant == 'outline') {
        return 'px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border border-gray-500 peer'
    }
})

const autoLabel = <Record<string, string>>{

    s_jml_saudara: 'Jumlah Saudara',
    s_hobi: 'Hobi',
    s_citacita: 'Cita-Cita',
    as_propinsi: 'Provinsi',
    as_kabupaten: 'Kabupaten',
    ak_pendidikan: 'Pendidikan ',
    ak_pekerjaan: 'Pekerjaan',
    ak_penghasilan: 'Penghasilan',
    ak_propinsi: 'Provinsi',
    ak_kabupaten: 'Kabupaten',
    ak_kecamatan: 'Kecamatan',
    ak_kelurahan: 'Desa/Kelurahan',
    ak_status: 'Status ',
    ak_status_rumah: 'Status Rumah',
    ik_status: 'Status ',
    ik_pendidikan: 'Pendidikan ',
    ik_pekerjaan: 'Pekerjaan',
    ik_penghasilan: 'Penghasilan',
    ik_tpt_tinggal: 'Tempat Tinggal',
    ik_propinsi: 'Provinsi',
    ik_kabupaten: 'Kabupaten',
    ik_kecamatan: 'Kecamatan',
    ik_kelurahan: 'Desa/Kelurahan',
    ik_status_rumah: 'Status Rumah',
    m_tmp_tinggal: 'Tempat Tinggal',
    m_pondok_kode: 'Nama Pondok',
    m_kabupaten: 'Kabupaten',
    m_kecamatan: 'Kecamatan',
    m_kelurahan: 'Desa/Kelurahan',
    m_jarak: 'Jarak Ke Madrasah',
    m_transport: 'Transportasi ke Madrasah',
    wali_hubungan: 'Hubungan',
    wali_pendidikan: 'Pendidikan ',
    wali_pekerjaan: 'Pekerjaan',
    wali_penghasilan: 'Penghasilan',
    wali_tpt_tinggal: 'Tempat Tinggal',
    wali_propinsi: 'Provinsi',
    wali_kabupaten: 'Kabupaten',
    wali_kecamatan: 'Kecamatan',
    wali_kelurahan: 'Desa/Kelurahan',
    wali_status_rumah: 'Status Rumah',
    p_instalment: 'Boleh dicicil?',
}
</script>

<template>
    <FormField v-slot="{ componentField }" :name="name ?? 'select'">
        <FormItem :class="cn('w-full relative', props.class)">
            <FormLabel v-if="!variant || variant == 'normal'">{{ autoLabel[name ?? 'Kasih name input'] }}</FormLabel>
            <Select v-bind="componentField">
                <FormControl>
                    <SelectTrigger :class="floatClass">
                        <SelectValue :placeholder="placeholder" />
                    </SelectTrigger>
                </FormControl>
                <FormLabel v-if="variant == 'float' || variant == 'outline'"
                    class="absolute bg-card p-1 ms-1 duration-300 transform -translate-y-8 scale-90 top-3 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-90 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    {{ autoLabel[name ?? 'Kasih name input'] }}</FormLabel>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="l in list" :value="l.key">
                            {{ l.value }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <FormDescription>
            </FormDescription>
            <FormMessage />
        </FormItem>
    </FormField>
</template>

<style>
html body {
    overflow: auto !important;
}
</style>