<script setup lang="ts">
import DataTable from "~/components/ui/DataTable/DataTable.vue";
import type { Kelas } from "..";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import {
  ArrowBigRight,
  ArrowRight,
  ArrowRightCircle,
  ArrowUpRightSquare,
  DoorOpen,
  Eye,
  Info,
  Pencil,
  SidebarOpen,
  Trash2,
} from "lucide-vue-next";

const props = defineProps<{ data: classroom[] }>();
const emit = defineEmits(["edit", "hapus"]);
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-1 text-xs">
    <Card v-for="k in props.data">
      <CardHeader class="p-3">
        <CardTitle class="text-center">
          <NuxtLink>
            <Button
              variant="outline"
              class="text-2xl font-extrabold text-blue-600 dark:text-blue-300"
            >
              {{ k.nama_kelas }} &nbsp;<ArrowUpRightSquare
                class=""
              ></ArrowUpRightSquare>
            </Button>
          </NuxtLink>
        </CardTitle>
      </CardHeader>
      <CardContent class="block p-3">
        <div class="grid grid-cols-[100px_auto] gap-x-2">
          <div class="font-bold">
            Nama kelas<span class="float-right"> :</span>
          </div>
          <div class="">
            {{ k.nama_kelas2 }}
          </div>
        </div>
        <div class="grid grid-cols-[100px_auto] gap-x-2">
          <div class="font-bold">
            Jurusan<span class="float-right"> :</span>
          </div>
          <div class="">
            {{ k.nama_kelas2 }}
          </div>
        </div>
        <div class="grid grid-cols-[100px_auto] gap-x-2">
          <div class="font-bold">
            Wali kelas<span class="float-right"> :</span>
          </div>
          <div class="">
            {{ k.nama_kelas2 }}
          </div>
        </div>
        <div class="grid grid-cols-[100px_auto] gap-x-2">
          <div class="font-bold">
            Jumlah Siswa<span class="float-right"> :</span>
          </div>
          <div class="">
            {{ k.nama_kelas2 }}
          </div>
        </div>
        <div class="mt-3 grid grid-cols-3 gap-x-3 place-items-center">
          <Button class="rounded-md" size="sm" variant="heavy">
            <Info class="text-teal-500 dark:text-teal-300"></Info>
          </Button>
          <Button
            class="rounded-md"
            size="sm"
            variant="heavy"
            @click="emit('edit', k)"
          >
            <Pencil class="text-blue-500 dark:text-blue-300"></Pencil>
          </Button>
          <Button class="rounded-md" size="sm" variant="heavy" @click="emit('hapus',k)">
            <Trash2 class="text-red-500 dark:text-red-300"></Trash2>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
