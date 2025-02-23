<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
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
} from "~/packages/@core/ui-kit/shadcn-ui";
const props=defineProps<{
  open:boolean
}>()
const emit=defineEmits(['action'])
</script>
<template>
  <AlertDialog @update:open="emit('action','close')" v-bind:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
        <AlertDialogDescription>
          Data yang sudah dihapus tidak bisa dikembalikan. Pastikan Anda tidak akan menyesal!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('action','close')" >
          Batal
        </AlertDialogCancel>
        <AlertDialogAction @click="emit('action','hapus')">
          Ya
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
