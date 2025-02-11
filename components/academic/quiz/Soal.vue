<script setup lang="ts">
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowRightSquareIcon,
  RefreshCcw,
} from "lucide-vue-next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from "~/packages/@core/ui-kit/shadcn-ui";
import type { Jawab, Jawaban, Quiz, Soal, WaktuTesPeserta } from "./types";
import { toast } from "vue-sonner";
import { range, shuffle } from "lodash";
import dayjs, { Dayjs } from "dayjs";

const client = useSanctumClient();
const nomor = ref(1);
const mapel = "PPDB_2024";
const jawab = ref<Jawab[]>([]);
const mulai = ref(false);
const quiz = await client<Quiz>("/ulangan/soal", {
  method: "get",
  query: {
    mapel: mapel,
  },
  onResponseError({ error }) {
    toast.error(error?.message as string);
  },
});
const soal = shuffle(quiz.soal);
console.log(soal);

const simpan = () => {
  const data = ref<string[]>([]);
  jawab.value.forEach((j) => {
    data.value[j.nomor-1] = j.jawab;
  });
  return client<Jawaban>("ulangan/jawaban", {
    method: "post",
    body: {
      mapel: mapel,
      jawaban: data.value.join(","),
      mulai: confirmSelesai.value,
    },
    onResponse({ response }) {
      if(response._data?.jawaban?.jt_waktu_selesai){
        mulai.value=false
        confirmSelesai.value = false;
        clearInterval(timer.value);
        nilai.value=()=>"Nilai: "+response._data.jawaban.jt_nilai
      }
    },
    onResponseError({ error }) {
      toast.error(error?.message as string);
    },
  });
};
const ulangi = ()=>client("ulangan/reset-waktu", {
    method: "get",
    query:{
      mapel:mapel
    },
    onResponse(){
      cekJawaban();
    },
    onResponseError({ error }) {
      toast.error(error?.message as string);
    },
  });
const timer = ref();
const cekJawaban = async () => {
  const data = await client<WaktuTesPeserta>("ulangan/jawaban", {
    method: "get",
    query: {
      mapel: mapel,
    },
    onResponseError({ error }) {
      toast.error(error?.message as string);
    },
  });
  console.log(data);

  waktu.value =
    data.durasi * 60 * 1000 -
    (Date.now() - (new Date(data.mulai).getTime() ?? Date.now()));

  if (data.jawaban) {
    const arrayJawaban = data.jawaban.split(",");
    console.log(soal);
    
    soal.forEach((s, i) => {
      jawab.value[i] = {
        jawab: arrayJawaban[s.st_nomor-1],
        nomor: s.st_nomor,
      };
    });
  } else {
    soal.forEach((s, i) => {
      jawab.value[i] = {
        jawab: "",
        nomor: s.st_nomor,
      };
    });
  }
  console.log(waktu.value);

  if (waktu.value > 0) {
    if (!mulai.value) {
      mulai.value = true;
      const simpanPerMenit=ref(0);
      timer.value = setInterval(() => {
        if (waktu.value >= 0) {
          waktu.value -= 1000;
          simpanPerMenit.value++;
          if(simpanPerMenit.value==60){
            simpanPerMenit.value=0;
            simpan();
          }
        } else {
          clearInterval(timer.value);
          mulai.value = false;
          confirmSelesai.value=true;
          toast.promise(simpan(), {
            loading: "Mengirim jawaban...",
            success: (r: any) => {
              confirmSelesai.value=false;
              toast.success("Jawaban terkirim. Alhamdulillah...");
            },
            error: () => "Gagal",
            duration: 2000,
          });
        }
      }, 1000);
    }
  } else{
    toast.error('Mohon maaf, waktu mengerjakan sudah habis!');
    nilai.value=()=>'Nilai: '+quiz?.jawaban?.jt_nilai;
  }
};
const style = {
  biasa: "bg-none",
  terpilih: "bg-gradient-to-b from-teal-600 to-teal-900 text-white",
  ragu: "bg-gradient-to-b from-yellow-600 to-yellow-900",
};
const soalAktif = computed(() => soal[nomor.value - 1]);
const updateJawab = (e: string) => {
  jawab.value[nomor.value - 1] = {
    jawab: e,
    nomor: soalAktif.value.st_nomor,
  };
};
const pilihan = ["a", "b", "c", "d", "e"];
const hurufArab = ["أ", "ب", "ج", "د", "هـ"];
const angkaArab = (a: string) =>
  a.replace(/\d/g, (d: any) => "٠١٢٣٤٥٦٧٨٩"[d]).replace("!", "");
