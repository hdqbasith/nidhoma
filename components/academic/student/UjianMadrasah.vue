<script setup lang="ts">
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowRightSquareIcon,
  RefreshCcw,
  Unlock,
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
  Input,
} from "~/packages/@core/ui-kit/shadcn-ui";
import type {
  Jawab,
  Jawaban,
  Quiz,
  Soal,
  WaktuTesPeserta,
} from "../quiz/types";
import { toast } from "vue-sonner";
import { method, range, shuffle } from "lodash";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "~/lib/utils";
import { useAccessStore } from "~/packages/stores";
import { useRefresh } from "~/packages/effects/hooks";

const client = useSanctumClient();
const nomor = ref(1);
const query = useRoute().query;
const mapel = query?.mapel;
if (!mapel) {
  toast.error("Mohon maaf, mapel ini tidak tersedia");
  useRouter().replace("/student/jadwal-um");
}
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
const pelanggaran = ref(0);
const access = useAccessStore();
const simpan = () => {
  const data = ref<string[]>([]);
  jawab.value.forEach((j) => {
    data.value[j.nomor - 1] = j.jawab.split("|").join("");
  });
  client("/ulangan/verify-um", {
    method: "get",
    query: {
      token: access.accessToken,
      terjawab: rekap.value.terjawab,
    },
    onResponse({ response }) {
      if (response._data == "gagal") {
        navigateTo("/dashboard");
        toast.error(
          "Silakan minta Admin untuk mereset jawaban Anda karena Anda login ulang!"
        );
      }
    },
  });
  return client<Jawaban>("/ulangan/jawaban", {
    method: "post",
    body: {
      mapel: mapel,
      jawaban: data.value.join(","),
      mulai: confirmSelesai.value,
      pelanggaran: pelanggaran.value,
    },
    onResponse({ response }) {
      if (response._data?.jawaban?.jt_waktu_selesai) {
        mulai.value = false;
        confirmSelesai.value = false;
        clearInterval(timer.value);
        nilai.value = () => "Nilai: " + response._data.jawaban.jt_nilai;
      }
    },
    onResponseError({ error }) {
      toast.error(error?.message as string);
    },
  });
};
const timer = ref();
const token = ref();
const blur = ref();
const batas60menit = ref(60 * 60 * 1000);
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

  waktu.value =
    data.durasi * 60 * 1000 -
    (Date.now() - (new Date(data.mulai).getTime() ?? Date.now()));

  const arrayJawaban = data.jawaban?.split(",");
  soal.forEach((s, i) => {
    jawab.value[i] = {
      jawab: data.jawaban
        ? arrayJawaban[s.st_nomor - 1]
        : s.st_jawaban.length == 1
        ? ""
        : "||||",
      nomor: s.st_nomor,
      multi: s.st_jawaban.length == 1 ? false : true,
    };
    if (s.st_jawaban.length > 1) {
      let temp=Array(5);
      const tempJawab=[...jawab.value[i].jawab]
      tempJawab.forEach((t)=>{
        if(t=='a') temp[0]='a';
        if(t=='b') temp[1]='b';
        if(t=='c') temp[2]='c';
        if(t=='d') temp[3]='d';
        if(t=='e') temp[4]='e';
      })
      jawab.value[i].jawab = temp.join("|");
    }
  });
  pelanggaran.value = data.pelanggaran;
  // if (data.jawaban) {
  //   const arrayJawaban = data.jawaban.split(",");
  //   soal.forEach((s, i) => {
  //     jawab.value[i] = {
  //       jawab: arrayJawaban[s.st_nomor - 1],
  //       nomor: s.st_nomor,
  //       multi: s.st_jawaban.length==1? false:s.st_jawaban.length
  //     };
  //   });
  //   pelanggaran.value = data.pelanggaran;
  // } else {
  //   soal.forEach((s, i) => {
  //     jawab.value[i] = {
  //       jawab: "",
  //       nomor: s.st_nomor,
  //       multi: s.st_jawaban.length==1? false:s.st_jawaban.length
  //     };
  //   });
  // }
  batas60menit.value =
    batas60menit.value - data.durasi * 60 * 1000 + waktu.value;
  if (waktu.value > 0) {
    if (!mulai.value) {
      mulai.value = true;
      const simpanPerMenit = ref(0);
      timer.value = setInterval(() => {
        if (waktu.value > 0) {
          if (batas60menit.value > 0) {
            batas60menit.value -= 1000;
          } else {
            batas60menit.value = 0;
          }
          waktu.value -= 1000;
          simpanPerMenit.value++;
          if (simpanPerMenit.value == 30) {
            simpanPerMenit.value = 0;
            simpan();
            lock("");
          }
          blur.value++;
        } else {
          clearInterval(timer.value);
          mulai.value = false;
          confirmSelesai.value = true;
          toast.promise(simpan(), {
            loading: "Mengirim jawaban...",
            success: (r: any) => {
              confirmSelesai.value = false;
              toast.success("Jawaban terkirim. Alhamdulillah...");
            },
            error: () => "Gagal",
            duration: 2000,
          });
        }
      }, 1000);
    }
  } else {
    toast.error("Mohon maaf, waktu mengerjakan sudah habis!");
    nilai.value = () => "Nilai: " + quiz?.jawaban?.jt_nilai;
  }
};
const style = {
  biasa: "bg-none",
  terpilih: "bg-gradient-to-b from-teal-600 to-teal-900 text-white",
  ragu: "bg-gradient-to-b from-yellow-600 to-yellow-900",
};
const soalAktif = computed(() => soal[nomor.value - 1]);
const updateJawab = (e: string) => {
  // Jika soal ditandai (ragu), klik jawaban akan mengubah ke jawaban normal
  if (jawab.value[nomor.value - 1].jawab == "r") {
    if (jawab.value[nomor.value - 1].multi == false) {
      jawab.value[nomor.value - 1].jawab = e;
      jawab.value[nomor.value - 1].nomor = soalAktif.value.st_nomor;
    } else {
      let temp = ["", "", "", "", ""];
      switch (e) {
        case "a": temp[0] = "a"; break;
        case "b": temp[1] = "b"; break;
        case "c": temp[2] = "c"; break;
        case "d": temp[3] = "d"; break;
        case "e": temp[4] = "e"; break;
      }
      jawab.value[nomor.value - 1].jawab = temp.join("|");
      jawab.value[nomor.value - 1].nomor = soalAktif.value.st_nomor;
    }
    return;
  }
  if (jawab.value[nomor.value - 1].multi == false) {
    jawab.value[nomor.value - 1].jawab = e;
    jawab.value[nomor.value - 1].nomor = soalAktif.value.st_nomor;
  } else {
    let temp = jawab.value[nomor.value - 1].jawab.split("|");
    switch (e) {
      case "a": temp[0] = temp[0] == "" ? "a" : ""; break;
      case "b": temp[1] = temp[1] == "" ? "b" : ""; break;
      case "c": temp[2] = temp[2] == "" ? "c" : ""; break;
      case "d": temp[3] = temp[3] == "" ? "d" : ""; break;
      case "e": temp[4] = temp[4] == "" ? "e" : ""; break;
    }
    if (temp.filter((t) => t != "").length <= soalAktif.value.st_jawaban.length) {
      jawab.value[nomor.value - 1].jawab = temp.join("|");
      jawab.value[nomor.value - 1].nomor = soalAktif.value.st_nomor;
    }
  }
};
const pilihan = ["a", "b", "c", "d", "e"];
const hurufArab = ["أ", "ب", "ج", "د", "هـ"];
const angkaArab = (a: string) =>
  a.replace(/\d/g, (d: any) => "٠١٢٣٤٥٦٧٨٩"[d]).replace("!", "");
