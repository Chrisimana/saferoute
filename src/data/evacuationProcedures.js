// Data prosedur evakuasi statis

const evacuationProcedures = [
  {
    id: 'banjir',
    type: 'Banjir',
    icon: '🌊',
    steps: [
      'Pantau informasi cuaca dan peringatan dini dari BMKG dan BPBD setempat.',
      'Matikan aliran listrik di rumah melalui MCB/sekring utama sebelum air masuk.',
      'Pindahkan barang berharga, dokumen penting, dan obat-obatan ke tempat yang lebih tinggi.',
      'Siapkan tas darurat berisi air minum, makanan, pakaian ganti, dan dokumen penting.',
      'Evakuasi segera ke tempat yang lebih tinggi atau titik pengungsian terdekat.',
      'Hindari berjalan atau berkendara melewati genangan air yang tidak diketahui kedalamannya.',
      'Jangan kembali ke rumah sebelum pihak berwenang menyatakan kondisi aman.',
      'Setelah banjir surut, bersihkan rumah dan waspadai kontaminasi air kotor serta penyakit.'
    ]
  },
  {
    id: 'gempa-bumi',
    type: 'Gempa Bumi',
    icon: '🏔️',
    steps: [
      'Saat guncangan terjadi: berlindung di bawah meja kokoh atau di sudut dinding yang kuat.',
      'Lindungi kepala dan leher dengan tangan atau bantal jika tidak ada meja.',
      'Jauhi jendela, kaca, dan benda-benda yang dapat jatuh.',
      'Jangan berlari keluar gedung saat guncangan masih berlangsung.',
      'Setelah guncangan berhenti, segera keluar gedung melalui tangga (jangan gunakan lift).',
      'Berkumpul di titik evakuasi yang telah ditentukan, jauh dari gedung dan tiang listrik.',
      'Periksa kondisi diri sendiri dan orang di sekitar; berikan pertolongan pertama jika diperlukan.',
      'Waspadai gempa susulan dan jauhi bangunan yang rusak.',
      'Ikuti instruksi dari petugas BPBD dan jangan kembali ke dalam gedung sebelum dinyatakan aman.'
    ]
  },
  {
    id: 'tanah-longsor',
    type: 'Tanah Longsor',
    icon: '⛰️',
    steps: [
      'Kenali tanda-tanda awal longsor: retakan tanah, suara gemuruh, air sungai tiba-tiba keruh.',
      'Segera evakuasi ke tempat yang lebih tinggi dan jauh dari lereng berbahaya.',
      'Jauhi lembah, sungai, dan area di bawah lereng curam saat hujan deras.',
      'Jangan kembali ke area terdampak sebelum dinyatakan aman oleh pihak berwenang.',
      'Hubungi BPBD atau nomor darurat untuk melaporkan kejadian dan meminta bantuan.',
      'Bantu evakuasi warga lanjut usia, anak-anak, dan penyandang disabilitas di sekitar Anda.',
      'Setelah longsor berhenti, waspadai longsor susulan terutama saat hujan masih turun.',
      'Dokumentasikan kerusakan untuk keperluan laporan dan bantuan pemulihan.'
    ]
  },
  {
    id: 'tsunami',
    type: 'Tsunami',
    icon: '🌏',
    steps: [
      'Jika merasakan gempa kuat di dekat pantai, segera lari ke tempat tinggi tanpa menunggu peringatan.',
      'Jangan menunggu melihat gelombang — jika tanah bergetar kuat, itu sudah cukup sebagai tanda.',
      'Lari ke daratan tinggi minimal 30 meter di atas permukaan laut atau sejauh 3 km dari pantai.',
      'Jangan kembali ke pantai untuk melihat gelombang — itu sangat berbahaya.',
      'Ikuti jalur evakuasi tsunami yang ditandai dengan rambu hijau.',
      'Jika terjebak di gedung bertingkat, naik ke lantai tertinggi.',
      'Tunggu pengumuman resmi dari BMKG bahwa ancaman tsunami telah berakhir.',
      'Waspadai gelombang susulan yang bisa datang beberapa kali dalam beberapa jam.',
      'Jangan kembali ke zona merah sebelum pihak berwenang menyatakan aman.'
    ]
  },
  {
    id: 'kebakaran',
    type: 'Kebakaran',
    icon: '🔥',
    steps: [
      'Segera aktifkan alarm kebakaran dan teriak "KEBAKARAN" untuk memperingatkan orang lain.',
      'Hubungi pemadam kebakaran di nomor 113 segera.',
      'Jangan gunakan lift — gunakan tangga darurat untuk evakuasi.',
      'Tutup pintu (jangan dikunci) saat meninggalkan ruangan untuk memperlambat penyebaran api.',
      'Jika ada asap, merangkaklah di bawah asap karena udara lebih bersih di dekat lantai.',
      'Sebelum membuka pintu, periksa dengan punggung tangan — jika panas, jangan dibuka.',
      'Berkumpul di titik kumpul yang telah ditentukan di luar gedung.',
      'Jangan kembali masuk ke gedung yang terbakar untuk mengambil barang.',
      'Jika terjebak, tutup celah pintu dengan kain basah dan beri sinyal dari jendela.'
    ]
  },
  {
    id: 'gunung-berapi',
    type: 'Erupsi Gunung Berapi',
    icon: '🌋',
    steps: [
      'Pantau status gunung berapi dari PVMBG (Pusat Vulkanologi dan Mitigasi Bencana Geologi).',
      'Jika status naik ke Level III (Siaga) atau IV (Awas), segera evakuasi dari radius bahaya.',
      'Gunakan masker N95 atau kain basah untuk melindungi saluran pernapasan dari abu vulkanik.',
      'Kenakan pakaian panjang, kacamata, dan helm untuk melindungi dari abu dan batu.',
      'Tutup semua ventilasi rumah, jendela, dan pintu untuk mencegah abu masuk.',
      'Jauhi sungai yang berhulu di gunung berapi — waspadai lahar dingin saat hujan.',
      'Ikuti jalur evakuasi resmi dan jangan kembali sebelum status diturunkan.',
      'Simpan ternak dan hewan peliharaan di kandang tertutup atau bawa serta saat evakuasi.',
      'Setelah erupsi, bersihkan abu dari atap rumah untuk mencegah keruntuhan.'
    ]
  },
  {
    id: 'angin-puting-beliung',
    type: 'Angin Puting Beliung',
    icon: '🌪️',
    steps: [
      'Pantau peringatan cuaca ekstrem dari BMKG melalui aplikasi atau radio.',
      'Segera masuk ke dalam bangunan kokoh — jauhi jendela dan pintu kaca.',
      'Berlindung di ruangan paling dalam di lantai paling bawah (basement jika ada).',
      'Jika di luar ruangan, berbaring rata di tanah rendah dan lindungi kepala dengan tangan.',
      'Jauhi pohon, tiang listrik, papan reklame, dan bangunan tidak kokoh.',
      'Jika di dalam kendaraan, jangan berhenti di bawah jembatan — cari tempat rendah dan berbaring.',
      'Setelah berlalu, waspadai kabel listrik putus, pohon tumbang, dan bangunan rusak.',
      'Laporkan kerusakan dan korban kepada BPBD setempat.',
      'Jangan mendekati area yang masih berbahaya sebelum dinyatakan aman.'
    ]
  },
  {
    id: 'kekeringan',
    type: 'Kekeringan',
    icon: '☀️',
    steps: [
      'Hemat penggunaan air bersih — prioritaskan untuk minum dan memasak.',
      'Tampung air hujan jika tersedia menggunakan wadah bersih.',
      'Hubungi PDAM atau pemerintah daerah untuk mendapatkan pasokan air darurat.',
      'Hindari aktivitas berat di luar ruangan saat suhu sangat tinggi.',
      'Minum air minimal 8 gelas per hari untuk mencegah dehidrasi.',
      'Waspadai kebakaran hutan dan lahan — jangan membakar sampah atau lahan.',
      'Lindungi tanaman dengan mulsa untuk menjaga kelembapan tanah.',
      'Koordinasikan dengan RT/RW untuk distribusi air bersih yang adil.',
      'Ikuti instruksi pemerintah daerah terkait pembatasan penggunaan air.'
    ]
  }
]

export default evacuationProcedures
