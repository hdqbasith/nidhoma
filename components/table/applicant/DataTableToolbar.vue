<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';

import { LucideRefreshCcw } from 'lucide-vue-next';
import DataTableViewOptions from './DataTableViewOptions.vue';

interface DataTableToolbarProps {
  table: Table<any>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().globalFilter)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Cari nama"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.setGlobalFilter($event.target.value)"
      />
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetGlobalFilter()"
      >
        Reset
        <LucideRefreshCcw class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
