<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";
import type { Rekap } from "~/components/academic/quiz/types";
import type { Task } from "~/lib/table/data/schema";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/packages/@core/ui-kit/shadcn-ui";

interface DataTablePaginationProps {
  table: Table<any>;
}
defineProps<DataTablePaginationProps>();
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      Data ke {{
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
        1
      }}
      -
      {{
        (table.getState().pagination.pageIndex + 1) *
        table.getState().pagination.pageSize
      }}
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Baris per hal</p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize(parseInt($event))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue
              :placeholder="`${table.getState().pagination.pageSize}`"
            />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        class="flex w-[100px] items-center justify-center text-sm font-medium"
      >
        Hal {{ table.getState().pagination.pageIndex + 1 }} dari
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ArrowBigLeftDash class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ArrowBigRightDash class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
