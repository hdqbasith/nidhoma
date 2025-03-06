<script setup lang="ts">
import { Button } from "~/packages/@core/ui-kit/shadcn-ui";
import type { Config } from "./types";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-vue-next";
import dayjs from "dayjs";
import { range } from "lodash";

const props = defineProps<{
  config: Config;
}>();
const days = computed(() => {
  const hari =
    props.config.formatDays == "long"
      ? ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumu'ah", "Sabtu"]
      : ["A", "S", "S", "R", "K", "J", "S"];
  return hari;
});
const currentDate = ref(dayjs());
const startDate = ref(currentDate.value.date());
const selectedMonth = ref(currentDate.value.locale("id").format("MMMM"));
const selectedYear = ref(currentDate.value.get("year"));
const numberDays = ref(currentDate.value.daysInMonth());
const nextMonth = (n: number) => {
  currentDate.value = currentDate.value.add(n, "month");
  selectedMonth.value = currentDate.value.format("MMMM");
  selectedYear.value = currentDate.value.year();
  numberDays.value = currentDate.value.daysInMonth();
  startDate.value = currentDate.value
    .subtract(currentDate.value.date() - 1, "days")
    .day();
};
</script>
<template>
  <div class="w-fit">
    <div class="w-full flex flex-row">
      <Button @click="nextMonth(-1)"><ChevronLeftCircle /></Button>
      <span class="w-full text-center text-3xl font-bold">
        {{ selectedMonth }}
      </span>
      <span class="w-fit text-right text-3xl font-bold">{{
        selectedYear
      }}</span>
      <Button @click="nextMonth(1)"><ChevronRightCircle /></Button>
    </div>
    <div class="grid grid-cols-7">
      <div
        v-for="d in days"
        class="inline-block text-center border border-black"
      >
        {{ d }}
      </div>
    </div>
    <div class="grid grid-cols-7">
      <div v-for="i in range(0, startDate)"></div>
      <div
        v-for="n in numberDays"
        class="text-center"
        :class="
          parseInt(currentDate.format('D')) == n &&
          'border border-red-400 rounded-full'
        "
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>
