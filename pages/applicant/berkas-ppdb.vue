<script setup lang="ts">

definePageMeta({
  title: "Berkas PPDB",
  name: "berkas-ppdb",
})

const applicant = (useRoute().query.akun?? '') as string;
const studentStore = useStudentBiodataStore();
if (applicant) {
  studentStore.studentId = applicant;
}
</script>
<template>
    <FormulirUploadBerkas></FormulirUploadBerkas>
</template>