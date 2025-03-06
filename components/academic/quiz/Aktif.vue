<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/packages/@core/ui-kit/shadcn-ui";
import type { Mapel } from "./types";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { usePreferences } from "~/packages/preferences";
const { isDark } = usePreferences();

const date_start = ref();
const date_end = ref();
const client = useSanctumClient();
const mapel = ref<
  {
    key: string;
    value: string;
  }[]
>([]);
const refreshMapel = () =>
  client<Mapel[]>("ulangan/mapel", {
    method: "get",
    query: {
      date_start: date_start.value,
      date_end: date_end.value,
    },
    onResponse({ response }) {
      const data = <Mapel[]>response._data;
      if (data) {
        mapel.value = [];
        data.forEach((d) => {
          mapel.value.push({
            key: d.mt_kode,
            value: d.mt_pelajaran,
          });
        });
      }
    },
  });
const mapelAktif = ref();
const setMapelAktif = (m: string) => {
  client("ulangan/start-um", {
    method: "post",
    body: {
      mapel: m,
    },
    onResponse({ response }) {
      mapelAktif.value = response._data;
    },
  });
};
refreshMapel();
client("ulangan/start-um", {
  method: "get",
  onResponse({ response }) {
    if (response._data) {
      mapelAktif.value = response._data;
    } else {
      mapelAktif.value = "TIDAK ADA";
    }
  },
});
</script>
<template>
  <Card class="m-2 min-h-svh">
    <CardHeader>
      <CardTitle>Ujian Madrasah</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="my-3">Mapel ujian yang sedang aktif :</p>
      <div class="text-3xl text-teal-500 font-bold">
        {{ mapelAktif ?? "TIDAK ADA" }}
      </div>
      <p class="my-3">
        Pilih salah satu mapel berikut untuk mengaktifkan mapel ujian madrasah:
      </p>
      <Select @update:model-value="setMapelAktif">
        <SelectTrigger>
          <SelectValue placeholder="Pilih Mapel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="m in mapel" :value="m.key">{{
              m.value
            }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="flex flex-col my-3 gap-y-3">
        <p>Tanggal ujian:</p>
        <VueDatePicker
          type="date"
          v-model="date_start"
          @update:model-value="refreshMapel()"
          auto-apply
          :enable-time-picker="false"
          model-type="yyyy-MM-dd"
          format="dd-MM-yyyy"
          placeholder="Mulai"
          :dark="isDark"
        />
        <VueDatePicker
          type="date"
          v-model="date_end"
          @update:model-value="refreshMapel()"
          auto-apply
          :enable-time-picker="false"
          model-type="yyyy-MM-dd"
          format="dd-MM-yyyy"
          placeholder="Selesai"
          :dark="isDark"
        />
      </div>
    </CardContent>
    <CardFooter>
      <ol class="list-disc mt-5">
        Catatan:
        <li>Jangan lupa mengaktifkan mapel ujian sebelum ujian dimulai</li>
        <li>Ganti tanggal untuk melihat daftar mapel yang lain</li>
      </ol>
    </CardFooter>
  </Card>
</template>
