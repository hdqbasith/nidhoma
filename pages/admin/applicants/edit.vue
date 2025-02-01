<script setup lang="ts">
import { LayoutDashboard } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import FormulirPPDB from '~/pages/applicant/formulir-ppdb.vue';
definePageMeta({
  // redirect: "/dashboard",
  name:'edit-data',
  title:'Edit Data Siswa'
});
const applicant = (useRoute().query.akun?? '') as string;
const studentStore = useStudentBiodataStore();
if (applicant) {
  studentStore.studentId = applicant;
}
await studentStore.fetchBiodata();
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>
        Edit Data (Calon) Siswa
      </CardTitle>
      <CardDescription>

      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <NuxtLink :to="'/applicant/formulir-ppdb?akun='+applicant" class="w-fit">
        <Button>
          Edit Data Siswa
        </Button>
      </NuxtLink>
      <NuxtLink :to="'/applicant/berkas-ppdb?akun='+applicant" class="w-fit">
        <Button>
          Edit Berkas Siswa
        </Button>
      </NuxtLink>
      <NuxtLink :to="'/applicant/upload-bukti-pembayaran?akun='+applicant" class="w-fit">
        <Button>
          Upload Bukti Pembayaran
        </Button>
      </NuxtLink>
    </CardContent>
  </Card>
</template>