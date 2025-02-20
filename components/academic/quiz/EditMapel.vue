<script setup lang="ts">
import { h } from "vue";
import { toast } from "vue-sonner";
import * as z from "zod";
import type { labels } from "~/components/table/data/data";
import { Button } from "~/packages/@core/ui-kit/shadcn-ui";
import { AutoForm } from "~/packages/@core/ui-kit/shadcn-ui/ui/auto-form";

const schema = z.object({
  mapel: z.string({
    required_error: "Isi nama Mapel",
  }),

  token: z.coerce
    .string({
      required_error: "Isi token",
    })
    .min(5, {
      message: "Token minimal 5 huruf",
    })
    .max(8, {
      message: "Token maksimal 8 huruf",
    }),

  tanggal: z.coerce.date().optional(),
});

function onSubmit(values: Record<string, any>) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="{
      mapel: {
        label: 'Nama Mapel',
      },
      token: {
        label:'Token',
        description: '5-8 huruf',
      },
      tanggal: {
        label:'Tanggal',
        description: 'Pilih tanggal pelaksanaan',
      },
    }"
    @submit="onSubmit"
  >
    <Button type="submit"> Simpan </Button>
  </AutoForm>
</template>
