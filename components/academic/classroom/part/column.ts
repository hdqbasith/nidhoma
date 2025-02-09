import { h } from 'vue'
import type { Kelas } from '..'
import type { ColumnDef } from '@tanstack/vue-table'
import MenuItem from './menuItem.vue';

export const columns: ColumnDef<Kelas>[] = [
  // {
  //   accessorKey: 'id',
  //   header: () => h('div', { class: '' }, 'ID'),
  //   cell: ({ row }) => {
  //     return h('div', { class: '' },row.getValue('id'));
  //   },
  // },
  {
    accessorKey: 'nama_kelas',
    header: () => h('div', { class: '' }, 'Kelas'),
    cell: ({ row }) => {
      return h('div', { class: '' }, row.getValue('nama_kelas'));
    },
  },
  {
    accessorKey: 'nama_kelas2',
    header: () => h('div', { class: '' }, 'Alias'),
    cell: ({ row }) => {
      return h('div', { class: '' }, row.getValue('nama_kelas2'));
    },
  },
  {
    accessorKey: 'jurusan',
    header: () => h('div', { class: '' }, 'Jurusan'),
    cell: ({ row }) => {
      return h('div', { class: '' }, row.getValue('jurusan'));
    },
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'max-w-10' }, ''),
    cell: ({ row }) => {
      return h('div', { class: 'max-w-10' }, h(MenuItem, { id: row.getValue('id') as string }));
    },
  },
]