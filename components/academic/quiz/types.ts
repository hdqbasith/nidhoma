export interface Quiz {
  soal: Soal[],
  jawaban: Jawaban,
  mapel: Mapel
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
  multi?: boolean|number
}
export interface WaktuTesPeserta {
  tanggal: Date,
  mulai: Date,
  durasi: number,
  jawaban: string,
  pelanggaran: number,
}
export interface Mapel {
  mt_kode: string,
  mt_guru?: string,
  mt_pelajaran: string,
  mt_kelas?: string,
  mt_token: string,
  mt_durasi: number,
  mt_date: string,
  mt_nilai?: number
}
export interface Rekap {
  um_id:            number;
  um_absen:         number;
  um_nisn:          string;
  um_akun:          string;
  um_nama:          string;
  um_sesi:          number;
  um_ruang:         number;
  um_kelas:         string;
  um_mapel:         string;
  um_progres:       string;
  um_nilai:         number;
  um_no_ujian:      string;
  jt_id:            number;
  jt_akun:          string;
  jt_waktu_mulai:   Date;
  jt_waktu_selesai: Date;
  jt_jawaban:       null;
  jt_nilai:         string;
  jt_pelanggaran:   string;
  jt_mapel:         string;
}