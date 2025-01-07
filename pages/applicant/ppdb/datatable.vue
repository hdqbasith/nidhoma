<script setup lang="ts">
import type { Post } from '~/components/table/data/schema';
import { columns } from '~/components/table/post/columns';

export type Scout = {
    current_page: number,
    data: Post[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number
}
const { data } = await useFetch<Scout>('scout');
const post = ref();
if (data.value) {
    post.value = data.value.data
    alert(data.value)
}
</script>
<template>
    <!-- {{ data }} -->
    <TablePostDataTable :data="post" :columns="columns"></TablePostDataTable>
</template>