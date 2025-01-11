<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { LayoutDashboard } from 'lucide-vue-next';

const data = [
    {
        icon: LayoutDashboard,
        name: 'Informasi Umum PPDB',
        path: '/applicant/ppdb/info',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Formulir Pendaftaran',
        path: '/applicant/ppdb/formulir',
        active: true
    },
    {
        icon: LayoutDashboard,
        name: 'Data Table',
        path: '/applicant/ppdb/datatable',
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
                Selamat Datang di Nidhoma
            </CardTitle>
            <CardDescription>
                Pusat Data MA NU TBS Kudus
            </CardDescription>
        </CardHeader>
        <CardContent>
            <MenuDashboard :list="list" />
            <div>
                Kelengkapan data: 0%.
                <br>Silakan lengkapi formulir pendaftaran untuk membuka semua menu yang ada
            </div>
        </CardContent>

    </Card>
</template>