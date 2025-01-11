<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { ColumnDef } from '@tanstack/vue-table';
import DataTableColumnHeader from '../table/applicant/DataTableColumnHeader.vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';

const actions = ref({
    edit: false,
    bayar: false,
    detail: false,
    hapus: false
})
const columns: ColumnDef<any>[] = [
    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
            'class': 'translate-y-0.5',
        }),
        cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        meta: 'Nama',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nama' }),

        cell: ({ row }) => {
            return h('div', { class: 'flex space-x-2' }, [
                h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('name')),
            ])
        },
    },
    {
        accessorKey: 'p_amount',
        meta: 'Jumlah Bayar',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Jumlah Bayar' }),

        cell: ({ row }) => {
            return h('div', { class: 'flex space-x-2' }, [
                h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('p_amount') ?? 'belum bayar'),
            ])
        },
    },
    {
        accessorKey: 'created_at',
        meta: 'Tanggal',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Tanggal' }),

        cell: ({ row }) => {
            return h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('created_at'))
        }
    },
    {
        accessorKey: 'admin',
        meta: 'Admin',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Admin' }),

        cell: ({ row }) => {
            return h('span', { class: 'max-w-[500px] font-medium' }, row.getValue('admin'))
        }
    },
    {
        accessorKey: 'actions',
        meta:'aksi',
        header: 'aksi',
        cell: ({ row }) => {
            return h('div', {},
                [
                    h('a', { href: '/admin/applicants/edit?akun=' + row.original.p_customer, target:'_blank' , 'v-show': actions.value.edit }, h(Button, { variant: 'blue' }, () => 'biodata')),
                    h(Button, { variant: 'blue' }, () => 'bayar'),
                    h(Button, { variant: 'red' }, () => 'hapus'),
                ]

            )
        }
    },
]

const getList = await useFetch(
    () => 'admin/list-payment/2',
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
getList.refresh()
</script>
<template>
    <Card class="p-5 m-5">
        <CardHeader>
            <CardTitle>Daftar Calon Siswa Baru</CardTitle>
            <CardDescription>dari MTs TBS</CardDescription>
        </CardHeader>
        <CardContent>
            <TableApplicantDataTable :data="getList.data.value" :columns="columns" />
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
</template>
