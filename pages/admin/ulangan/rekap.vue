<script setup lang="ts">
import { toast } from 'vue-sonner';

const mapel=useRoute().query.mapel
if(!mapel) {
  useRouter().push("/admin/ulangan/list-mapel");
  toast.error("Rekap ulangan tidak ditemukan")
  }
</script>
<template>
  <AcademicQuizRekap :mapel="mapel?.toString()"/>
</template>