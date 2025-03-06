import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Rekap } from '../types'
import { Button, Checkbox } from '~/packages/@core/ui-kit/shadcn-ui'
import { Lock } from 'lucide-vue-next'
export const columnsMonitor: ColumnDef<Rekap>[] = [
  {
    id: 'um_akun',
    accessorKey: 'um_akun',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': (value: any) => table.toggleAllRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: any) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: 'jt_jawaban',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Terjawab'),
    cell: ({ row }) => {
      const val = row.getValue('jt_jawaban') != null ? String(row.getValue('jt_jawaban')).split(",").filter(f => f != "").length : 0;
      const style = {
        red: 'bg-red-100',
        yellow: 'bg-yellow-100',
        green: 'bg-yellow-100',
        white: 'bg-none'
      }
      return h('div', { class: val < 1 ? style.red : val < 30 ? style.yellow : val < 45 ? style.green : style.white }, val)
    },
    meta: 'Terjawab'
  },
  {
    accessorKey: 'locked',
    header: ({ column }) => h('div', { onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: 'text-bold cursor-pointer' }, 'Terkunci'),
    cell: ({ row }) => {
      const val = row.getValue('locked')
      const locked = h(Lock, { class: 'text-red-300', size: 15 })
      return h('div', null, val == 1 ? locked : '')
    },
    meta: 'Terkunci'
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