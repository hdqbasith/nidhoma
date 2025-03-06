import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Rekap } from '../types'
import { Button, Checkbox } from '~/packages/@core/ui-kit/shadcn-ui'
import { Lock } from 'lucide-vue-next'
export const columnsRekap: ColumnDef<Rekap>[] = [
  {
    accessorKey: 'um_nisn',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'NISN'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('um_nisn'))
    },
    meta: 'NISN'
  },
  {
    accessorKey: 'um_nama',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Nama'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('um_nama'))
    },
    meta: 'Nama'
  },
  {
    accessorKey: 'um_kelas',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Kelas'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('um_kelas'))
    },
    meta: 'Kelas'
  },
  {
    accessorKey: 'um_absen',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Absen'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('um_absen'))
    },
    meta: 'Absen'
  },
  {
    accessorKey: 'um_ruang',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Ruang'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('um_ruang'))
    },
    meta: 'Ruang'
  },
  {
    accessorKey: 'jt_nilai',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Nilai'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('jt_nilai'))
    },
    meta: 'Nilai'
  },
  {
    accessorKey: 'jt_pelanggaran',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Pelanggaran'),
    cell: ({ row }) => {

      return h('div', null, row.getValue('jt_pelanggaran'))
    },
    meta: 'Pelanggaran'
  }
]