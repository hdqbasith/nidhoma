<script setup lang='ts'>
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/packages/@core/ui-kit/shadcn-ui';

const crStore = useClassroomStore();
</script>
<template>
    <Dialog v-model:open="crStore.showModalHapus">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Hapus Kelas
                </DialogTitle>
            </DialogHeader>
                Apakah Anda yakin? Kelas yang sudah dihapus tidak bisa dikembalikan!
            <DialogFooter>
                <Button @click="crStore.deleteClassroom()">Ya</Button>
                <Button @click="crStore.showModalHapus = false">Tidak</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>