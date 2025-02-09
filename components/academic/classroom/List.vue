<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { PlusCircle } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import type { Kelas } from ".";

const to = computed(() => {
  return useRoute().fullPath.slice(0, useRoute().fullPath.lastIndexOf("/"));
});
const crStore = useClassroomStore();
const meta = useMetaStore();
const disabled = ref(false);
const addClassroom = () => {
  toast.promise(crStore.addClassroom(), {
    loading: "menambahkan kelas...",
    success: () => "berhasil",
    error: () => "gagal",
    duration: 1000,
    finally: () => {
      disabled.value = false;
      crStore.showModalEdit = false;
    },
  });
};
const action = (a: string) => {
  disabled.value = true;
  switch (a) {
    case "new10":
      crStore.values = {
        id: null,
        kode_wali: null,
        nama_kelas: "X",
        jurusan: 0,
        nama_kelas2: "10",
        tahun_ajaran: meta.data?.tahun_ajaran ?? "",
        tingkat: "10",
      };
      addClassroom();
      break;
    case "new11":
      crStore.values = {
        id: null,
        kode_wali: null,
        nama_kelas: "XI",
        jurusan: 0,
        nama_kelas2: "11",
        tahun_ajaran: meta.data?.tahun_ajaran ?? "",
        tingkat: "11",
      };
      addClassroom();
      break;
    case "new12":
      crStore.values = {
        id: null,
        kode_wali: null,
        nama_kelas: "XII",
        jurusan: 0,
        nama_kelas2: "12",
        tahun_ajaran: meta.data?.tahun_ajaran ?? "",
        tingkat: "12",
      };
      addClassroom();
      break;
    case "editKelas":
      crStore.showModalEdit = true;
      break;
    case "hapusKelas":
      crStore.showModalHapus = true;
      break;
    case "importSiswa":
      crStore.showModalImport = true;
      break;
    default:
      break;
  }
};
const listKelas = ref({
  kelas10: computed(() => crStore.data?.filter((k) => k.tingkat == "10")),
  kelas11: computed(() => crStore.data?.filter((k) => k.tingkat == "11")),
  kelas12: computed(() => crStore.data?.filter((k) => k.tingkat == "12")),
});
await crStore.refresh();
const edit = (e: classroom) => {
  crStore.values = e;
  action("editKelas");
};
const hapus = (e: classroom) => {
  crStore.values = e;
  action("hapusKelas");
};
</script>
<template>
  <div>
    <div class="float-right italic text-xs font-bold">
      TA {{ meta.data?.tahun_ajaran }}
    </div>
    <AcademicClassroomEdit />
    <AcademicClassroomImport />
    <AcademicClassroomDelete />
    <Card
      v-for="(k, i) in listKelas"
      :key="'class' + i"
      class="bg-transparent mt-5"
    >
      <CardHeader class="p-0 flex flex-row">
        <CardTitle class="text-2xl"
          >{{ i.replace("s", "s ").replace("k", "K") }}
        </CardTitle>
        <Button
          @click="action('new' + i.replace('kelas', ''))"
          class="text-blue-600"
          variant="ghost"
          size="xs"
        >
          <PlusCircle></PlusCircle>
        </Button>
      </CardHeader>
      <CardContent class="p-0">
        <AcademicClassroomPart :data="k!" @edit="edit" @hapus="hapus" />
      </CardContent>
    </Card>
  </div>
</template>
