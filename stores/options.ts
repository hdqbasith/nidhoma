import { defineStore } from 'pinia'

export const useOptionsStore = defineStore('options', () => {
    const mcita = [
        { key: "1", value: "PNS" },
        { key: "2", value: "TNI/Polri" },
        { key: "3", value: "Guru/Dosen" },
        { key: "4", value: "Dokter" },
        { key: "5", value: "Politikus" },
        { key: "6", value: "Wiraswasta" },
        { key: "7", value: "Seniman/Artis" },
        { key: "8", value: "Ilmuwan" },
        { key: "9", value: "Agamawan" },
        { key: "0", value: "Lainnya" }
    ]
    const mhobi = [
        { key: "1", value: "Olahraga" },
        { key: "2", value: "Kesenian" },
        { key: "3", value: "Membaca" },
        { key: "4", value: "Menulis" },
        { key: "5", value: "Jalan-Jalan" },
        { key: "6", value: "Lainnya" }
    ]
    const mkerja = [
        { key: "1", value: "Tidak Bekerja" },
        { key: "2", value: "Pensiunan" },
        { key: "3", value: "PNS (Selain poin 05 dan 10)" },
        { key: "4", value: "TNI/Polisi" },
        { key: "5", value: "Guru/Dosen" },
        { key: "6", value: "Pegawai Swasta" },
        { key: "7", value: "Wiraswasta/Wirausaha" },
        { key: "8", value: "Pengacara/Hakim/Jaksa/Notaris" },
        { key: "9", value: "Seniman/Pelukis/Artis/Sejenis" },
        { key: "10", value: "Dokter/Bidan/Perawat" },
        { key: "11", value: "Pilot/Pramugara" },
        { key: "12", value: "Pedagang" },
        { key: "13", value: "Petani/Peternak" },
        { key: "14", value: "Nelayan" },
        { key: "15", value: "Buruh (Tani/Pabrik/Bangunan)" },
        { key: "16", value: "Sopir/Masinis/Kondektur" },
        { key: "17", value: "Politikus" },
        { key: "18", value: "Tidak Tentu" }
    ]
    const mpdd = [
        { key: "0", value: "Tidak Berpendidikan Formal" },
        { key: "1", value: "SD/Sederajat" },
        { key: "2", value: "SMP/Sederajat" },
        { key: "3", value: "SMA/Sederajat" },
        { key: "4", value: "D1" },
        { key: "5", value: "D2" },
        { key: "6", value: "D3" },
        { key: "7", value: "D4/S1" },
        { key: "8", value: "S2" },
        { key: "9", value: "S3" }
    ]
    const mhasil = [
        { key: "1", value: "Kurang dari Rp 500.000" },
        { key: "2", value: "Rp 500.000 - 1.000.000" },
        { key: "3", value: "Rp 1.000.001 - 2.000.000" },
        { key: "4", value: "Rp 2.000.001 - 3.000.000" },
        { key: "5", value: "Rp 3.000.001 - 5.000.000" },
        { key: "6", value: "Lebih dari Rp 5.000.000" }
    ]
    const mrumahstt = [
        { key: "1", value: "Milik Sendiri" },
        { key: "2", value: "Rumah Orang Tua" },
        { key: "3", value: "Rumah Saudara\/Kerabat" },
        { key: "4", value: "Rumah Dinas" },
        { key: "5", value: "Sewa\/Kontrak" },
        { key: "6", value: "Lainnya" }
    ]
    const mhidup = [
        { key: "1", value: "Masih Hidup" },
        { key: "2", value: "Sudah Meninggal" },
        { key: "3", value: "Tidak Diketahui" }
    ]
    const mtmptinggal = [
        { key: "0", value: "Beda dengan Ayah" },
        { key: "1", value: "Sama dengan Ayah" },
        { key: "2", value: "Sama dengan Ibu" }
    ]
    const mtransport = [
        { key: "1", value: "Jalan Kaki" },
        { key: "2", value: "Sepeda" },
        { key: "3", value: "Sepeda Motor" },
        { key: "4", value: "Mobil Pribadi" },
        { key: "6", value: "Angkutan Umum" }
    ]
    const mhubwali = [
        { key: "1", value: "Ayah\/Ibu Kandung" },
        { key: "2", value: "Ayah\/Ibu Tiri" },
        { key: "3", value: "Ayah\/Ibu Angkat" },
        { key: "4", value: "Kerabat dekat (Kakek\/Nenek\/Paman\/Bibi)" },
        { key: "5", value: "Kerabat Jauh" },
        { key: "6", value: "Tidak ada hubungan darah" }
    ]
    const mjarak = [
        { key: "1", value: "Kurang dari 5 Km" },
        { key: "2", value: "Antara 5 - 10 Km" },
        { key: "3", value: "Antara 11 - 20 Km" },
        { key: "4", value: "Antara 21 - 30 Km" },
        { key: "5", value: "Lebih dari 30 Km" }
    ]
    const mjenisrumah = [
        { key: "1", value: "Tinggal dengan Orangtua\/Wali" },
        { key: "2", value: "Ikut Saudara\/Kerabat" },
        { key: "4", value: "Kontrak\/Kost" },
        { key: "5", value: "Pondok Pesantren" },
        { key: "6", value: "Panti Asuhan" },
        { key: "7", value: "Rumah Singgah" },
        { key: "8", value: "Lainnya" }
    ]
    const mjurusan = [
        { key: "1", value: "IPA" },
        { key: "2", value: "IPS" },
        { key: "3", value: "BHS" },
        { key: "4", value: "PK" },
        { key: "9", value: "MPA" }
    ]
    const tpt_tinggal = [
        { key: "1", value: "Beda dengan Ayah" },
        { key: "2", value: "Sama dengan Ayah" },
    ]
    const tpt_tinggal_wali = [
        { key: "1", value: "Beda dengan Ayah/Ibu" },
        { key: "2", value: "Sama dengan Ayah" },
        { key: "3", value: "Sama dengan Ibu" },
    ]
    const provinsi = [
        { key: "11", value: "Aceh" },
        { key: "12", value: "Sumatera Utara" },
        { key: "13", value: "Sumatera Barat" },
        { key: "14", value: "Riau" },
        { key: "15", value: "Jambi" },
        { key: "16", value: "Sumatera Selatan" },
        { key: "17", value: "Bengkulu" },
        { key: "18", value: "Lampung" },
        { key: "19", value: "Kepulauan Bangka Belitung" },
        { key: "21", value: "Kepulauan Riau" },
        { key: "31", value: "Dki Jakarta" },
        { key: "32", value: "Jawa Barat" },
        { key: "33", value: "Jawa Tengah" },
        { key: "34", value: "Daerah Istimewa Yogyakarta" },
        { key: "35", value: "Jawa Timur" },
        { key: "36", value: "Banten" },
        { key: "51", value: "Bali" },
        { key: "52", value: "Nusa Tenggara Barat" },
        { key: "53", value: "Nusa Tenggara Timur" },
        { key: "61", value: "Kalimantan Barat" },
        { key: "62", value: "Kalimantan Tengah" },
        { key: "63", value: "Kalimantan Selatan" },
        { key: "64", value: "Kalimantan Timur" },
        { key: "65", value: "Kalimantan Utara" },
        { key: "71", value: "Sulawesi Utara" },
        { key: "72", value: "Sulawesi Tengah" },
        { key: "73", value: "Sulawesi Selatan" },
        { key: "74", value: "Sulawesi Tenggara" },
        { key: "75", value: "Gorontalo" },
        { key: "76", value: "Sulawesi Barat" },
        { key: "81", value: "Maluku" },
        { key: "82", value: "Maluku Utara" },
        { key: "91", value: "P A P U A" },
        { key: "92", value: "Papua Barat" }
    ]
    return { mcita, mhobi, mkerja, mpdd, mhasil, mrumahstt, mhidup, mtmptinggal, mtransport, mhubwali, mjarak, mjenisrumah, mjurusan, provinsi, tpt_tinggal, tpt_tinggal_wali}
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}