const waktu = ref(0);
const tandai = () => {
  const currentJawab = jawab.value[nomor.value - 1];
  if (currentJawab.jawab == "r") {
    currentJawab.jawab = currentJawab.multi ? "||||" : "";
  } else {
    currentJawab.jawab = "r";
  }
};
const rekap = ref({
  terjawab: computed(
    () =>
      jawab.value.filter(
        (j) => (j.multi==false  && j.jawab != "r" && j.jawab.length==1) || (j.multi==true && j.jawab.length==7)
      ).length
  ),
  kosong: computed(
    () =>
      soal.length -
      jawab.value.filter(
        (j) => j.jawab.length >= 1 && j.jawab != "r" && j.jawab!="||||"
      ).length
  ),
  ragu: computed(() => jawab.value.filter((j) => j.jawab == "r").length),
});
const confirmSelesai = ref(false);
const sisaWaktu = computed(() => {
  return new Date(waktu.value).toISOString().slice(11, 19);
});
const nilai = ref(() => {
  if (quiz?.jawaban?.jt_waktu_selesai) {
    return "Nilai: " + quiz?.jawaban?.jt_nilai;
  } else {
    return "Klik tombol di atas untuk memulai";
  }
});
window.onblur = function () {
  blur.value = 0;
};
const lock = (aksi: string) => {
  client("ulangan/lock", {
    method: "post",
    body: {
      aksi: aksi,
      pelanggaran: pelanggaran.value,
      mapel:mapel
    },
    onResponse({ response }) {
      if (response._data.locked) {
        toast.error("Silakan temui Admin untuk membuka akses");
        locked.value = true;
      } else {
        locked.value = false;
      }
    },
  });
};
onMounted(() => {
  lock("");
});
onBeforeUnmount(()=>{
  clearInterval(timer.value)
})
window.onfocus = function () {
  if (blur.value >= 3) {
    pelanggaran.value++;
  }
  if (blur.value >= 10) {
    lock("lock");
    simpan().finally(()=>{
      reloadNuxtApp();
    })
  }
};
const aturan = [
  "Token akan diberitahukan oleh pengawas ruangan",
  "Tombol mulai akan aktif jika Anda memasukkan token dengan benar",
  "Perhatikan waktu tersisa yang ada di pojok kanan atas dan di atas tombol kirim jawaban.",
  "Jawaban akan terkirim otomatis jika waktu habis",
  "Setiap Anda berpindah tab/aplikasi, maka akan terhitung sebagai 1 pelanggaran",
  "Jika Anda berpindah tab/aplikasi, maka soal Anda akan terkunci",
  "Soal yang terkunci hanya bisa dibuka oleh Admin (Panitia Khusus)",
  "<b>Admin berhak mereset pengerjaan soal yang terkunci tanpa harus menjelaskan alasannya</b>",
  "Mulailah dengan bismillah agar ujian ini penuh berkah",
];
const locked = ref(false);
const ScrollToTop = () => {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
};
</script>
<template>
  <div v-if="!locked">
    <Card class="m-6" v-if="!mulai">
      <CardHeader>
        <CardTitle>Ujian Madrasah {{ quiz.mapel.mt_pelajaran }}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <!-- <p>Tes ini bertujuan untuk mengukur sejauh mana kesiapan calon siswa
          dalam mengikuti pembelajaran di MA NU TBS Kudus. Kami harap tes ini
          dikerjakan dengan jujur, tanpa bantuan siapapun. Kami tidak bisa
          mengetahui jika Anda melakukan kecurangan dalam mengerjakan tes ini,
          namun kami yakin bahwa bagi Anda yang mengerjakan tes ini dengan
          jujur, maka Allah akan berikan barokah yang luar biasa bagi Anda
          sekeluarga. Selamat mengerjakan...</p> -->
        <div v-if="nilai() == 'Klik tombol di atas untuk memulai'">
          <h2 class="text-red-500 font-bold mb-3">Perhatian Penting!</h2>
          <ol class="list-decimal ms-3">
            <li v-for="a in aturan" class="mt-2" v-html="a"></li>
          </ol>
          <p
            class="mt-5 w-52 font-bold text-teal-700 dark:text-teal-300 [text-shadow:_0_2px_4px_yellow]"
          >
            Masukkan Token:
          </p>
          <Input
            class="mt-2"
            :model-value="token"
            @update:model-value="token = $event as string"
          />
          <Button
            @click="cekJawaban"
            :disabled="token != quiz.mapel.mt_token"
            class="my-3"
            >Mulai &nbsp;
            <ArrowRightSquareIcon />
          </Button>
        </div>
        <div v-else>
          <p>
            Alhamdulillah, terima kasih telah mengikuti Ujian Madrasah
            {{ quiz.mapel.mt_pelajaran }} ini. Semoga ilmu yang Anda dapatkan
            bisa berkah dan manfaat bagi diri Anda khususnya, dan bagi
            orang-orang di sekitar Anda. Amin...
          </p>
          <p class="my-3 font-bold">{{ nilai() }}</p>
          <!-- <Button @click="ulangi">
            <RefreshCcw/>&nbsp;Ulangi
          </Button> -->
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
        <CardTitle>Soal nomor {{ nomor.toString() }} {{ quiz.mapel.mt_pelajaran }}</CardTitle>
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
          <template v-if="soalAktif.st_jawaban.length == 1">
            <div
              v-if="soalAktif['st_' + v] && soalAktif.st_dir != 'rtl'"
              class="border border-gray-200 p-3 rounded-sm hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3"
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
              class="border border-gray-200 p-3 rounded-sm hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3 text-right"
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
          </template>
          <template v-else>
            <div
              v-if="soalAktif['st_' + v] && soalAktif.st_dir != 'rtl'"
              class="border border-gray-200 p-3 rounded-sm hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3"
              :class="
                jawab[nomor - 1]?.jawab.includes(v)
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
              class="border border-gray-200 p-3 rounded-sm hover:bg-gradient-to-b hover:from-teal-600 hover:to-teal-900 hover:text-white cursor-pointer indent-3 my-3 text-right"
              v-html="hurufArab[i] + '. ' + angkaArab(soalAktif['st_' + v])"
              @click="updateJawab(v)"
              :class="
                jawab[nomor - 1]?.jawab.includes(v)
                  ? style.terpilih
                  : jawab[nomor - 1]?.jawab == 'r'
                  ? style.ragu
                  : style.biasa
              "
            ></div>
          </template>
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
        <CardTitle>Jawaban {{ quiz.mapel.mt_pelajaran }}</CardTitle>
        <CardDescription>Rekapitulasi jawaban Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-3 pb-3">
          <Button
            v-for="i in range(soal.length)"
            size="sm"
            class="min-w-8"
            variant="outline"
            @click="
              {
                nomor = i + 1;
                ScrollToTop();
              }
            "
            :class="
              cn(
                nomor == i + 1 ? 'shadow-yellow-500 shadow-md' : '',
                jawab[i]?.jawab == 'r'
                  ? style.ragu
                  : jawab[i]?.jawab == ''
                  ? style.biasa
                  : jawab[i].multi == false
                  ? style.terpilih
                  : jawab[i].jawab.length - 4 == 3
                  ? style.terpilih
                  : style.biasa
              )
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
          <li>
            Pindah tab<span class="absolute left-40 font-bold">
              : {{ pelanggaran }} kali
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog modal v-model:open="confirmSelesai">
          <DialogTrigger :disabled="batas60menit > 0">
            <Button :disabled="batas60menit > 0"
              >Kirim Jawaban
              {{
                batas60menit > 0
                  ? new Date(batas60menit).toISOString().slice(11, 19)
                  : ""
              }}</Button
            >
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
              <Button @click="confirmSelesai = false" variant="destructive"
                >Tidak</Button
              >
              <Button @click="simpan">Ya</Button>
            </DialogFooter>
          </DialogScrollContent>
        </Dialog>
      </CardFooter>
    </Card>
  </div>
  <Card v-else>
    <CardHeader>
      <CardTitle>Terkunci</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        Akun Anda kami kunci karena Anda berpindah dari aplikasi. Silakan
        hubungi Admin untuk membuka kembali akun Anda. Setelah admin membuka
        akun Anda, silakan klik tombol di bawah ini.
      </p>
      <Button class="mt-3" variant="blue" @click="lock('')"
        ><Unlock :size="16" />
        &nbsp;Buka akses
      </Button>
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>
