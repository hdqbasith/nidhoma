<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { ColumnDef } from '@tanstack/vue-table';
import DataTableColumnHeader from './applicant/DataTableColumnHeader.vue';
import DataTableRowActions from './applicant/DataTableRowActions.vue';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Switch } from '~/packages/@core/ui-kit/shadcn-ui';
import { NuxtImg } from '#components';

const props = defineProps<{
  dari: string | undefined
}>()

const client = useSanctumClient();
const actions = ref({
  edit: false,
  bayar: false,
  detail: false,
  hapus: false
})
const uri = ref(props.dari == 'luar' ? 'admin/list-pendaftar-luar' : 'admin/list-melanjutkan')
const data = ref()
const getPendaftar = async () => await client<any>(
  uri.value,
  {
    method: "get",
    async onResponse({ response }) {
      console.log(uri.value);

      if (response.status != 200) {
        toast.error('gagal mengambil data')
      } else data.value = response._data
    }
  }
)
await getPendaftar();
const dataTable = ref(props.dari == 'luar' ? data.value.pendaftar : data.value.melanjutkan)
const buktiBayar = ref<Record<string, any>[]>(data.value.bayar);
const pay = ref({
  akun: '',
  amount: '',
  index: 0,
  newRow: <any>{},
  id: props.dari == 'luar' ? 'Pendaftaran PPDB' : 'Naik MA',
})
const aksi = ref('pay')
const url = ref('/admin/' + aksi.value);
const refresh = async () => await client<any>(
  url.value,
  {
    method: "POST",
    body: pay.value,
    onResponse({ response }) {
      if (response.status == 200 && aksi.value == 'pay') {
        pay.value.newRow.p_amount = response._data.amount
        dataTable.value.splice(pay.value.index, 1, pay.value.newRow)
        dataTable.value = dataTable.value.filter((a: any) => a != null)
      }
      else if (response.status == 200 && aksi.value == 'hapus') {
        dataTable.value = dataTable.value.filter((_: any, i: number) => i !== dialogHapus.value.row)
        aksi.value = 'pay'
      }
    }
  }
)
const bayar = (row: any) => {
  pay.value.index = row.index
  pay.value.newRow = row.original
  pay.value.akun = pay.value.newRow.s_akun
  pay.value.amount = pay.value.newRow.p_amount == null ? 'set' : 'unset'
  toast.promise(refresh(), {
    loading: 'menyimpan...',
    success: () => 'berhasil',
    error: () => 'gagal',
    duration: 200
  })
}
const dialogHapus = ref<{
  show: boolean,
  row: number,
  akun: string
}>({
  show: false,
  row: -1,
  akun: ''
})
const hapus = () => {
  aksi.value = 'hapus'
  pay.value.akun = dialogHapus.value.akun

  toast.promise(refresh(), {
    loading: 'menyimpan...',
    success: () => 'ok',
    error: () => 'gagal',
    duration: 200
  })
  dialogHapus.value.show = false
}
const columnsLuar: ColumnDef<any>[] = [
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
      return parseInt(row.id) + 1
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
    accessorKey: 's_hp',
    meta: 'Nomor HP',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nomor HP' }),

    cell: ({ row }) => {
      const nohp: string = row.getValue('s_hp') ?? '-'
      return h('div', { class: 'flex space-x-2' }, [
        h('a', { class: 'max-w-[500px] font-medium', href: 'https://wa.me/62' + (nohp.startsWith('0') ? nohp.substring(1) : nohp), target: '_blank' }, nohp),
      ])
    },
  },
  {
    accessorKey: 'as_nama',
    meta: 'Asal Sekolah',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Asal Sekolah' }),

    cell: ({ row }) => {
      const nohp: string = row.getValue('as_nama') ?? '-'
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('as_nama')),
      ])
    },
  },
  {
    accessorKey: 'berkas',
    meta: 'Bukti',
    enableColumnFilter: false,
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Bukti' }),

    cell: ({ row }) => {
      return h('a', { class: 'flex space-x-2 text-blue-500',target:'_blank', href:'/admin/applicants/bukti-bayar-ppdb?applicant='+row.getValue('s_akun') },
        h('span', { }, row.getValue('berkas')==1? 'lihat': '-'))
    },
  },
  {
    accessorKey: 'p_amount',
    meta: 'Bayar',
    enableColumnFilter: false,
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Bayar' }),

    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' },
        h(Switch, { variant: 'blue-red', checked: row.getValue('p_amount') == null ? false : true, "onUpdate:checked": v => bayar(row) }))
    },
  },
  {
    accessorKey: 's_akun',
    meta: 'Aksi',
    header: 'Aksi',
    enableColumnFilter: false,
    cell: ({ row }) => {
      return h('div', {}, [
        h('a', { href: '/admin/applicants/edit?akun=' + row.original.s_akun, 'v-show': actions.value.edit, 'target': '_blank' }, h(Button, { variant: 'default' }, () => 'edit')),
        h(Button, { variant: 'destructive', onClick() { dialogHapus.value = { show: true, row: row.index, akun: row.original.s_akun } } }, () => 'hapus'),
      ])
    }
  },
]

