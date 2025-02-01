<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import { ref } from 'vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { valueUpdater } from '~/plugins/vue-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/packages/@core/ui-kit/shadcn-ui/ui/table'

interface DataTableProps {
  columns: ColumnDef<any, any>[]
  data: any[]
}
const props = defineProps<DataTableProps>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
// const dataTable = useState<any>('dataTable')

const table = useVueTable({

  get data() { return props.data },
  // get data() { return dataTable.value },
  get columns() { return props.columns },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
  enableRowSelection: true,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar :table="table" />
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() && 'selected'">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :data-label="cell.column.columnDef.meta">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
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
  </div>
</template>

<style>
table {
  width: 100%
}

thead {
  display: none
}

@media (min-width: 1024px) {
  thead {
    display: table-header-group
  }
}

tr {
  position: relative;
  display: block;
  max-width: 100%;
  border-bottom-width: 4px;
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity))
}

:is(.dark tr) {
  --tw-border-opacity: 1;
  border-color: rgb(30 41 59 / var(--tw-border-opacity))
}

@media (min-width: 1024px) {
  tr {
    display: table-row;
    border-bottom-width: 0px
  }
}

tr:last-child {
  border-bottom-width: 0px
}

@media (min-width: 1024px) {
  td:not(:first-child) {
    border-left-width: 1px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    --tw-border-opacity: 1;
    border-color: rgb(243 244 246 / var(--tw-border-opacity))
  }

  :is(.dark td:not(:first-child)) {
    --tw-border-opacity: 1;
    border-color: rgb(51 65 85 / var(--tw-border-opacity))
  }

  th {
    padding: .75rem;
    text-align: left
  }
}

td {
  display: flex;
  justify-content: space-between;
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity));
  padding: .75rem 1rem;
  text-align: left;
  vertical-align: top
}

:is(.dark td) {
  --tw-border-opacity: 1;
  border-color: rgb(30 41 59 / var(--tw-border-opacity))
}

@media (min-width: 1024px) {
  td {
    display: table-cell;
    border-bottom-width: 0px;
    padding: .75rem;
    text-align: left;
    vertical-align: middle
  }
}

td:last-child {
  border-bottom-width: 0px
}

@media (min-width: 1024px) {

  tbody tr:hover,
  tbody tr:nth-child(odd):hover {
    --tw-bg-opacity: 1;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity))
  }

  :is(.dark tbody tr:hover),
  :is(.dark tbody tr:nth-child(odd):hover) {
    background-color: #334155b3
  }

  tbody tr:nth-child(odd) {
    background-color: #f3f4f680
  }

  :is(.dark tbody tr:nth-child(odd)) {
    background-color: #1e293b80
  }
}

td:before {
  padding-right: .75rem;
  text-align: left;
  font-weight: 600;
}

@media (min-width: 1024px) {
  td:before {
    display: none
  }
}
</style>