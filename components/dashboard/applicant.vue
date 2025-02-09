<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter, Button } from '~/packages/@core/ui-kit/shadcn-ui';
import WaCs from '../info/wa-cs.vue';

</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>
                <h2 class="text-2xl">Selamat Datang di Nidhoma</h2>
            </CardTitle>
            <CardDescription>
                Sistem informasi dan administrasi MA NU TBS Kudus
            </CardDescription>
        </CardHeader>
        <CardContent>
            Nidhoma adalah aplikasi web yang dikembangkan oleh MA NU TBS Kudus dalam rangka memudahkan proses pengumpulan dan pengolahan data. Nidhoma hadir untuk membantu memudahkan proses pendaftaran siswa baru di MA NU TBS Kudus. Berikut adalah tata cara pendaftaran siswa baru:
            <ol class="list-decimal mb-3 ms-5 mt-3" >
              <li>
                Mengisi formulir pendaftaran
                <NuxtLink to="/applicant/formulir-ppdb" class="flex my-2 w-fit">
                    <Button>
                        Formulir PPDB
                    </Button>
                </NuxtLink>
              </li>
              <li>
                Melunasi infaq pendaftaran sebesar Rp 250.000,- melalui rekening BRI <b class="font-extrabold">0038-01-001773-56-4</b> atas nama PPDB MA NU TBS KUDUS
              </li>
              <!-- <li>
                Upload Bukti pembayaran
                <NuxtLink to='/applicant/upload-bukti-pembayaran' class="flex my-2 w-fit">
                  <Button>
                    Upload Bukti Pembayaran
                  </Button>
                </NuxtLink>
              </li> -->
              <li>
                Hubungi 
                <WaCs></WaCs>
                untuk informasi selanjutnya..
              </li>
            </ol>
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
</template>
