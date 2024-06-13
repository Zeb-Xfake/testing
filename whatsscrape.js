Zeb-Xfake/x5441function getGroupPhoneNumbers() {
    // Coba beberapa selector berbeda untuk menemukan tombol info grup
    const groupInfoButton = document.querySelector("header span[title='Group info']") || 
                            document.querySelector("header span[title='Info grup']") || 
                            document.querySelector("header ._21nHd");

    if (!groupInfoButton) {
        console.error("Tidak dapat menemukan tombol info grup. Pastikan Anda sudah berada di dalam grup.");
        return;
    }
    groupInfoButton.click();

    // Tunggu sebentar untuk memastikan panel info grup terbuka
    setTimeout(() => {
        // Dapatkan elemen yang berisi anggota grup
        const membersPanel = document.querySelector("div[aria-label='Group participants']") ||
                             document.querySelector("div[aria-label='Peserta grup']") ||
                             document.querySelector("div._3Bc7H._21nHd._1hI5g");

        if (!membersPanel) {
            console.error("Tidak dapat menemukan panel anggota grup.");
            return;
        }

        // Scroll untuk memuat semua anggota
        membersPanel.scrollTop = membersPanel.scrollHeight;

        // Tunggu sebentar untuk memastikan semua anggota dimuat
        setTimeout(() => {
            // Ambil semua elemen anggota grup yang memiliki nomor telepon
            const memberElements = membersPanel.querySelectorAll("._2nY6U");

            const numbers = [];
            memberElements.forEach(member => {
                const numberElement = member.querySelector("span[title]");
                if (numberElement && numberElement.title.includes("+")) {
                    numbers.push(numberElement.title);
                }
            });

            // Tampilkan hasil
            if (numbers.length > 0) {
                console.log("Nomor telepon anggota grup:");
                console.log(numbers.join("\n"));
            } else {
                console.log("Tidak ditemukan nomor telepon anggota grup.");
            }
        }, 2000); // Tunggu 2 detik untuk memuat semua anggota
    }, 1000); // Tunggu 1 detik untuk membuka panel info grup
}

// Jalankan fungsi
getGroupPhoneNumbers();
