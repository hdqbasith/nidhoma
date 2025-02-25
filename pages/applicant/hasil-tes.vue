<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";

definePageMeta({
  title: "Hasil Tes PPDB",
  name: "hasil-tes-ppdb",
});
const client = useSanctumClient();
const downloadTemplate = URL.createObjectURL(
  await client("/download/pengumuman-tes-ppdb")
);
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Hasil Uji Kompetensi</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <p class="my-2">
        Selamat, Anda LULUS Uji Kompetensi PPD MA NU Tasywiquth Thullab
        Salafiyah (TBS) Kudus Tahun Ajaran 1447-1448 H / 2025-2026 M.
        Selanjutnya silakan persiapkan diri Anda untuk daftar ulang dan
        melengkapi administrasi yang diperlukan. Bagi yang rumahnya di luar
        Kudus, kami sarankan untuk segera mencari Pondok Pesantren di sekitar MA
        NU TBS Kudus karena peraturan madrasah mengharuskan siswa yang rumahnya
        jauh untuk mondok. Kami
        ucapkan selamat bergabung menjadi bagian keluarga besar MA NU TBS
        Kudus. Kami tunggu kehadiran Anda...
      </p>
      <p class="my-2">Informasi daftar ulang ada di dalam lampiran.<br />Terima kasih</p>
    </CardContent>
    <CardFooter>
      <a :href="downloadTemplate" download="Pengumuman.pdf">
        <Button>
          Download Surat Keputusan Hasil Uji Kompetensi
        </Button></a>
    </CardFooter>
  </Card>
</template>
