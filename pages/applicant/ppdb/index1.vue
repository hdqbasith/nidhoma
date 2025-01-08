<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';

definePageMeta({
    title:"menu.ppdb.ppdb",
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
            <!-- <MenuDashboard :list="list" /> -->
            <div>
                Kelengkapan data: 0%.
                <br>Silakan lengkapi formulir pendaftaran untuk membuka semua menu yang ada
            </div>
        </CardContent>

    </Card>
</template>