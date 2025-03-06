<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/packages/@core/ui-kit/shadcn-ui";
import dayjs from "dayjs";
import { ClipboardList, Download, Eye, Pencil, Plus, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Mapel } from "../quiz/types";

const props = defineProps<{
  date_start?: string;
  date_end?: string;
}>();
const client = useSanctumClient();
const mapel = ref<Mapel[]>();
const refreshMapel = () =>
  client<Mapel[]>("ulangan/mapel", {
    method: "get",
    query: {
      date_start: props.date_start ?? null,
      date_end: props.date_end ?? null,
    },
    onResponse({ response }) {
      mapel.value = response._data;
    },
  });
const downloadTemplate = URL.createObjectURL(
  await client("/download/template-ulangan")
);
onMounted(() => {
  refreshMapel();
});
const hapusSoal = (kode: string) => {
  client("ulangan/hapus-soal", {
    method: "delete",
    body: {
      mt_kode: kode,
    },
    onResponse({ response }) {
      toast.success("Data sudah dihapus!");
      refreshMapel();
    },
  });
};
const selectedMapel = ref<Mapel>();
const showEdit = ref(false);
const showConfirm = ref(false);
const confirmAction = (e: any) => {
  switch (e) {
    case "close":
      showConfirm.value = false;
      break;
    case "hapus":
      hapusSoal(selectedMapel.value?.mt_kode!);
      break;

    default:
      showConfirm.value = false;
      break;
  }
};
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle> Daftar Mapel Ujian Madrasah </CardTitle>
      <CardDescription> </CardDescription>
    </CardHeader>
    <CardContent>
      <slot name="content"></slot>
      <Table>
        <TableHeader class="">
          <TableRow>
            <TableHead class="w-fit">No.</TableHead>
            <TableHead>Mapel</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Durasi</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(m, i) in mapel">
            <TableCell>
              {{ i + 1 }}
            </TableCell>
            <TableCell>
              {{ m.mt_pelajaran }}
            </TableCell>
            <TableCell>
              {{ m.mt_kelas }}
            </TableCell>
            <TableCell>
              {{ dayjs(m.mt_date).format("DD-MM-YYYY") }}
            </TableCell>
            <TableCell>
              {{ m.mt_durasi }}
            </TableCell>
            <TableCell>
              {{ m.mt_token }}
            </TableCell>
            <TableCell class="grid grid-cols-4 gap-1 w-fit">
              <NuxtLink :to="'/teacher/rekap-um?mapel='+m.mt_kode">
                <Button size="icon" variant="yellow"><ClipboardList /></Button>
              </NuxtLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <AcademicQuizAksiEdit
        :show="showEdit"
        :mapel="selectedMapel"
        @edited="
          {
            showEdit = false;
            $event == 'success' ? refreshMapel() : '';
          }
        "
      />
      <slot name="footer"></slot>
      <FormConfirmation
        :open="showConfirm"
        @action="confirmAction"
      ></FormConfirmation>
    </CardFooter>
  </Card>
</template>