const columnsDalam: ColumnDef<any>[] = [
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
      return parseInt(row.id) + 1
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
      const nohp: string = row.getValue('s_hp') ?? '-'
      return h('div', { class: 'flex space-x-2' }, [
        h('a', { class: 'max-w-[500px] font-medium', href: 'https://wa.me/62' + (nohp.startsWith('0') ? nohp.substring(1) : nohp), target: '_blank' }, nohp),
      ])
    },
  },
  {
    accessorKey: 'p_amount',
    meta: 'Bayar',
    enableColumnFilter: false,
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Bayar' }),

    cell: ({ row }) => {
      return h(Switch, { variant: 'blue-red', data: row.getValue('p_amount'), checked: row.getValue('p_amount') == null ? false : true, "onUpdate:checked": v => bayar(row) })
    },
  },
  {
    accessorKey: 's_akun',
    meta: 'Aksi',
    header: 'Aksi',
    enableColumnFilter: false,
    cell: ({ row }) => {
      return h('div', {}, [
        h('a', { href: '/admin/applicants/edit?akun=' + row.original.s_akun, 'v-show': actions.value.edit, 'target': '_blank' }, h(Button, { variant: 'default' }, () => 'edit')),
        h(Button, { variant: 'destructive', onClick() { dialogHapus.value = { show: true, row: row.index, akun: row.original.s_akun } } }, () => 'hapus'),
      ])
    }
  },
]
</script>
<template>
  <Card>
    <!-- {{ dataTable }} -->
    <CardHeader variant="sky" class="text-white" v-if="dari == 'luar'">
      <CardTitle>Daftar Calon Siswa Baru</CardTitle>
      <CardDescription class="text-yellow-300">dari Luar TBS</CardDescription>
    </CardHeader>
    <CardHeader variant="green" class="text-white" v-else>
      <CardTitle>Daftar Calon Siswa Baru</CardTitle>
      <CardDescription class="text-yellow-300">dari dalam TBS</CardDescription>
    </CardHeader>
    <CardContent>
      <TableApplicantDataTable :data="dataTable" :columns="dari == 'dalam' ? columnsDalam : columnsLuar" />
    </CardContent>
    <CardFooter>
    </CardFooter>
    <AlertDialog :open="dialogHapus.show">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription class="text-gray-700 dark:text-gray-400">
            Anda akan menghapus
            <span class="text-red-500 block text-lg font-bold">
              {{ dialogHapus.show != false ? dataTable[dialogHapus.row].s_nama_lengkap : '' }}
            </span>
            Data yang dihapus mungkin tidak bisa dikembalikan
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="ghost" @click="dialogHapus.show = false">Batal</Button>
          <Button variant="destructive" @click="hapus()">Ya</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </Card>

</template>
