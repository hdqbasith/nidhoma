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
import type { Mapel } from "./types";
import dayjs from "dayjs";
import { Download, Eye, Pencil, Plus, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";

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
    },
  });
};
const selectedMapel = ref<Mapel>();
const showEdit = ref(false);
</script>
<template>
  <Card class="m-3">
    <CardHeader>
      <div class="flex flex-row gap-2">
        <a
          :href="downloadTemplate"
          target="_blank"
          download="Template Upload Soal.xlsx"
        >
          <Button variant="teal"><Download /> Download Template</Button>
        </a>
        <AcademicQuizAksiUpload @uploaded="refreshMapel()" />
      </div>
      <CardTitle> Daftar Mapel Ulangan </CardTitle>
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
            <TableHead class="w-fit">Aksi</TableHead>
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
            <TableCell class="grid grid-cols-3 gap-1 w-fit">
              <Button
                size="icon"
                variant="blue"
                @click="
                  {
                    selectedMapel = m;
                    showEdit = true;
                  }
                "
                ><Pencil
              /></Button>
              <Button size="icon" variant="red"><Trash2 /></Button>
              <Button size="icon" variant="teal"><Eye /></Button>
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
    </CardFooter>
  </Card>
</template>
