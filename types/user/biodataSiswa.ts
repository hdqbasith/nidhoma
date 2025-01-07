

export interface MCita {
    // columns
    cita_id: string
    cita_nama: string | null
}

export interface MHobi {
    // columns
    hobi_id: string
    hobi_nama: string | null
}

export interface MHubWali {
    // columns
    hub_id: string
    hub_nama: string | null
    // relations
    student_bio_guardians: StudentGuardian[]
}

export interface MJarakRumah {
    // columns
    jarak_id: string
    jarak_nama: string | null
    // relations
    student_bio_domiciles: StudentDomicile[]
}

export interface MJenisRumah {
    // columns
    jr_id: string
    jr_nama: string | null
    // relations
    student_bio_domiciles: StudentDomicile[]
}

export interface MPekerjaan {
    // columns
    kerja_id: string
    kerja_nama: string | null
    // relations
    student_bio_fathers: StudentFather[]
    student_bio_guardians: StudentGuardian[]
    student_bio_mothers: StudentMother[]
}

export interface MPendidikan {
    // columns
    pdd_id: string
    pdd_nama: string | null
    // relations
    student_bio_fathers: StudentFather[]
    student_bio_guardians: StudentGuardian[]
    student_bio_mothers: StudentMother[]
}

export interface MPenghasilan {
    // columns
    hasil_id: string
    hasil_nama: string | null
    // relations
    student_bio_fathers: StudentFather[]
    student_bio_guardians: StudentGuardian[]
    student_bio_mothers: StudentMother[]
}

export interface MRumahStatus {
    // columns
    rs_id: string
    rs_nama: string | null
    // relations
    student_bio_fathers: StudentFather[]
    student_bio_guardians: StudentGuardian[]
    student_bio_mothers: StudentMother[]
}

export interface MStatusHidup {
    // columns
    sh_id: string
    sh_nama: string | null
    // relations
    student_bio_fathers: StudentFather[]
    student_bio_mothers: StudentMother[]
}

export interface MTempatTinggal {
    // columns
    tt_id: string
    tt_nama: string | null
    // relations
    student_bio_guardians: StudentGuardian[]
    student_bio_mothers: StudentMother[]
}

export interface MTransport {
    // columns
    transport_id: string
    transport_nama: string | null
    // relations
    student_bio_domiciles: StudentDomicile[]
}

export interface MWilayah {
    // columns
    parent: number
    code: number
    name: string
}

export interface Npsn {
    // columns
    npsn: string
    provinsi: string | null
    kabupaten: string | null
    kecamatan: string | null
    nama: string | null
    status: string | null
    nsm: string | null
}

export interface PondokBiodata {
    // columns
    id: number
    nama: string | null
    pengasuh: string | null
    alamat: string | null
    hp: string | null
    kodepondok: string | null
    // relations
    student_bio_domiciles: StudentDomicile[]
}
export interface StudentDomicile extends Record<string, any> {
    // columns
    m_akun: string
    m_tmp_tinggal: string | null
    m_pondok_kode: string | null
    m_pondok_nama: string | null
    m_pemilik: string | null
    m_hp_pemilik: string | null
    m_propinsi: string | null
    m_kabupaten: string | null
    m_kecamatan: string | null
    m_kelurahan: string | null
    m_rt: number | null
    m_rw: number | null
    m_kode_pos: number | null
    m_alamat: string | null
    m_jarak: string | null
    m_transport: string | null
}

export interface StudentFather extends Record<string, any> {
    // columns
    ak_akun: string
    ak_nama: string | null
    ak_nama_gelar: string | null
    ak_nama_arab: string | null
    ak_nik: number | null
    ak_tmplahir: string | null
    ak_tgllahir: string | null
    ak_status: string | null
    ak_hp: string | null
    ak_pendidikan: string | null
    ak_pekerjaan: string | null
    ak_penghasilan: string | null
    ak_propinsi: string | null
    ak_kabupaten: string | null
    ak_kecamatan: string | null
    ak_kelurahan: string | null
    ak_rt: number | null
    ak_rw: number | null
    ak_kode_pos: number | null
    ak_alamat: string | null
    ak_alamat_arab: string | null
    ak_status_rumah: string | null
    deleted_at: string | null
}

export interface StudentGuardian extends Record<string, any> {
    // columns
    wali_akun: string
    ortu_kepala_keluarga: string | null
    ortu_kk: number | null
    wali_hubungan: string | null
    wali_nama: string | null
    wali_nik: number | null
    wali_tmplahir: string | null
    wali_tgllahir: Date | null
    wali_hp: string | null
    wali_pendidikan: string | null
    wali_pekerjaan: string | null
    wali_penghasilan: string | null
    wali_tpt_tinggal: string | null
    wali_propinsi: string | null
    wali_kabupaten: string | null
    wali_kecamatan: string | null
    wali_kelurahan: string | null
    wali_rt: number | null
    wali_rw: number | null
    wali_kode_pos: number | null
    wali_alamat: string | null
    wali_status_rumah: string | null
}

export interface StudentMother extends Record<string, any> {
    // columns
    ik_akun: string
    ik_nama: string | null
    ik_nik: number | null
    ik_tmplahir: string | null
    ik_tgllahir: string | null
    ik_status: string | null
    ik_hp: string | null
    ik_pendidikan: string | null
    ik_pekerjaan: string | null
    ik_penghasilan: string | null
    ik_tpt_tinggal: string | null
    ik_propinsi: string | null
    ik_kabupaten: string | null
    ik_kecamatan: string | null
    ik_kelurahan: string | null
    ik_rt: number | null
    ik_rw: number | null
    ik_kode_pos: number | null
    ik_alamat: string | null
    ik_status_rumah: string | null
}

export interface StudentPersonal extends Record<string, any> {
    // columns
    s_akun: string
    s_nisn: string | null
    s_nama_lengkap: string | null
    s_nama_arab: string | null
    s_tempat_lahir: string | null
    s_tanggal_lahir: string | null
    s_nik: number | null
    s_anak_ke: number | null
    s_jml_saudara: string | null
    s_email: string | null
    s_hp: string | null
    s_hobi: string | null
    s_citacita: string | null
    s_kk: number | null
    s_kepala_keluarga: string | null
    as_nama: string | null
    as_npsn: string | null
    as_propinsi: string | null
    as_kabupaten: string | null
    as_prov: string | null
    as_kab: string | null
    as_tahun_ajaran: string | null
    as_kelas_mts: string | null
    as_alamat: string | null
    created_at: string | null
    updated_at: string | null
    deleted_at: string | null
}
export interface StudentBiodata {
    dataPersonal: StudentPersonal;
    dataAyah: StudentFather;
    dataIbu: StudentMother;
    dataWali: StudentGuardian;
    dataDomisili: StudentDomicile;
}