<script setup lang="ts">
definePageMeta({
  name: "ListMapelAdmin",
  title: "List Mapel",
});
const date_start = useRoute().query?.date_start as string;
const date_end = useRoute().query?.date_end as string;
</script>
<template>
  <AcademicQuizListMapel
    :date_start="date_start"
    :date_end="date_end"
  ></AcademicQuizListMapel>
</template>
