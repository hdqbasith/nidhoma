<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { PlusCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

definePageMeta({
    middleware: ["auth", 'role-admin'],
});
const to = computed(() => {
    return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf('/'));
});
const crStore = useClassroomStore()
const meta = useMetaStore();
crStore.refresh()
const action = (a: string) => {
    switch (a) {
        case 'new10':
            crStore.values = {
                id: null,
                kode_wali: null,
                nama_kelas: 'X',
                jurusan: 0,
                nama_kelas2: '10',
                tahun_ajaran: meta.data?.tahun_ajaran ?? '',
                tingkat: '10',
            };
            crStore.addClassroom();
            break;
        case 'new11':
            crStore.values = {
                id: null,
                kode_wali: null,
                nama_kelas: 'XI',
                jurusan: 0,
                nama_kelas2: '11',
                tahun_ajaran: meta.data?.tahun_ajaran ?? '',
                tingkat: '11',
            };
            crStore.addClassroom();
            break;
        case 'new12':
            crStore.values = {
                id: null,
                kode_wali: null,
                nama_kelas: 'XII',
                jurusan: 0,
                nama_kelas2: '12',
                tahun_ajaran: meta.data?.tahun_ajaran ?? '',
                tingkat: '12',
            };
            crStore.addClassroom();
            break;
        case 'editKelas':
            crStore.showModalEdit = true;
            break;
        case 'hapusKelas':
            crStore.showModalHapus = true;
            break;
        case 'importSiswa':
            crStore.showModalImport=true;
            break;
        default:
            break;
    }
}

</script>
<template>
    <div>
        <div>
            Daftar Kelas tahun ajaran {{ meta.data?.tahun_ajaran }}
        </div>
        <AcademicClassroomEdit />
        <AcademicClassroomImport/>
        <AcademicClassroomDelete />
        <div class="sm:grid sm:grid-cols-3 sm:gap-x-3 mx-3">
            <Card>
                <CardHeader variant="red" class="block relative">
                    <CardTitle>
                        Kelas X
                    </CardTitle>
                    <AcademicClassroomMenu :item="crStore.menu10" @action="(a) => action(a)" />
                </CardHeader>
                <CardContent>
                    <div>
                        <div v-for="i in crStore.data?.filter(a => a.tingkat == '10')"
                            class="border rounded-sm mt-1 w-full border-gray-300 p-3">
                            <div class="block relative">
                                <h3 class="text-xl">{{
                                    i.nama_kelas }}</h3>
                                <AcademicClassroomMenu :item="crStore.menuPerKelas"
                                    @action="(a) => { crStore.values = i; action(a) }" />
                                <!-- <div class="float-right flex flex-row gap-2 items-center hover:cursor-pointer ">
                                    <Icon icon="mdi:eye" :height="24" class="m-1" />
                                    <Icon icon="mdi:pencil" :height="24" />
                                    <Icon icon="mdi:trash" :height="24" />
                                </div> -->
                            </div>
                            <div class="text-xs w-full">
                                <br>Jumlah siswa: <span>-kosong-</span>
                                <br>Wali Kelas: <span>-kosong-</span>
                                <br>Jurusan: <span>-kosong-</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
            <Card>
                <CardHeader variant="yellow" class="block relative">
                    <CardTitle>Kelas XI</CardTitle>
                    <AcademicClassroomMenu :item="crStore.menu11" @action="(a) => action(a)" />
                </CardHeader>
                <CardContent>
                    <div>
                        <div v-for="i in crStore.data?.filter(a => a.tingkat == '11')"
                            class="border rounded-sm mt-1 w-full border-gray-300 p-3">
                            <div class="block relative">
                                <h3 class="text-xl">{{
                                    i.nama_kelas }}</h3>
                                <AcademicClassroomMenu :item="crStore.menuPerKelas"
                                    @action="(a) => { crStore.values = i; action(a) }" />
                                <!-- <div class="float-right flex flex-row gap-2 items-center hover:cursor-pointer ">
                                    <Icon icon="mdi:eye" :height="24" class="m-1" />
                                    <Icon icon="mdi:pencil" :height="24" />
                                    <Icon icon="mdi:trash" :height="24" />
                                </div> -->
                            </div>
                            <div class="text-xs w-full">
                                <br>Jumlah siswa: <span>-kosong-</span>
                                <br>Wali Kelas: <span>-kosong-</span>
                                <br>Jurusan: <span>-kosong-</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
            <Card>
                <CardHeader variant="green" class="block relative">
                    <CardTitle>Kelas XII</CardTitle>
                    <AcademicClassroomMenu :item="crStore.menu12" @action="(a) => action(a)" />
                </CardHeader>
                <CardContent>
                    <div>
                        <div v-for="i in crStore.data?.filter(a => a.tingkat == '12')"
                            class="border rounded-sm mt-1 w-full border-gray-300 p-3">
                            <div class="block relative">
                                <h3 class="text-xl">{{
                                    i.nama_kelas }}</h3>
                                <AcademicClassroomMenu :item="crStore.menuPerKelas"
                                    @action="(a) => { crStore.values = i; action(a) }" />
                                <!-- <div class="float-right flex flex-row gap-2 items-center hover:cursor-pointer ">
                                    <Icon icon="mdi:eye" :height="24" class="m-1" />
                                    <Icon icon="mdi:pencil" :height="24" />
                                    <Icon icon="mdi:trash" :height="24" />
                                </div> -->
                            </div>
                            <div class="text-xs w-full">
                                <br>Jumlah siswa: <span>-kosong-</span>
                                <br>Wali Kelas: <span>-kosong-</span>
                                <br>Jurusan: <span>-kosong-</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
        </div>
    </div>
</template>