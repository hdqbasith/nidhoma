export interface Quiz {
  soal: Soal[],
  jawaban: Jawaban,
  durasi: number
}
export interface Soal extends Record<string, any> {
  st_nomor: number,
  st_mapel: string,
  st_soal: string,
  st_a: string,
  st_b: string,
  st_c: string,
  st_d: string,
  st_e: string,
  st_gambar: string,
  st_jawaban: string,
  st_dir: string
}

export interface Jawaban {
  jt_akun: string,
  jt_waktu_mulai: Date,
  jt_waktu_selesai: Date,
  jt_jawaban: string,
  jt_nilai: number,
  jt_pelanggaran: string,
  jt_mapel: 'string'
}
export interface Jawab extends Record<string, any> {
  nomor: number,
  jawab: string,
  multi?: boolean
}
export interface WaktuTesPeserta {
  tanggal: Date,
  mulai: Date,
  durasi: number,
  jawaban: string
}
export interface Mapel {
  mt_kode: string,
  mt_guru?: string,
  mt_pelajaran: string,
  mt_kelas?: string,
  mt_token: string,
  mt_durasi: number,
  mt_date: string
}