<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { ColumnDef } from '@tanstack/vue-table';
import Checkbox from '../ui/checkbox/Checkbox.vue';
import DataTableColumnHeader from './applicant/DataTableColumnHeader.vue';
import DataTableRowActions from './applicant/DataTableRowActions.vue';
import Button from '../ui/button/Button.vue';
import { NuxtLink } from '#components';
import Badge from '../ui/badge/Badge.vue';
import Switch from '../ui/switch/Switch.vue';

const actions = ref({
  edit: false,
  bayar: false,
  detail: false,
  hapus: false
})
const { data } = await useFetch<any>(
  () => 'admin/list-melanjutkan',
  {
    method: "get",
    immediate: true,
    watch: false,
    async onResponse({ response }) {
      if (response.status != 200) {
        toast.error('gagal mengambil data')
      }
    }
  })
const dataTable = ref(data.value.melanjutkan)
const bayar = (row: any) => {
  const newRow = row.original
  const pay = row.getValue('p_amount') == null ? 200000 : null
  newRow.p_amount = pay
  dataTable.value.splice(row.index, 1, newRow)
  dataTable.value = dataTable.value.filter((a: any) => a != null)
}
const hapus = (row: number) => {
  dataTable.value = dataTable.value.filter((_: any, i: number) => i !== row)
}
const columns: ColumnDef<any>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => h(Checkbox, {
  //     'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
  //     'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
  //     'ariaLabel': 'Select all',
  //     'class': 'translate-y-0.5',
  //   }),
  //   cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'nomor',
    meta: 'Nomor',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nomor' }),

    cell: ({ row }) => {
      return parseInt(row.id)+1
    },
  },
  {
    accessorKey: 's_nisn',
    meta: 'NISN',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'NISN' }),

    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('s_nisn')),
      ])
    },
  },
  {
    accessorKey: 's_nama_lengkap',
    meta: 'Nama Lengkap',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nama Lengkap' }),

    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('s_nama_lengkap')),
      ])
    },
  },
  {
    accessorKey: 'as_kelas_mts',
    meta: 'Asal Kelas',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Asal Kelas' }),

    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('as_kelas_mts')),
      ])
    },
  },
  {
    accessorKey: 's_hp',
    meta: 'Nomor HP',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nomor HP' }),

    cell: ({ row }) => {
      const nohp:string=row.getValue('s_hp')
      return h('div', { class: 'flex space-x-2' }, [
        h('a', { class: 'max-w-[500px] font-medium', href:'https://wa.me/62'+(nohp.startsWith('0')? nohp.substring(1):nohp), target: '_blank' }, nohp),
      ])
    },
  },
  {
    accessorKey: 'p_amount',
    meta: 'Bayar',
    enableColumnFilter: false,
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Bayar' }),

    cell: ({ row }) => {
      return h(Switch, { variant: 'blue-red', checked: row.getValue('p_amount') == null ? false : true, "onUpdate:checked": v => bayar(row) })
    },
  },
  {
    accessorKey: 's_akun',
    meta: 'Aksi',
    header: 'Aksi',
    enableColumnFilter: false,
    cell: ({ row }) => {
      return h('div', {}, [
        h('a', { href: '/admin/applicants/edit?akun=' + row.original.s_akun, 'v-show': actions.value.edit, 'target': '_blank' }, h(Button, { variant: 'blue' }, () => 'edit')),
        h(Button, { variant: 'red', onClick() { hapus(row.index) } }, () => 'hapus'),
      ])
    }
  },
]

</script>
<template>
  <Card class="p-5 m-5">
    <CardHeader variant="green" class="text-white">
      <CardTitle>Daftar Calon Siswa Baru</CardTitle>
      <CardDescription class="text-yellow-300">dari MTs TBS</CardDescription>
    </CardHeader>
    <CardContent>
      <TableApplicantDataTable :data="dataTable" :columns="columns" />
    </CardContent>
    <CardFooter>

    </CardFooter>
  </Card>
</template>