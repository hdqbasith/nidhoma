<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { PlusCircle } from "lucide-vue-next";
import { z } from "zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "~/packages/@core/ui-kit/shadcn-ui";

const formSchema = toTypedSchema(z.object({
  mt_kode: z.string().nullish(),
  mt_guru: z.string().nullish(),
  mt_pelajaran: z.string().nullish(),
  mt_kelas: z.string().nullish(),
  mt_token: z.string().nullish(),
  mt_durasi: z.string().nullish(),
  mt_date: z.string().nullish(),
}))
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        <PlusCircle></PlusCircle>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Ulangan Baru</DialogTitle>
        <DialogDescription>
          
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input id="name" default-value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Username </Label>
          <Input id="username" default-value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Simpan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
