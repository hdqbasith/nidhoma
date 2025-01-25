<script setup lang="ts">
import { DashboardApplicant } from '#components';
import { useAccessStore } from '~/packages/stores';
definePageMeta({
    title:"page.dashboard.title",
    name:"Index"
})

const {user}=useSanctumAuth<User>();
const role=user?.value?.roles?.[0].name;
</script>
<template>
     <div>
          <DashboardUser v-if="role=='user'"/>
          <DashboardApplicant v-else-if="role=='applicant'"/>
          <DashboardStudent v-else-if="role=='student'"/>
          <DashboardAdmin v-else-if="role=='admin'"/>
     </div>
</template>