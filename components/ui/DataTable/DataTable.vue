<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { ref } from "vue";
import DataTablePagination from "./DataTablePagination.vue";
import DataTableToolbar from "./DataTableToolbar.vue";
import { valueUpdater } from "~/plugins/vue-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/packages/@core/ui-kit/shadcn-ui/ui/table";
import { Button, Checkbox } from "~/packages/@core/ui-kit/shadcn-ui";
import { XCircle } from "lucide-vue-next";

interface DataTableProps {
  columns: ColumnDef<any, any>[];
  data: any[];
  selection?: boolean;
  clearSelection?: boolean;
  uniqueFilter?: any;
}
const props = defineProps<DataTableProps>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const myCustomFilterFn = (
  row: Row<any>,
  columnId: string,
  filterValue: string
) => {
  const a = row
    .getValue<number | string>(columnId)
    .toString()
    .toLowerCase()
    .trim();
  let t = true;
  filterValue.split(" ").some((s) => {
    if (!a.includes(s)) t = false;
  });
  return t;
};
watch(
  () => props.clearSelection,
  (n, o) => {
    if (n) table.toggleAllRowsSelected(false);
  }
);
const emit = defineEmits(["selected"]);
const table = useVueTable({
  get data() {
    return props.data;
  },
  // get data() { return dataTable.value },
  get columns() {
    return props.columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  enableRowSelection: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, rowSelection);
    emit("selected", Object.keys(table.getSelectedRowModel().rowsById));
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  globalFilterFn: myCustomFilterFn,
  getRowId: (row) => row.um_akun,
});
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar :table="table" />
    <div class="rounded-md border overflow-x-scroll">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :data-label="cell.column.columnDef.meta"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
    <div class="flex-1 text-sm" v-if="selection">
      {{ table.getFilteredSelectedRowModel().rows.length }} /
      {{ table.getFilteredRowModel().rows.length }} Peserta Terpilih.
      <Button
        size="sm"
        class="text-red-500"
        variant="ghost"
        v-if="table.getFilteredSelectedRowModel().rows.length > 0"
        @click="table.toggleAllRowsSelected(false)"
        ><XCircle :size="15" /> &nbsp;Clear Selected</Button
      >
    </div>
  </div>
</template>

<style></style>
