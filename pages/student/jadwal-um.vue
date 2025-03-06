<script setup lang="ts">
import dayjs from 'dayjs';

definePageMeta({
  title:'Simulasi UM',
  name:'JadwalUM'
});
const date_start=useRoute().query?.date_start as string;
const date_end=useRoute().query?.date_end as string;
</script>
<template>
  <AcademicStudentListMapel :date_start="date_start" :date_end="date_end"/>
</template>