// Data titik evakuasi seluruh provinsi Indonesia

const evacuationPoints = [
  // ── ACEH ──
  { id: 'evac-ac-001', province: 'Aceh', name: 'Stadion H. Dimurthala', address: 'Jl. Tengku Daud Beureueh, Banda Aceh', capacity: 8000, coordinates: { lat: 5.5483, lon: 95.3238 } },
  { id: 'evac-ac-002', province: 'Aceh', name: 'Lapangan Blang Padang', address: 'Jl. Teuku Umar, Banda Aceh', capacity: 5000, coordinates: { lat: 5.5500, lon: 95.3175 } },
  { id: 'evac-ac-003', province: 'Aceh', name: 'GOR Lhokseumawe', address: 'Jl. Merdeka, Lhokseumawe', capacity: 3000, coordinates: { lat: 5.1801, lon: 97.1500 } },

  // ── SUMATERA UTARA ──
  { id: 'evac-su-001', province: 'Sumatera Utara', name: 'Stadion Teladan', address: 'Jl. Stadion, Medan', capacity: 10000, coordinates: { lat: 3.5952, lon: 98.6722 } },
  { id: 'evac-su-002', province: 'Sumatera Utara', name: 'Lapangan Merdeka Medan', address: 'Jl. Balai Kota, Medan Barat', capacity: 6000, coordinates: { lat: 3.5896, lon: 98.6739 } },
  { id: 'evac-su-003', province: 'Sumatera Utara', name: 'GOR Pematangsiantar', address: 'Jl. Merdeka, Pematangsiantar', capacity: 3000, coordinates: { lat: 2.9595, lon: 99.0687 } },

  // ── SUMATERA BARAT ──
  { id: 'evac-sb-001', province: 'Sumatera Barat', name: 'Stadion H. Agus Salim', address: 'Jl. Agus Salim, Padang', capacity: 8000, coordinates: { lat: -0.9471, lon: 100.3543 } },
  { id: 'evac-sb-002', province: 'Sumatera Barat', name: 'Lapangan Imam Bonjol Padang', address: 'Jl. Imam Bonjol, Padang', capacity: 4000, coordinates: { lat: -0.9492, lon: 100.3543 } },
  { id: 'evac-sb-003', province: 'Sumatera Barat', name: 'GOR Bukittinggi', address: 'Jl. Sudirman, Bukittinggi', capacity: 2500, coordinates: { lat: -0.3055, lon: 100.3691 } },

  // ── RIAU ──
  { id: 'evac-ri-001', province: 'Riau', name: 'Stadion Kaharuddin Nasution', address: 'Jl. Nangka, Pekanbaru', capacity: 7000, coordinates: { lat: 0.5071, lon: 101.4478 } },
  { id: 'evac-ri-002', province: 'Riau', name: 'Lapangan Kantor Gubernur Riau', address: 'Jl. Jend. Sudirman, Pekanbaru', capacity: 3000, coordinates: { lat: 0.5335, lon: 101.4474 } },

  // ── KEPULAUAN RIAU ──
  { id: 'evac-kr-001', province: 'Kepulauan Riau', name: 'Stadion Temenggung Abdul Jamal', address: 'Jl. Hang Jebat, Batam', capacity: 5000, coordinates: { lat: 1.1301, lon: 104.0529 } },
  { id: 'evac-kr-002', province: 'Kepulauan Riau', name: 'Lapangan Engku Putri Batam Centre', address: 'Batam Centre, Batam', capacity: 4000, coordinates: { lat: 1.1456, lon: 104.0521 } },

  // ── JAMBI ──
  { id: 'evac-jb-001', province: 'Jambi', name: 'Stadion Kota Baru Jambi', address: 'Jl. Kol. Abunjani, Jambi', capacity: 5000, coordinates: { lat: -1.6101, lon: 103.6131 } },
  { id: 'evac-jb-002', province: 'Jambi', name: 'Lapangan Gubernuran Jambi', address: 'Jl. Ahmad Yani, Jambi', capacity: 2500, coordinates: { lat: -1.5997, lon: 103.5951 } },

  // ── SUMATERA SELATAN ──
  { id: 'evac-ss-001', province: 'Sumatera Selatan', name: 'Stadion Gelora Sriwijaya Jakabaring', address: 'Jl. Gubernur H. A. Bastari, Palembang', capacity: 23000, coordinates: { lat: -2.9833, lon: 104.7667 } },
  { id: 'evac-ss-002', province: 'Sumatera Selatan', name: 'Lapangan Merdeka Palembang', address: 'Jl. Merdeka, Palembang', capacity: 5000, coordinates: { lat: -2.9761, lon: 104.7754 } },

  // ── BANGKA BELITUNG ──
  { id: 'evac-bb-001', province: 'Bangka Belitung', name: 'Stadion Depati Amir', address: 'Jl. Depati Amir, Pangkalpinang', capacity: 4000, coordinates: { lat: -2.1316, lon: 106.1169 } },
  { id: 'evac-bb-002', province: 'Bangka Belitung', name: 'Lapangan Merdeka Pangkalpinang', address: 'Jl. Merdeka, Pangkalpinang', capacity: 2000, coordinates: { lat: -2.1296, lon: 106.1169 } },

  // ── BENGKULU ──
  { id: 'evac-be-001', province: 'Bengkulu', name: 'Stadion Semarak Bengkulu', address: 'Jl. Pembangunan, Bengkulu', capacity: 4000, coordinates: { lat: -3.7928, lon: 102.2608 } },
  { id: 'evac-be-002', province: 'Bengkulu', name: 'Lapangan Pantai Panjang', address: 'Jl. Pantai Panjang, Bengkulu', capacity: 3000, coordinates: { lat: -3.8267, lon: 102.2700 } },

  // ── LAMPUNG ──
  { id: 'evac-la-001', province: 'Lampung', name: 'Stadion Pahoman', address: 'Jl. Wolter Monginsidi, Bandar Lampung', capacity: 6000, coordinates: { lat: -5.4294, lon: 105.2627 } },
  { id: 'evac-la-002', province: 'Lampung', name: 'Lapangan Saburai Bandar Lampung', address: 'Jl. Jend. Sudirman, Bandar Lampung', capacity: 3000, coordinates: { lat: -5.3971, lon: 105.2664 } },

  // ── DKI JAKARTA ──
  { id: 'evac-jk-001', province: 'DKI Jakarta', name: 'Lapangan Monas', address: 'Gambir, Jakarta Pusat', capacity: 10000, coordinates: { lat: -6.1754, lon: 106.8272 } },
  { id: 'evac-jk-002', province: 'DKI Jakarta', name: 'Stadion Gelora Bung Karno', address: 'Jl. Pintu Satu Senayan, Jakarta Pusat', capacity: 15000, coordinates: { lat: -6.2183, lon: 106.8023 } },
  { id: 'evac-jk-003', province: 'DKI Jakarta', name: 'GOR Soemantri Brodjonegoro', address: 'Jl. H.R. Rasuna Said, Jakarta Selatan', capacity: 2000, coordinates: { lat: -6.2297, lon: 106.8310 } },
  { id: 'evac-jk-004', province: 'DKI Jakarta', name: 'Taman Impian Jaya Ancol', address: 'Jl. Lodan Timur No.7, Jakarta Utara', capacity: 5000, coordinates: { lat: -6.1228, lon: 106.8348 } },
  { id: 'evac-jk-005', province: 'DKI Jakarta', name: 'Lapangan Banteng', address: 'Jl. Lapangan Banteng Utara, Jakarta Pusat', capacity: 3000, coordinates: { lat: -6.1694, lon: 106.8340 } },

  // ── JAWA BARAT ──
  { id: 'evac-jb2-001', province: 'Jawa Barat', name: 'Stadion Gelora Bandung Lautan Api', address: 'Jl. Ahmad Yani, Bandung', capacity: 38000, coordinates: { lat: -6.9239, lon: 107.6391 } },
  { id: 'evac-jb2-002', province: 'Jawa Barat', name: 'Lapangan Gasibu Bandung', address: 'Jl. Diponegoro, Bandung', capacity: 5000, coordinates: { lat: -6.9022, lon: 107.6186 } },
  { id: 'evac-jb2-003', province: 'Jawa Barat', name: 'Stadion Pakansari Bogor', address: 'Jl. Pakansari, Cibinong, Bogor', capacity: 30000, coordinates: { lat: -6.4833, lon: 106.8500 } },
  { id: 'evac-jb2-004', province: 'Jawa Barat', name: 'GOR Purnawarman Purwakarta', address: 'Jl. Purnawarman, Purwakarta', capacity: 3000, coordinates: { lat: -6.5564, lon: 107.4431 } },

  // ── BANTEN ──
  { id: 'evac-bt-001', province: 'Banten', name: 'Stadion Maulana Yusuf', address: 'Jl. Syech Nawawi Al-Bantani, Serang', capacity: 5000, coordinates: { lat: -6.1201, lon: 106.1503 } },
  { id: 'evac-bt-002', province: 'Banten', name: 'Alun-Alun Kota Serang', address: 'Jl. Veteran, Serang', capacity: 3000, coordinates: { lat: -6.1201, lon: 106.1503 } },
  { id: 'evac-bt-003', province: 'Banten', name: 'Stadion Ciracas Tangerang', address: 'Jl. Daan Mogot, Tangerang', capacity: 4000, coordinates: { lat: -6.1783, lon: 106.6319 } },

  // ── JAWA TENGAH ──
  { id: 'evac-jt-001', province: 'Jawa Tengah', name: 'Stadion Jatidiri Semarang', address: 'Jl. Karangrejo, Semarang', capacity: 25000, coordinates: { lat: -7.0051, lon: 110.4381 } },
  { id: 'evac-jt-002', province: 'Jawa Tengah', name: 'Lapangan Pancasila Semarang', address: 'Jl. Pemuda, Semarang', capacity: 4000, coordinates: { lat: -6.9932, lon: 110.4203 } },
  { id: 'evac-jt-003', province: 'Jawa Tengah', name: 'Stadion Manahan Solo', address: 'Jl. Adi Sucipto, Surakarta', capacity: 25000, coordinates: { lat: -7.5566, lon: 110.8076 } },
  { id: 'evac-jt-004', province: 'Jawa Tengah', name: 'GOR Satria Purwokerto', address: 'Jl. Gerilya, Purwokerto', capacity: 3000, coordinates: { lat: -7.4197, lon: 109.2353 } },

  // ── DI YOGYAKARTA ──
  { id: 'evac-yo-001', province: 'DI Yogyakarta', name: 'Stadion Mandala Krida', address: 'Jl. Kenari, Yogyakarta', capacity: 15000, coordinates: { lat: -7.7956, lon: 110.3695 } },
  { id: 'evac-yo-002', province: 'DI Yogyakarta', name: 'Alun-Alun Utara Yogyakarta', address: 'Jl. Ahmad Dahlan, Yogyakarta', capacity: 5000, coordinates: { lat: -7.8052, lon: 110.3642 } },
  { id: 'evac-yo-003', province: 'DI Yogyakarta', name: 'GOR Among Rogo', address: 'Jl. Kenari, Yogyakarta', capacity: 3000, coordinates: { lat: -7.7956, lon: 110.3695 } },

  // ── JAWA TIMUR ──
  { id: 'evac-ji-001', province: 'Jawa Timur', name: 'Stadion Gelora Bung Tomo', address: 'Jl. Sememi, Surabaya', capacity: 55000, coordinates: { lat: -7.2575, lon: 112.6304 } },
  { id: 'evac-ji-002', province: 'Jawa Timur', name: 'Lapangan Tugu Pahlawan Surabaya', address: 'Jl. Pahlawan, Surabaya', capacity: 5000, coordinates: { lat: -7.2459, lon: 112.7378 } },
  { id: 'evac-ji-003', province: 'Jawa Timur', name: 'Stadion Kanjuruhan Malang', address: 'Jl. Trunojoyo, Kepanjen, Malang', capacity: 42000, coordinates: { lat: -8.0833, lon: 112.5500 } },
  { id: 'evac-ji-004', province: 'Jawa Timur', name: 'GOR Sidoarjo', address: 'Jl. Pahlawan, Sidoarjo', capacity: 4000, coordinates: { lat: -7.4478, lon: 112.7183 } },

  // ── BALI ──
  { id: 'evac-ba-001', province: 'Bali', name: 'Stadion Kapten I Wayan Dipta', address: 'Jl. Cok Gde Rai, Gianyar', capacity: 15000, coordinates: { lat: -8.5369, lon: 115.3328 } },
  { id: 'evac-ba-002', province: 'Bali', name: 'Lapangan Puputan Renon', address: 'Jl. Raya Puputan, Denpasar', capacity: 6000, coordinates: { lat: -8.6705, lon: 115.2126 } },
  { id: 'evac-ba-003', province: 'Bali', name: 'GOR Lila Bhuana Denpasar', address: 'Jl. Melati, Denpasar', capacity: 3000, coordinates: { lat: -8.6500, lon: 115.2167 } },

  // ── NUSA TENGGARA BARAT ──
  { id: 'evac-nb-001', province: 'Nusa Tenggara Barat', name: 'Stadion Malomba Mataram', address: 'Jl. Langko, Mataram', capacity: 5000, coordinates: { lat: -8.5833, lon: 116.1167 } },
  { id: 'evac-nb-002', province: 'Nusa Tenggara Barat', name: 'Lapangan Sangkareang Mataram', address: 'Jl. Pejanggik, Mataram', capacity: 3000, coordinates: { lat: -8.5833, lon: 116.1167 } },

  // ── NUSA TENGGARA TIMUR ──
  { id: 'evac-nt-001', province: 'Nusa Tenggara Timur', name: 'Stadion Merdeka Kupang', address: 'Jl. El Tari, Kupang', capacity: 5000, coordinates: { lat: -10.1772, lon: 123.6070 } },
  { id: 'evac-nt-002', province: 'Nusa Tenggara Timur', name: 'Lapangan El Tari Kupang', address: 'Jl. El Tari, Kupang', capacity: 3000, coordinates: { lat: -10.1772, lon: 123.6070 } },

  // ── KALIMANTAN BARAT ──
  { id: 'evac-kb-001', province: 'Kalimantan Barat', name: 'Stadion Sultan Syarif Abdurrahman', address: 'Jl. Ahmad Yani, Pontianak', capacity: 8000, coordinates: { lat: -0.0263, lon: 109.3425 } },
  { id: 'evac-kb-002', province: 'Kalimantan Barat', name: 'Lapangan Alun-Alun Kapuas Pontianak', address: 'Jl. Rahadi Usman, Pontianak', capacity: 4000, coordinates: { lat: -0.0263, lon: 109.3425 } },

  // ── KALIMANTAN TENGAH ──
  { id: 'evac-kt-001', province: 'Kalimantan Tengah', name: 'Stadion Tuah Pahoe Palangkaraya', address: 'Jl. Tjilik Riwut, Palangkaraya', capacity: 5000, coordinates: { lat: -2.2161, lon: 113.9135 } },
  { id: 'evac-kt-002', province: 'Kalimantan Tengah', name: 'Lapangan Sanaman Mantikei', address: 'Jl. Imam Bonjol, Palangkaraya', capacity: 3000, coordinates: { lat: -2.2161, lon: 113.9135 } },

  // ── KALIMANTAN SELATAN ──
  { id: 'evac-ks-001', province: 'Kalimantan Selatan', name: 'Stadion 17 Mei Banjarmasin', address: 'Jl. Jend. Sudirman, Banjarmasin', capacity: 8000, coordinates: { lat: -3.3194, lon: 114.5908 } },
  { id: 'evac-ks-002', province: 'Kalimantan Selatan', name: 'Lapangan Murjani Banjarbaru', address: 'Jl. Ahmad Yani, Banjarbaru', capacity: 3000, coordinates: { lat: -3.4417, lon: 114.8275 } },

  // ── KALIMANTAN TIMUR ──
  { id: 'evac-ki-001', province: 'Kalimantan Timur', name: 'Stadion Madya Sempaja Samarinda', address: 'Jl. Sempaja, Samarinda', capacity: 15000, coordinates: { lat: -0.4948, lon: 117.1436 } },
  { id: 'evac-ki-002', province: 'Kalimantan Timur', name: 'Lapangan Merdeka Balikpapan', address: 'Jl. Jend. Sudirman, Balikpapan', capacity: 4000, coordinates: { lat: -1.2654, lon: 116.8312 } },

  // ── KALIMANTAN UTARA ──
  { id: 'evac-ku-001', province: 'Kalimantan Utara', name: 'Stadion Datu Adil Tarakan', address: 'Jl. Mulawarman, Tarakan', capacity: 5000, coordinates: { lat: 3.3000, lon: 117.5833 } },
  { id: 'evac-ku-002', province: 'Kalimantan Utara', name: 'Lapangan Agathis Tanjung Selor', address: 'Jl. Agathis, Tanjung Selor', capacity: 2000, coordinates: { lat: 2.8333, lon: 117.3667 } },

  // ── SULAWESI UTARA ──
  { id: 'evac-su2-001', province: 'Sulawesi Utara', name: 'Stadion Klabat Manado', address: 'Jl. Martadinata, Manado', capacity: 5000, coordinates: { lat: 1.4748, lon: 124.8421 } },
  { id: 'evac-su2-002', province: 'Sulawesi Utara', name: 'Lapangan Tikala Manado', address: 'Jl. Tikala, Manado', capacity: 3000, coordinates: { lat: 1.4748, lon: 124.8421 } },

  // ── GORONTALO ──
  { id: 'evac-go-001', province: 'Gorontalo', name: 'Stadion Merdeka Gorontalo', address: 'Jl. Nani Wartabone, Gorontalo', capacity: 4000, coordinates: { lat: 0.5435, lon: 123.0595 } },
  { id: 'evac-go-002', province: 'Gorontalo', name: 'Lapangan Taruna Remaja Gorontalo', address: 'Jl. Agus Salim, Gorontalo', capacity: 2000, coordinates: { lat: 0.5435, lon: 123.0595 } },

  // ── SULAWESI TENGAH ──
  { id: 'evac-st-001', province: 'Sulawesi Tengah', name: 'Stadion Gawalise Palu', address: 'Jl. Tanjung Santigi, Palu', capacity: 5000, coordinates: { lat: -0.8917, lon: 119.8707 } },
  { id: 'evac-st-002', province: 'Sulawesi Tengah', name: 'Lapangan Vatulemo Palu', address: 'Jl. Vatulemo, Palu', capacity: 3000, coordinates: { lat: -0.8917, lon: 119.8707 } },

  // ── SULAWESI BARAT ──
  { id: 'evac-sw-001', province: 'Sulawesi Barat', name: 'Stadion Manakarra Mamuju', address: 'Jl. Soekarno Hatta, Mamuju', capacity: 4000, coordinates: { lat: -2.6741, lon: 118.8886 } },
  { id: 'evac-sw-002', province: 'Sulawesi Barat', name: 'Lapangan Merdeka Mamuju', address: 'Jl. Merdeka, Mamuju', capacity: 2000, coordinates: { lat: -2.6741, lon: 118.8886 } },

  // ── SULAWESI SELATAN ──
  { id: 'evac-sl-001', province: 'Sulawesi Selatan', name: 'Stadion Mattoanging Makassar', address: 'Jl. Andi Mappanyukki, Makassar', capacity: 25000, coordinates: { lat: -5.1477, lon: 119.4327 } },
  { id: 'evac-sl-002', province: 'Sulawesi Selatan', name: 'Lapangan Karebosi Makassar', address: 'Jl. Ahmad Yani, Makassar', capacity: 6000, coordinates: { lat: -5.1477, lon: 119.4327 } },
  { id: 'evac-sl-003', province: 'Sulawesi Selatan', name: 'GOR Sudiang Makassar', address: 'Jl. Perintis Kemerdekaan, Makassar', capacity: 3000, coordinates: { lat: -5.0667, lon: 119.5000 } },

  // ── SULAWESI TENGGARA ──
  { id: 'evac-sg-001', province: 'Sulawesi Tenggara', name: 'Stadion Lakidende Kendari', address: 'Jl. Bunggasi, Kendari', capacity: 5000, coordinates: { lat: -3.9985, lon: 122.5127 } },
  { id: 'evac-sg-002', province: 'Sulawesi Tenggara', name: 'Lapangan Merdeka Kendari', address: 'Jl. Saosao, Kendari', capacity: 3000, coordinates: { lat: -3.9985, lon: 122.5127 } },

  // ── MALUKU ──
  { id: 'evac-ma-001', province: 'Maluku', name: 'Stadion Mandala Ambon', address: 'Jl. Jend. Sudirman, Ambon', capacity: 5000, coordinates: { lat: -3.6954, lon: 128.1814 } },
  { id: 'evac-ma-002', province: 'Maluku', name: 'Lapangan Merdeka Ambon', address: 'Jl. Raya Pattimura, Ambon', capacity: 3000, coordinates: { lat: -3.6954, lon: 128.1814 } },

  // ── MALUKU UTARA ──
  { id: 'evac-mu-001', province: 'Maluku Utara', name: 'Stadion Gelora Kie Raha Ternate', address: 'Jl. Stadion, Ternate', capacity: 5000, coordinates: { lat: 0.7833, lon: 127.3667 } },
  { id: 'evac-mu-002', province: 'Maluku Utara', name: 'Lapangan Gamalama Ternate', address: 'Jl. Pahlawan Revolusi, Ternate', capacity: 2500, coordinates: { lat: 0.7833, lon: 127.3667 } },

  // ── PAPUA BARAT ──
  { id: 'evac-pb-001', province: 'Papua Barat', name: 'Stadion Sanggeng Manokwari', address: 'Jl. Sanggeng, Manokwari', capacity: 4000, coordinates: { lat: -0.8615, lon: 134.0622 } },
  { id: 'evac-pb-002', province: 'Papua Barat', name: 'Lapangan Merdeka Manokwari', address: 'Jl. Merdeka, Manokwari', capacity: 2000, coordinates: { lat: -0.8615, lon: 134.0622 } },

  // ── PAPUA BARAT DAYA ──
  { id: 'evac-pd-001', province: 'Papua Barat Daya', name: 'Lapangan Sorong', address: 'Jl. Ahmad Yani, Sorong', capacity: 3000, coordinates: { lat: -0.8833, lon: 131.2500 } },

  // ── PAPUA ──
  { id: 'evac-pa-001', province: 'Papua', name: 'Stadion Mandala Jayapura', address: 'Jl. Percetakan Negara, Jayapura', capacity: 8000, coordinates: { lat: -2.5916, lon: 140.6690 } },
  { id: 'evac-pa-002', province: 'Papua', name: 'Lapangan Trikora Jayapura', address: 'Jl. Ahmad Yani, Jayapura', capacity: 4000, coordinates: { lat: -2.5916, lon: 140.6690 } },

  // ── PAPUA TENGAH ──
  { id: 'evac-pt-001', province: 'Papua Tengah', name: 'Lapangan Nabire', address: 'Jl. Merdeka, Nabire', capacity: 2000, coordinates: { lat: -3.3667, lon: 135.5000 } },

  // ── PAPUA PEGUNUNGAN ──
  { id: 'evac-pp-001', province: 'Papua Pegunungan', name: 'Lapangan Wamena', address: 'Jl. Trikora, Wamena', capacity: 2000, coordinates: { lat: -4.0833, lon: 138.9500 } },

  // ── PAPUA SELATAN ──
  { id: 'evac-ps-001', province: 'Papua Selatan', name: 'Lapangan Merauke', address: 'Jl. Raya Mandala, Merauke', capacity: 2000, coordinates: { lat: -8.4667, lon: 140.3333 } },
]

export default evacuationPoints