const waktu = ref(0);
const tandai = () => {
  if (jawab.value[nomor.value - 1].jawab == "r") {
    jawab.value[nomor.value - 1] = {
      jawab: "",
      nomor: soalAktif.value.st_nomor,
    };
  } else {
    jawab.value[nomor.value - 1] = {
      jawab: "r",
      nomor: soalAktif.value.st_nomor,
    };
  }
};
const rekap = ref({
  terjawab: computed(
    () =>
      soal.length -
      jawab.value.filter(j => j.jawab == ""|| j.jawab=="r").length
  ),
  kosong: computed(
    () => jawab.value.filter(j => j.jawab == ""|| j.jawab=="r").length
  ),
  ragu: computed(() => jawab.value.filter(j => j.jawab == "r").length),
});
const confirmSelesai = ref(false);
const sisaWaktu = computed(() => {
  return new Date(waktu.value).toISOString().slice(11, 19);
});
const nilai=ref(()=>{
  if (quiz?.jawaban?.jt_waktu_selesai){
    return 'Nilai: '+quiz?.jawaban?.jt_nilai
  } else{
    return 'Klik tombol di atas untuk memulai'
  }
})
</script>
<template>
  <div>
    <Card class="m-6" v-if="!mulai">
      <CardHeader>
        <CardTitle>Simulasi Uji Kompetensi</CardTitle>
        <CardDescription
          >
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Tes ini bertujuan untuk mengukur sejauh mana kesiapan calon siswa
          dalam mengikuti pembelajaran di MA NU TBS Kudus. Kami harap tes ini
          dikerjakan dengan jujur, tanpa bantuan siapapun. Kami tidak bisa
          mengetahui jika Anda melakukan kecurangan dalam mengerjakan tes ini,
          namun kami yakin bahwa bagi Anda yang mengerjakan tes ini dengan
          jujur, maka Allah akan berikan barokah yang luar biasa bagi Anda
          sekeluarga. Selamat mengerjakan...</p>
        <Button @click="cekJawaban" class="my-3" v-if="nilai()=='Klik tombol di atas untuk memulai'"
          >Mulai &nbsp;
          <ArrowRightSquareIcon />
        </Button>
        <div v-else>
          <p class="my-3 font-bold">{{ nilai() }}</p>
          <Button @click="ulangi">
            <RefreshCcw/>&nbsp;Ulangi
          </Button>
        </div>
      </CardContent>
      <CardFooter> </CardFooter>
    </Card>
    <Card class="m-3" v-else>
      <CardHeader>
        <div
          class="text-xs absolute right-7 top-1 text-blue-800 dark:text-blue-400"
        >
          Waktu Tersisa:
          {{ sisaWaktu }}
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
            v-if="soalAktif['st_' + v] && soalAktif.st_dir != 'rtl'"
            class="border border-gray-200 p-3 rounded-full hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3"
            :class="
              jawab[nomor - 1]?.jawab == v
                ? style.terpilih
                : jawab[nomor - 1]?.jawab == 'r'
                ? style.ragu
                : style.biasa
            "
            v-html="v + '. ' + soalAktif['st_' + v]"
            @click="updateJawab(v)"
          ></div>
          <div
            v-else-if="soalAktif['st_' + v] && soalAktif.st_dir == 'rtl'"
            class="border border-gray-200 p-3 rounded-full hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3 text-right"
            v-html="hurufArab[i] + '. ' + angkaArab(soalAktif['st_' + v])"
            @click="updateJawab(v)"
            :class="
              jawab[nomor - 1]?.jawab == v
                ? style.terpilih
                : jawab[nomor - 1]?.jawab == 'r'
                ? style.ragu
                : style.biasa
            "
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
          class="to-yellow-800 from-yellow-500 bg-gradient-to-b font-bold hover:bg-gradient-to-t focus:bg-gradient-to-tr"
          @click="tandai"
          >Tandai</Button
        >
        <Button
          class="to-teal-900 from-teal-600 bg-gradient-to-b font-bold text-white hover:bg-gradient-to-t focus:bg-gradient-to-r"
          @click="nomor <= soal.length - 1 ? nomor++ : (nomor = 1)"
          >Lanjut <ArrowBigRightDash
        /></Button>
      </CardFooter>
    </Card>
    <Card class="m-3" v-if="mulai">
      <CardHeader>
        <CardTitle>Jawaban</CardTitle>
        <CardDescription>Rekapitulasi jawaban Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-3 pb-3">
          <Button
            v-for="i in range(soal.length)"
            size="sm"
            class="min-w-8"
            variant="outline"
            @click="nomor = i + 1"
            :class="
              jawab[i]?.jawab == 'r'
                ? style.ragu
                : jawab[i]?.jawab == ''
                ? style.biasa
                : style.terpilih
            "
            >{{ i + 1 }}</Button
          >
        </div>
        <ul class="list-disc ms-7 w-40">
          <li>
            Terjawab
            <span class="absolute left-40 font-bold">
              : {{ rekap.terjawab }}
            </span>
          </li>
          <li>
            Kosong<span class="absolute left-40 font-bold">
              : {{ rekap.kosong }}
            </span>
          </li>
          <li>
            Ragu-Ragu<span class="absolute left-40 font-bold">
              : {{ rekap.ragu }}
            </span>
          </li>
          <li>
            Sisa Waktu<span class="absolute left-40 font-bold">
              : {{ sisaWaktu }}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog modal v-model:open="confirmSelesai">
          <DialogTrigger>
            <Button>Kirim Jawaban</Button>
          </DialogTrigger>
          <DialogScrollContent>
            <DialogHeader>
              <DialogTitle>Sudah Selesai?</DialogTitle>
              <DialogDescription>
                Jawaban Anda akan dikirim ke server dan Anda tidak akan bisa
                mengubah jawaban Anda. Anda yakin?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter class="flex flex-row">
              <Button @click="confirmSelesai = false" variant="destructive">Tidak</Button>
              <Button @click="simpan">Ya</Button>
            </DialogFooter>
          </DialogScrollContent>
        </Dialog>
      </CardFooter>
    </Card>
  </div>
</template>
