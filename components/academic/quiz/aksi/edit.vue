<script setup lang="ts">
import { toast } from "vue-sonner";
import {
  Button,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import { h } from "vue";
import * as z from "zod";
import type { labels } from "~/components/table/data/data";
import { AutoForm } from "~/packages/@core/ui-kit/shadcn-ui/ui/auto-form";

import type { Mapel } from "../types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import dayjs from "dayjs";
const props = defineProps<{
  mapel: Mapel | undefined;
  show: boolean;
}>();
const editUlangan = ref(false);
const emit = defineEmits(["edited"]);

const schema = z.object({
  mt_kode: z.string().default(() => props.mapel?.mt_kode!),
  mt_pelajaran: z
    .string({
      required_error: "Isi nama Mapel",
    })
    .default(() => props.mapel?.mt_pelajaran!),
  mt_kelas: z
    .string({
      required_error: "Isi nama Mapel",
    })
    .max(15, {
      message: "maksimal 15 karakter",
    })
    .optional()
    .default(() => props.mapel?.mt_kelas!),
  mt_durasi: z
    .number({
      required_error: "Ulangan berapa menit?",
    })
    .default(() => props.mapel?.mt_durasi ?? 0),
  mt_token: z.coerce
    .string({
      required_error: "Isi token",
    })
    .min(5, {
      message: "Token minimal 5 huruf",
    })
    .max(8, {
      message: "Token maksimal 8 huruf",
    })
    .default(() => props.mapel?.mt_token!),
  mt_date: z.coerce
    .string({
      required_error: "Tanggal harus diisi",
      description: "Format: DD/MM/YYYY",
    })
    .default(() => dayjs(props.mapel?.mt_date).format("DD-MM-YYYY")),
});
const mapel = ref();
function onSubmit(values: Mapel) {
  mapel.value = values;
  values.mt_date = values.mt_date.split("-").reverse().join("-");
  const client = useSanctumClient();
  client("ulangan/edit-mapel", {
    method: "patch",
    body: values,
    onResponse({ response }) {
      if (response._data == "success") {
        toast.success("Perubahan sudah disimpan");
        emit("edited", "success");
      }
    },
    onResponseError({ error }) {
      toast.error(error?.message as string);
    },
  });
}
</script>

<template>
  <Dialog v-bind:open="show" v-on:update:open="emit('edited', true)">
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>Edit Ulangan</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <AutoForm
        class="space-y-3"
        :schema="schema"
        :field-config="{
          mt_kode: {
            hideLabel: true,
            inputProps: {
              disabled: true,
              class: 'hidden',
            },
          },
          mt_durasi: {
            label: 'Durasi Pengerjaan',
            description: 'dalam menit',
          },
          mt_pelajaran: {
            label: 'Nama Mapel',
          },
          mt_kelas: {
            label: 'Kelas',
          },
          mt_token: {
            label: 'Token',
            description: '5-8 huruf',
          },
          mt_date: {
            label: 'Tanggal Pelaksanaan',
          },
        }"
        @submit="onSubmit"
      >
        <Button variant="red" @click.prevent="emit('edited', true)" class="me-2"
          >Batal</Button
        >
        <Button type="submit" variant="blue"> Simpan </Button>
      </AutoForm>
      <DialogFooter class="mt-2 flex flex-row"> </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
<style>
label {
  font-weight: bold;
  color: teal;
}
</style>
