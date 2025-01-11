<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
import UserNav from '~/components/menu/UserNav.vue';
import DataTable from '~/components/table/components/DataTable.vue';
import { columns } from '~/components/table/components/columns';
import tasks from '~/components/table/data/tasks.json';
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Welcome back!
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
    <DataTable :data="tasks" :columns="columns" />
  </div>
</template>
