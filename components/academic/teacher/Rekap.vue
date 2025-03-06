<script setup lang="ts">
import DataTable from "~/components/ui/DataTable/DataTable.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/packages/@core/ui-kit/shadcn-ui";
import { columns } from "../quiz/table/columns";
import type { Rekap } from "../quiz/types";

const ruang = ref("1");
const client = useSanctumClient();
const { data, status, error, refresh } = await useAsyncData("progres", () =>
  client<Rekap[]>("/ulangan/progress-um", {
    query: {
      ruang: ruang.value,
    },
    onResponse({ response }) {
      console.log(response._data);
    },
  })
);
var x: string | number | NodeJS.Timeout | undefined;
onBeforeMount(()=>{
  x= setInterval(() => {
    refresh()
  }, 10000);
})
onBeforeUnmount(()=>{
  clearInterval(x)
})
const list = ref<
  {
    key: string;
    value: string;
  }[]
>([]);

for (let i = 1; i <= 25; i++) {
  list.value[i - 1] = {
    key: i.toString(),
    value: i.toString(),
  };
}
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Rekap Hasil Ujian Madrasah</CardTitle>
      <CardDescription class="font-black mt-3">
        <Select
          :model-value="ruang"
          @update:model-value="
            {
              ruang = $event;
              refresh();
            }
          "
        >
          <SelectTrigger>
            <SelectValue placeholder="Ruang: " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup v-for="l in list">
              <SelectItem :value="l.value">Ruang {{ l.value }} </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable :columns="columns" :data="data!" />
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>
