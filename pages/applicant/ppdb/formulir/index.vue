<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { LayoutDashboard } from 'lucide-vue-next';

const data = [
    {
        icon: LayoutDashboard,
        name: 'Data Pribadi',
        path: '/applicant/ppdb/formulir/pribadi',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Ayah Kandung',
        path: '/applicant/ppdb/formulir/ayah',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Ibu Kandung',
        path: '/applicant/ppdb/formulir/ibu',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Wali (Yang membiayai pendidikan)',
        path: '/applicant/ppdb/formulir/wali',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Domisili (Tempat Tinggal)',
        path: '/applicant/ppdb/formulir/domisili',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Sekolah Asal',
        path: '/applicant/ppdb/formulir/asalsekolah',
        active: true
    }
]
const list = computed(() => {
    return data.filter((d) => d.active == true)
})
</script>
<template>
    <Card>
        <CardHeader>
            <CardTitle>
                Formulir Pendaftaran Peserta Didik Baru
            </CardTitle>
            <CardDescription>
                Isilah semua formulir berikut dengan lengkap sesuai dokumen yang Anda miliki (Ijazah, akta, kk)
            </CardDescription>
        </CardHeader>
        <CardContent>
            <MenuDashboard :list="list" />
        </CardContent>

    </Card>
</template>