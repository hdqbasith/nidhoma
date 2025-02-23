<script setup lang="ts">
import dayjs from 'dayjs';

definePageMeta({
  title:'Jadwal UM',
  name:'JadwalUM'
});
const mulai=dayjs().format('YYYY-MM-DD')
const selesai=dayjs().format('YYYY-MM-DD')
</script>
<template>
  <AcademicStudentListMapel :date_start="mulai" :date_end="selesai"/>
</template>