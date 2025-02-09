<script setup lang="ts">
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowRightSquareIcon,
} from "lucide-vue-next";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import type { Jawab, Jawaban, Quiz, Soal } from "./types";
import { toast } from "vue-sonner";
import { range, shuffle } from "lodash";

const client = useSanctumClient();
const urutan = ref();
const nomor = ref(1);
const quiz = await client<Quiz>("/ulangan/soal", {
  method: "get",
  query: {
    mapel: "PPDB_2024",
  },
  onResponseError({ error }) {
    toast.error(error?.message as string);
  },
});
const soal = ref<Soal[]>(shuffle(quiz.soal));
const jawab = ref<Jawab[]>([]);
const mulai = ref(false);
const style = ref({
  biasa: "",
  terpilih: "",
  ragu: "",
});
const soalAktif = computed(() => soal.value[nomor.value - 1]);
const updateJawab = (e: string) => {
  jawab.value[nomor.value - 1] = {
    jawab: e,
    multi: false,
    nomor: soalAktif.value.st_nomor,
  };
};
const pilihan=['a', 'b', 'c', 'd', 'e'];
const hurufArab = ["أ", "ب", "ج", "د", "هـ"];
const angkaArab = (a: string) =>
  a.replace(/\d/g, (d: any) => "٠١٢٣٤٥٦٧٨٩"[d]).replace("!", "");
  const x=setInterval(() => {
    
  }, 1000);
</script>
<template>
  <Card class="m-6" v-if="!mulai">
    <CardHeader>
      <CardTitle>Simulasi Uji Kompetensi</CardTitle>
      <CardDescription
        >Tes ini bertujuan untuk mengukur sejauh mana kesiapan calon siswa dalam
        mengikuti pembelajaran di MA NU TBS Kudus. Kami harap tes ini dikerjakan
        dengan jujur, tanpa bantuan siapapun. Kami tidak bisa mengetahui jika
        Anda melakukan kecurangan dalam mengerjakan tes ini, namun kami yakin
        bahwa bagi Anda yang mengerjakan tes ini dengan jujur, maka Allah akan
        berikan barokah yang luar biasa bagi Anda sekeluarga. Selamat
        mengerjakan...
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button
        >Mulai &nbsp;
        <ArrowRightSquareIcon />
      </Button>
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
  <Card class="m-3" v-else>
    <CardHeader>
      <div class="flex flex-row overflow-x-scroll gap-x-3 pb-3">
        <Button
          v-for="i in range(soal.length)"
          size="sm"
          class="min-w-8"
          variant="outline"
          @click="nomor = i + 1"
          >{{ i + 1 }}</Button
        >
      </div>
      <CardTitle>Soal nomor {{ nomor.toString() }}</CardTitle>
    </CardHeader>
    <CardContent>
      <img :src="soalAktif.st_gambar" v-if="soalAktif.st_gambar" />
      <div
        v-html="
          soalAktif.st_dir != 'rtl'
            ? soalAktif.st_soal
            : angkaArab(soalAktif.st_soal)
        "
        :class="soalAktif.st_dir == 'rtl' && 'text-right'"
      ></div>
      <div v-for="(v, i) in pilihan" :key="'jawab' + v">
        <div
          v-if="
            soalAktif['st_' + v] != null &&
            (soalAktif.st_dir == null || soalAktif.st_dir == 'ltr')
          "
          class="border border-gray-200 p-3 rounded-full hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3"
          v-html="v + '. ' + soalAktif['st_' + v]"
          @click="updateJawab(v)"
        ></div>
        <div
          v-else-if="soalAktif['st_' + v] != null && soalAktif.st_dir == 'rtl'"
          class="border border-gray-200 p-3 rounded-full hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3 text-right"
          v-html="hurufArab[i] + '. ' + angkaArab(soalAktif['st_' + v])"
          @click="updateJawab(v)"
        ></div>
      </div>
    </CardContent>
    <CardFooter class="flex flex-row justify-center gap-x-5">
      <Button
        class="to-teal-900 from-teal-600 bg-gradient-to-b font-bold text-white hover:bg-gradient-to-t focus:bg-gradient-to-l"
        @click="nomor >= 2 ? nomor-- : (nomor = soal.length)"
        ><ArrowBigLeftDash /> Balik</Button
      >
      <Button
        class="to-yellow-600 from-yellow-400 bg-gradient-to-b font-bold hover:bg-gradient-to-t focus:bg-gradient-to-tr"
        >Tandai</Button
      >
      <Button
        class="to-teal-900 from-teal-600 bg-gradient-to-b font-bold text-white hover:bg-gradient-to-t focus:bg-gradient-to-r"
        @click="nomor <= soal.length-1 ? nomor++ : (nomor = 1)"
        >Lanjut <ArrowBigRightDash
      /></Button>
    </CardFooter>
  </Card>
</template>
