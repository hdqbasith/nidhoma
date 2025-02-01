<script setup lang="ts">
import { ArrowBigLeft } from 'lucide-vue-next';
import { Button } from '~/packages/@core/ui-kit/shadcn-ui';

definePageMeta({
    name: "privacy-and-policy"
})
</script>
<template>
    <div class="p-10">
        <NuxtLink to="/auth/register" class="-ms-3 w-fit">
            <Button size="lg" class="rounded-full" variant="secondary">

                <ArrowBigLeft/>
            </Button>
        </NuxtLink>
        <h1 class="text-xl font-bold mb-3">Persyaratan Layanan dan Kebijakan Privasi</h1>
        <p class="indent-5 mt-3 mb-3">Pastikan Anda membaca persyaratan layanan dan kebijakan privasi kami dengan teliti
            sebelum Anda
            menyetujuinya. Persyaratan layanan dan kebijakan privasi ini kami tujukan kepada siswa dan calon siswa MA NU TBS Kudus. Persyaratan layanan dan kebijakan privasi ini diperbarui terakhir pada tanggal 13 Januari
            2025.
        </p>
        <h2 class="text-lg font-bold">Persyaratan Layanan</h2>
        <p class="indent-5 mt-3 mb-3">Untuk dapat mengakses aplikasi website kami, Anda harus menigisi formulir
            pendaftaran yang kami sediakan
            dengan selengkap mungkin dan dengan data yang sebenar-benarnya sesuai dengan dokumen resmi yang Anda miliki.
            Setiap kesalahan data yang Anda masukkan akan menjadi tanggung jawab Anda.</p>
        <h2 class="text-lg font-bold">Kebijakan Privasi</h2>
        <p class="indent-5 mt-3 mb-3">Aplikasi website ini yang selanjutnya kami sebut sebagai <b>"Nidhoma"</b>, dapat
            mengumpulkan berbagai informasi/data
            yang secara garis besar dapat dibagi menjadi berikut:
        </p>
        <ol class="list-decimal ms-5 mt-3 mb-3">
            <li><b>Data Formulir</b>
                <p>Data jenis ini kami kumpulkan ketika Anda mengisi formulir yang kami sediakan, baik berupa teks yang
                    Anda ketikkan sendiri ataupun tombol-tombol yang Anda klik. Data jenis ini kami harapkan untuk diisi
                    dengan lengkap dan sesuai dengan dokumen resmi yang Anda miliki.</p>

            </li>
            <li><b>Data Cookies</b>
                <p>Data jenis ini adalah data yang disimpan oleh Nidhoma yang dapat digunakan untuk mengidentifikasi
                    Anda atau perangkat yang Anda gunakan, seperti alamat IP, jenis perangkat, log aplikasi, dan
                    berbagai data lainnya yang hanya digunakan untuk aplikasi, bukan untuk madrasah.</p>
            </li>
        </ol>
        <h2 class="text-lg font-bold">Penggunaan Data</h2>
        <p class="indent-5 mt-3 mb-3">Data Formulir yang Anda kirimkan akan kami gunakan untuk memudahkan administrasi Anda selama bersekolah di MA
            NU TBS Kudus. Data bisa kami berikan kepada siapapun yang berada di bawah naungan Yayasan TBS Kudus yang
            memiliki kewenangan dalam mengolah data Anda, termasuk Guru, Tata Usaha, dan siswa dengan prosedur yang
            sesuai dengan ketentuan madrasah dan yayasan. Penyalahgunaan data menjadi tanggung jawab pihak yang meminta
            data kepada kami.</p>
        <p class="indent-5 mt-3 mb-3">Selain itu, data Anda juga akan kami bagikan kepada pemerintah, baik melalui website resmi dari pemerintah
            maupun berupa cetak fisiknya, sesuai dengan peraturan pemerintah yang berlaku. </p>
        <h2 class="text-lg font-bold">Cookie</h2>
        <p class="indent-5 mt-3 mb-3">Nidhoma menggunakan cookie dan teknologi pelacakan lainnya untuk meningkatkan pengalaman pengguna. Cookie membantu kami melacak aktivitas pengguna dalam aplikasi dan memberikan layanan yang lebih personal. Anda dapat mengontrol pengaturan cookie pada perangkat yang Anda gunakan.</p>
        <h2 class="text-lg font-bold">Keamanan Data</h2>
        <p class="indent-5 mt-3 mb-3">Data Anda hanya dapat diubah oleh Anda atau siapapun yang menggunakan kredensial Anda untuk mengakses Nidhoma. Selain itu, data juga dapat diubah oleh admin dan developer aplikasi. Setiap pengubahan data akan diinformasikan melalui notifikasi yang bisa Anda akses di aplikasi. Madrasah berkomitmen menjaga data Anda yang ada di Nidhoma namun tidak bertanggung jawab atas data yang sudah dibagikan kepada pihak lain selama pemberian data sudah sesuai prosedur.</p>
        <h2 class="text-lg font-bold">Perubahan Persyaratan Layanan dan Kebijakan Privasi</h2>
        <p class="indent-5 mt-3 mb-3">Persyaratan layanan dan kebijakan privasi ini dapat berubah-ubah setiap waktu. Setiap perubahan akan diinformasikan kepada Anda baik melalui email atau notifikasi. Silakan cek secara berkala untuk mengetahui perubahan yang ada.</p>
        <h2 class="text-lg font-bold">Kontak Kami</h2>
        <p class="indent-5 mt-3 mb-3">Apabila Anda memiliki pertanyaan atau keluhan terkait Nidhoma, silakan hubungi kami melalui mekanisme yang sudah kami sediakan di aplikasi.</p>
        <p class="indent-5 mt-3 mb-3"></p>
    </div>
</template>