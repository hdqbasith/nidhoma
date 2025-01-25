<script lang="ts" setup>
import { LayoutDashboard } from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter, Button } from '~/packages/@core/ui-kit/shadcn-ui';


const data = [
    {
        icon: LayoutDashboard,
        name: 'Data Pribadi',
        path: '/applicant/formulir-ppdb',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Ayah Kandung',
        path: '/applicant/formulir-ppdb',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Ibu Kandung',
        path: '/applicant/formulir-ppdb?data=ibu',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Wali (Yang membiayai pendidikan)',
        path: '/applicant/formulir-ppdb?data=wali',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Domisili (Tempat Tinggal)',
        path: '/applicant/formulir-ppdb?data=domisili',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Sekolah Asal',
        path: '/applicant/formulir-ppdb?data=asalsekolah',
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
                <h2 class="text-2xl">Selamat Datang di Nidhoma</h2>
            </CardTitle>
            <CardDescription>
                Sistem informasi dan administrasi MA NU TBS Kudus
            </CardDescription>
        </CardHeader>
        <CardContent>
            Nidhoma adalah aplikasi web yang dikembangkan oleh MA NU TBS Kudus dalam rangka memudahkan proses pengumpulan dan pengolahan data. Sebelum Anda bisa mengakses fitur-fitur yang tersedia, silakan lengkapi formulir pendaftaran siswa baru berikut ini.
            <NuxtLink to="/applicant/formulir-ppdb" class="flex mt-5">
                <Button>
                    Formulir PPDB
                </Button>
            </NuxtLink>
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
</template>
