<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/packages/@core/ui-kit/shadcn-ui";

const [UseTemplate, GridForm] = createReusableTemplate();
const crStore = useClassroomStore();

const formSchema = toTypedSchema(
  z.object({
    id: z.string().nullish(),
    nama_kelas: z.string().nullish(),
    nama_kelas2: z.string().nullish(),
    tahun_ajaran: z.string().nullish(),
    kode_wali: z.string().nullish(),
    jurusan: z.number().nullish(),
    tingkat: z.string().nullish(),
  })
);
const { handleSubmit, resetForm, values } = useForm({
  validationSchema: formSchema,
  initialValues: crStore.values,
  keepValuesOnUnmount: true,
});

watch(
  () => crStore.values,
  (newValue, oldValue) => {
    if (newValue) {
      resetForm({ values: newValue });
    }
  }
);
const disabled = ref(false);
const kirim = handleSubmit(async () => {
  disabled.value = true;
  crStore.values = values as classroom;
  toast.promise(crStore.editClassroom(), {
    loading: "menyimpan...",
    success: () => "berhasil",
    error: () => "gagal",
    duration: 1000,
    finally: () => {
      disabled.value = false;
      crStore.showModalEdit = false;
    },
  });
});
</script>
<template>
  <div>
    <UseTemplate>
      <form @submit.prevent="kirim()">
        <FormInputText name="nama_kelas" />
        <FormInputText name="nama_kelas2" />
        <FormInputText name="kode_wali" />
        <FormInputText name="jurusan" />
        <FormInputText name="tingkat" />
        <DialogFooter class="flex flex-row mt-3">
          <Button @click="kirim()" variant="outline" class="text-red-700"
            >Batal</Button
          >
          <Button type="submit" :disabled="disabled"> Simpan </Button>
        </DialogFooter>
      </form>
    </UseTemplate>
    <Dialog v-model:open="crStore.showModalEdit">
      <DialogScrollContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Kelas</DialogTitle>
          <DialogDescription>
            <GridForm />
            <!-- Make changes to your profile here. Click save when you're done. -->
          </DialogDescription>
        </DialogHeader>
      </DialogScrollContent>
    </Dialog>
  </div>
</template>
<style></style>
