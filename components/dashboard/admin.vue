<script setup lang="ts">
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
// import { Icon } from '@iconify/vue/dist/iconify.js';
import { User, User2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
// import type { LinkProp } from '~/components/menu/Side.vue';
// import { cn } from '@/lib/utils';

definePageMeta({
    // title:"Applicant",
    // name:"Applicant",
    middleware: "sanctum:verified"
})

const to = computed(() => {
    return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf('/'));
});
const client = useSanctumClient();
const data = ref();
client<any>(
    'admin/summary',
    {
        method: "get",
        onResponse({ response }) {
            if (response.status != 200) {
                toast.error('gagal mengambil data')
            } else {
                data.value = response._data
            }
        }
    })
</script>

<template>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 m-5 gap-5">
        <!-- <Card>
            <CardHeader variant="green">
                <CardTitle>Calon Siswa dari TBS</CardTitle>
            </CardHeader>
            <div class="flex flex-row -mt-3">
        <NavigationApp to="applicants?dari=dalam" label="Pendaftar Dalam" :size="10">
          <User class="text-green-700" />
        </NavigationApp>
        <NavigationApp to="applicants?dari=luar" label="Pendaftar Luar" :size="10">
          <User2 />
        </NavigationApp>
      </div>
            <CardContent class="grid grid-cols-3 w-full gap-0 text-xs">
                <div class="col-span-2">Pendaftar Belum Valid</div>
                <div>: {{ data?.daritbs }}</div>
                <div class="col-span-2">Pendaftar Valid</div>
                <div>: {{ data?.daritbsValid }}</div>
                <div class="col-span-2 border-black dark:border-white border-t mt-1 pt-1">Total</div>
                <div class="border-black dark:border-white border-t mt-1 pt-1">: {{ data?.daritbs + data?.daritbsValid
                    }}
                </div>
            </CardContent>
            <CardFooter class="justify-end p-1">
                <NuxtLink to="/admin/applicants?dari=dalam" class="w-fit">
                    <Button variant="default">Selengkapnya...</Button>
                </NuxtLink>
            </CardFooter>
        </Card> -->
        <Card>
            <CardHeader variant="sky">
                <CardTitle class="">Calon Siswa dari Luar TBS</CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-3 w-full gap-0 text-xs">
                <div class="col-span-2">Pendaftar Belum Valid</div>
                <div>: {{ data?.dariluar }}</div>
                <div class="col-span-2">Pendaftar Valid</div>
                <div>: {{ data?.dariluarValid }}</div>
                <div class="col-span-2 border-black dark:border-white border-t mt-1 pt-1">Total</div>
                <div class="border-black dark:border-white border-t mt-1 pt-1">: {{ data?.dariluar + data?.dariluarValid
                    }}
                </div>
            </CardContent>
            <CardFooter class="justify-end">
                <NuxtLink to="/admin/applicants?dari=luar" class="w-fit">
                    <Button variant="default">Selengkapnya...</Button>
                </NuxtLink>
            </CardFooter>
        </Card>
        <!-- <Card>
            <CardHeader variant="sky">
                <CardTitle class="">Pembayaran</CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-3 w-full gap-0 text-xs">
                <div class="col-span-2">Jumlah uang diterima</div>
                <div>: Rp. 30.000.000,-</div>
                <div class="col-span-2">Cicilan belum lunas</div>
                <div>: Rp. 3.000.000,-</div>
                <div class="col-span-2 border-black dark:border-white border-t mt-1 pt-1">Total</div>
                <div class="border-black dark:border-white border-t mt-1 pt-1">: Rp. 33.000.000,-</div>
            </CardContent>
            <CardFooter class="flex flex-row justify-end">
                <NuxtLink class="w-fit">
                    <Button variant="default">Detail</Button>
                </NuxtLink>
                <NuxtLink to="/admin/payments" class="w-fit">
                    <Button variant="default">New</Button>
                </NuxtLink>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader variant="sky">
                <CardTitle class="">Kesiswaan</CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-3 w-full gap-0 text-xs">
                <div class="col-span-2">Jumlah siswa</div>
                <div>: 500</div>
                <div class="col-span-2">Jumlah Kelas</div>
                <div>: 45</div>
            </CardContent>
            <CardFooter class="flex flex-row justify-end">
                <NuxtLink to="/admin/classroom" class="w-fit">
                    <Button variant="default">Kelas</Button>
                </NuxtLink>
                <NuxtLink to="/admin/students" class="w-fit">
                    <Button variant="default">Siswa</Button>
                </NuxtLink>
            </CardFooter>
        </Card> -->
        <!-- <NuxtLink to="experiment" class="w-fit"><Button>Experiment</Button></NuxtLink>
        <NuxtLink to="migrasi" class="w-fit"><Button>Migrasi</Button></NuxtLink> -->
    </div>
</template>
