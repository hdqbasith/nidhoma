<script setup lang="ts">
import imageCompression from "browser-image-compression";
import {
  Eye,
  HardDriveDownload,
  LoaderCircle,
  PenBox,
  Trash2,
} from "lucide-vue-next";
import { AlertDialogCancel } from "radix-vue";
import { toast } from "vue-sonner";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/packages/@core/ui-kit/shadcn-ui/ui/alert-dialog";
interface Berkas {
  jenis: string;
  nama: string;
  loading: boolean;
}
const props = defineProps<Berkas>();
const emit = defineEmits(["file"]);
const preview = ref();
const ubah = async (e: any) => {
  const file = e.target.files[0];
  emit("file", file);
};
const showConfirm = ref(false);
</script>
<template>
  <div>
    <Card>
      <CardHeader>
        <CardTitle>
          {{ props.nama }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center justify-center w-full">
          <label
            :for="nama"
            class="flex flex-col items-center justify-center w-full max-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <LoaderCircle
              v-if="loading"
              class="text-md mr-2 size-4 flex-shrink-0 animate-spin"
            />
            <div
              v-else
              class="flex flex-col items-center justify-center pt-5 pb-6"
            >
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Klik untuk mengubah</span>
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                XLs, XLSX
              </p>
            </div>
            <input
              :id="nama"
              type="file"
              class="hidden"
              @input="ubah($event)"
            />
          </label>
        </div>
      </CardContent>
      <!-- <CardFooter class="grid grid-cols-3">
          <Button variant="ghost">
            <Eye class="text-green-500"></Eye>
          </Button>
        <Button variant="ghost" @click="showConfirm = true">
          <Trash2 class="text-red-500"></Trash2>
        </Button>
      </CardFooter> -->
    </Card>
  </div>
</template>
