import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Rekap } from '../quiz/types'

export const columns: ColumnDef<Rekap>[] = [
  {
    accessorKey: 'um_nama',
    header: () => h('div', { class: 'text-bold' }, 'Nama'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_nama'))
    },
    meta:'Nama'
  },
  {
    accessorKey: 'um_kelas',
    header: () => h('div', { class: 'text-bold' }, 'Kelas'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_kelas'))
    },
    meta:'Kelas'
  },
  {
    accessorKey: 'um_progres',
    header: () => h('div', { class: 'text-bold' }, 'Status'),
    cell: ({ row }) => {
      return h('div', null, row.getValue('um_progres'))
    },
    meta:'Status'
  },
  {
    accessorKey: 'um_nilai',
    header: () => h('div', { class: 'text-bold' }, 'Nilai'),
    cell: ({ row }) => {
      
      return h('div', null, row.getValue('um_nilai'))
    },
    meta:'Nilai'
  }
]