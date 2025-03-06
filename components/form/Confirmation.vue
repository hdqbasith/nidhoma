<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input,
} from "~/packages/@core/ui-kit/shadcn-ui";
const props=defineProps<{
  open:boolean
}>()
const password=ref()
const emit=defineEmits(['action'])
const confirm=()=>{
  if(password.value=="iya"){
    emit('action','hapus')
  }else{
    toast.error("Password keliru!!!")
  }
}
</script>
<template>
  <AlertDialog @update:open="emit('action','close')" v-bind:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
        <AlertDialogDescription>
          Data yang sudah dihapus tidak bisa dikembalikan. Pastikan Anda tidak akan menyesal! Masukkan password untuk menghapus:
          <div>
            <Input v-model:model-value="password" />
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('action','close')" >
          Batal
        </AlertDialogCancel>
        <AlertDialogAction @click="confirm()">
          Ya
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
