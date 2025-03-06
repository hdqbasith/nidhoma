<script setup lang="ts">
import DataTable from "~/components/ui/DataTable/DataTable.vue";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  TableCell,
  TableHead,
} from "~/packages/@core/ui-kit/shadcn-ui";
import { columnsMonitor } from "./table/columnsMonitor";
import { rand } from "@vueuse/core";
import { toast } from "vue-sonner";
import { FormConfirmation } from "#components";
import { KeyRound, KeySquare, LockKeyhole, RefreshCcw, RefreshCcwDot, Trash2 } from "lucide-vue-next";

const client = useSanctumClient();
const data = ref([]);
const mapel = ref();
const refresh = () =>
  client("/ulangan/monitor-um", {
    method: "get",
    onResponse({ response }) {
      data.value = response._data.peserta;
      mapel.value = response._data.mapel;
    },
  });
refresh();
const selected = ref();
const clearSelected = ref(false);
const showConfirm = ref(false);
const aksi = (e: string) => {
  if (e == "lock" || e == "unlock") {
    client("/ulangan/unlock", {
      method: "post",
      body: {
        akun: selected.value,
        aksi: e,
      },
      onResponse() {
        refresh();
        toast.success("Akun berhasil " + (e == "lock" ? "dikunci" : "dibuka"));
      },
    });
  } else if (e == "resetJawaban") {
    client("/ulangan/reset-jawaban", {
      method: "post",
      body: {
        akun: selected.value,
      },
      onResponse() {
        refresh();
        toast.success("Jawaban sudah direset.");
      },
    });
  } else if (e == "hapusJawaban") {
    showConfirm.value = false;
    client("/ulangan/hapus-jawaban", {
      method: "delete",
      body: {
        akun: selected.value,
      },
      onResponse() {
        refresh();
        toast.success("Jawaban sudah dihapus!");
      },
    });
  }else if (e == "resetPassword") {
    showConfirm.value = false;
    client("/admin/reset-password", {
      method: "post",
      body: {
        akun: selected.value,
      },
      onResponse() {
        refresh();
        toast.success("Password sudah direset (nidhoma24)");
      },
    });
  }
};
const uniqueFilter = ref();
</script>
<template>
  <Card class="m-3">
    <CardHeader>
      <Button variant="teal" @click="refresh().finally(()=>toast.success('Sudah direfresh'))" class="absolute right-9"><RefreshCcwDot :size="15"/>&nbsp;Refresh Data</Button>
      <CardTitle>Monitor Ujian Madrasah</CardTitle>
      <CardDescription
        >Mapel Aktif:
        <NuxtLink to="/admin/ulangan/um" class="font-bold text-blue-500">{{
          mapel
        }}</NuxtLink></CardDescription
      >
    </CardHeader>
    <CardContent>
      <DataTable
        :columns="columnsMonitor"
        :data="data"
        :selection="true"
        @selected="
          {
            selected = $event;
            clearSelected = false;
          }
        "
        :clear-selection="clearSelected"
      />
    </CardContent>
    <CardFooter class="flex flex-col gap-y-3 items-start">
      <Button
        @click="aksi('lock')"
        variant="black"
        :disabled="!selected || selected.length == 0"
        ><LockKeyhole :size="15" /> &nbsp;Kunci</Button
      >
      <Button
        @click="aksi('unlock')"
        variant="teal"
        :disabled="!selected || selected.length == 0"
        ><KeyRound :size="15" /> &nbsp;Buka Kunci</Button
      >
      <Button
        @click="aksi('resetJawaban')"
        variant="yellow"
        :disabled="!selected || selected.length == 0"
        ><RefreshCcw :size="15" /> &nbsp;Reset Jawaban</Button
      >
      <Button
        @click="showConfirm = true"
        variant="red"
        :disabled="!selected || selected.length == 0"
        ><Trash2 :size="15" /> &nbsp;Hapus Jawaban</Button
      >
      <Button
        @click="aksi('resetPassword')"
        variant="red"
        :disabled="!selected || selected.length == 0"
        ><KeySquare :size="15" /> &nbsp;Reset Password Login</Button
      >
    </CardFooter>
    <FormConfirmation
      :open="showConfirm"
      @action="
        {
          $event == 'hapus' ? aksi('hapusJawaban') : (showConfirm = false);
        }
      "
    />
  </Card>
</template>
