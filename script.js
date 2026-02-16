// --- 1. Fungsi Jam Digital ---
function updateClock() {
    const now = new Date();
    let h = String(now.getHours()).padStart(2, '0');
    let m = String(now.getMinutes()).padStart(2, '0');
    let s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("jam-realtime").innerText = `${h}:${m}:${s}`;
}

// --- 2. Fungsi Ambil Jadwal Sholat Otomatis ---
async function getJadwalSholat() {
    // Ubah 'Jakarta' sesuai kota masjid Anda
    const kota = "Jakarta"; 
    const negara = "Indonesia";
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=${negara}&method=11`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const jadwal = data.data.timings;
        const hijri = data.data.date.hijri;

        // Update Teks Tanggal & Hijriah
        document.getElementById("tanggal-hijriah").innerText = 
            `${new Date().toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'})} | ${hijri.day} ${hijri.month.en} ${hijri.year} H`;

        // Update Jadwal di HTML (Targeting class .time-box strong)
        const boxes = document.querySelectorAll(".time-box strong");
        boxes[0].innerText = jadwal.Fajr;
        boxes[1].innerText = jadwal.Dhuhr;
        boxes[2].innerText = jadwal.Asr;
        boxes[3].innerText = jadwal.Maghrib;
        boxes[4].innerText = jadwal.Isha;

        console.log("Jadwal Sholat diperbarui otomatis!");
    } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
    }
}

// Jalankan Fungsi
setInterval(updateClock, 1000);
getJadwalSholat();
async function getJadwalSholat() {
    const kota = "Makassar"; // Sesuaikan dengan kota Anda
    const negara = "Indonesia";
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=${negara}&method=11`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const jadwal = data.data.timings;
        const hijri = data.data.date.hijri;

        // Update Tanggal
        document.getElementById("tanggal-hijriah").innerText = 
            `${new Date().toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'})} | ${hijri.day} ${hijri.month.en} ${hijri.year} H`;

        // Update Jadwal ke ID masing-masing
        document.getElementById("imsak").innerText = jadwal.Imsak;
        document.getElementById("subuh").innerText = jadwal.Fajr;
        document.getElementById("dzuhur").innerText = jadwal.Dhuhr;
        document.getElementById("ashar").innerText = jadwal.Asr;
        document.getElementById("maghrib").innerText = jadwal.Maghrib;
        document.getElementById("isya").innerText = jadwal.Isha;

    } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
    }
}
// 1. Daftar Donatur dengan banyak nama dalam satu hari
const dataDonatur = {
    "16": [
        "Keluarga H. Ahmad", 
        "Keluarga Nandar", 
        "Keluarga Kamu",
        "Bapak Budi"
    ],
    "17": [
        "Ibu Hj. Siti Fatimah", 
        "Remaja Masjid Al-Falah"
    ],
    "18": [
        "Hamba Allah", 
        "Grup Pengajian Selasa", 
        "Warga RT 05"
    ]
};

function updateDonaturOtomatis() {
    const sekarang = new Date();
    const tanggalHariIni = sekarang.getDate();
    const tanggalBesok = tanggalHariIni + 1;

    // Ambil data (berupa array)
    const listSekarang = dataDonatur[tanggalHariIni] || ["Belum ada donatur"];
    const listBesok = dataDonatur[tanggalBesok] || ["Belum ada donatur"];

    // Menggabungkan nama-nama dengan koma menggunakan .join(", ")
    document.getElementById("donatur-sekarang").innerText = listSekarang.join(", ");
    document.getElementById("donatur-besok").innerText = listBesok.join(", ");
}

// Jalankan fungsi
updateDonaturOtomatis();
