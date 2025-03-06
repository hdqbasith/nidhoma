import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Rekap } from '../types'

export const columns: ColumnDef<Rekap>[] = [
  {
    accessorKey: 'um_nama',
    header: ({column}) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Nama'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_nama'))
    },
    meta:'Nama'
  },
  {
    accessorKey: 'um_kelas',
    header: ({column}) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Kelas'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_kelas'))
    },
    meta:'Kelas'
  },
  {
    accessorKey: 'um_progres',
    header: ({column}) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Terjawab'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_progres'))
    },
    meta:'Status'
  },
  {
    accessorKey: 'um_nilai',
    header: ({column}) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Nilai'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_nilai'))
    },
    meta:'Nilai'
  }
]