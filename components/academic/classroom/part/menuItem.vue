<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/packages/@core/ui-kit/shadcn-ui";

defineProps<{
    id: string;
}>();

function copy(id: string) {
  navigator.clipboard.writeText(id);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(id)">
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Lihat</DropdownMenuItem>
      <DropdownMenuItem>Detail</DropdownMenuItem>
      <DropdownMenuItem>Hapus</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
