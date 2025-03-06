<script setup lang="ts">
import dayjs from 'dayjs';


definePageMeta({
  title:'Ujian Madrasah',
  name:'UM'
});
const date_start=dayjs().format("YYYY-MM-DD");
const date_end=dayjs().format("YYYY-MM-DD");
</script>
<template>
  <AcademicStudentListMapel :date_start="date_start" :date_end="date_end" :show-aksi="true"/>
</template>