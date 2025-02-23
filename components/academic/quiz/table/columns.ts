import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Rekap } from '../types'

export const columns: ColumnDef<Rekap>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-right' }, 'Nama'),
    cell: ({ row }) => {
      
      return h('div', { class: 'text-right font-medium' }, row.getValue('name'))
    },
  }
]