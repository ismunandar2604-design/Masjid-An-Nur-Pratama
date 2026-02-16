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
// Pastikan data ini ada dan benar formatnya
const dataDonatur = {
    "16": ["Keluarga Ny.Firman", "Keluarga Nandar", "Keluarga Kamu", "Bapak Budi"],
    "17": ["Ibu Hj. Siti Fatimah", "Remaja Masjid Al-Falah"],
    "18": ["Hamba Allah", "Grup Pengajian Selasa"]
};

function updateDonaturOtomatis() {
    const sekarang = new Date();
    const tanggalHariIni = String(sekarang.getDate()); // Ambil tanggal sebagai String
    const tanggalBesok = String(sekarang.getDate() + 1);

    const elSekarang = document.getElementById("donatur-sekarang");
    const elBesok = document.getElementById("donatur-besok");

    // Jika element tidak ditemukan, hentikan fungsi agar tidak error
    if (!elSekarang || !elBesok) return;

    // Bersihkan isi sebelumnya
    elSekarang.innerHTML = "";
    elBesok.innerHTML = "";

    // Ambil daftar nama
    const listSekarang = dataDonatur[tanggalHariIni] || ["Belum ada donatur"];
    const listBesok = dataDonatur[tanggalBesok] || ["Belum ada donatur"];

    // Masukkan list hari ini
    listSekarang.forEach(nama => {
        let li = document.createElement("li");
        li.innerText = nama;
        li.style.color = "#d32f2f"; // Warna merah poin
        li.style.fontWeight = "bold";
        elSekarang.appendChild(li);
    });

    // Masukkan list besok
    listBesok.forEach(nama => {
        let li = document.createElement("li");
        li.innerText = nama;
        elBesok.appendChild(li);
    });
}

// PANGGIL FUNGSI INI agar dijalankan saat web dibuka
updateDonaturOtomatis();