<script setup lang="ts">

definePageMeta({
  title: "Infaq Administrasi PPDB",
  name: "bukti-bayar-ppdb",
})

const applicant = (useRoute().query.akun?? '') as string;
const studentStore = useStudentBiodataStore();
if (applicant) {
  studentStore.studentId = applicant;
}
</script>
<template>
    <FormulirUploadBuktiPembayaran></FormulirUploadBuktiPembayaran>
</template>