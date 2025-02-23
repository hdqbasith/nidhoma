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
import type { Mapel } from "../quiz/types";
import dayjs from "dayjs";
import { ArrowRightSquare, ArrowRightSquareIcon, Download, Eye, Pencil, Plus, Trash2 } from "lucide-vue-next";
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
onMounted(() => {
  refreshMapel();
});
const selectedMapel = ref<Mapel>();
</script>
<template>
  <Card class="m-3">
    <CardHeader>
      <CardTitle> Daftar Mapel Ujian </CardTitle>
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
            <TableCell class="grid grid-cols-3 gap-1 w-fit">
              <NuxtLink :to="'/student/soal-um?mapel='+m.mt_kode">
                <Button size="icon" variant="teal"><ArrowRightSquare /></Button>
              </NuxtLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>
</template>
