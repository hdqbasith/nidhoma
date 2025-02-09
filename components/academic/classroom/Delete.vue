<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogScrollContent,
} from "~/packages/@core/ui-kit/shadcn-ui";

const crStore = useClassroomStore();
</script>
<template>
  <Dialog v-model:open="crStore.showModalHapus">
    <DialogScrollContent >
      <DialogHeader>
        <DialogTitle> Hapus Kelas </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div>
        Apakah Anda yakin? Kelas yang sudah dihapus tidak bisa dikembalikan!
      </div>
      <DialogFooter class="flex flex-row">
        <Button @click="crStore.showModalHapus = false" variant="destructive">Tidak</Button>
        <Button @click="crStore.deleteClassroom()">Ya</Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>

  <!-- <Dialog v-model:open="crStore.showModalHapus">
      <DialogScrollContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Kelas</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
      </DialogScrollContent>
    </Dialog> -->
</template>
