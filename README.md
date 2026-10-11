# RAWON - Pinjam Alat Kampus (Skeleton SPA)

Sistem Informasi Peminjaman Barang & Fasilitas Kampus Terintegrasi untuk BAA, BAUK, dan KTI. Proyek ini dikembangkan sebagai bagian dari Tugas Proyek Aplikasi 1 (AP1).

---

## 👥 Anggota Kelompok RAWON
1. **Andrean Satria Bagaskara** (251-111-012)
2. **Jovan Ni'am Fairuz Zaky** (251-111-015)
3. **Devan Aldo Vobiscum** (251-111-016)
---

## 🛠️ Tech Stack & Dependencies
- **Framework / Library:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Code Quality & Tooling:** ESLint, Prettier, EditorConfig

---

## 📂 Struktur Folder Proyek

```text
AP1_kelompokRAWON_pinjamalatkampus/
├── dist/                  # Hasil build produksi
├── node_modules/          # Pustaka/dependensi proyek
├── public/                # Aset statis publik
├── src/                   # Kode sumber aplikasi
├── .editorconfig          # Standar konsistensi editor
├── .eslintrc.cjs          # Konfigurasi linter ESLint
├── .gitignore             # Berkas yang diabaikan Git
├── .prettierrc            # Konfigurasi pemformatan Prettier
├── eslint.config.js       # Konfigurasi ESLint modern
├── index.html             # Titik masuk HTML utama
├── package-lock.json      # Catatan versi dependensi npm
├── package.json           # Konfigurasi proyek & skrip tooling
├── postcss.config.js      # Konfigurasi PostCSS
├── README.md              # Dokumentasi proyek
├── tailwind.config.js     # Konfigurasi Tailwind CSS
├── tsconfig.app.json      # Konfigurasi TypeScript untuk aplikasi
├── tsconfig.json          # Konfigurasi utama TypeScript
├── tsconfig.node.json     # Konfigurasi TypeScript untuk Node
└── vite.config.ts         # Konfigurasi bundler Vite

Petunjuk Menjalankan Secara Lokal
Prasyarat
1. Node.js v18.0 atau versi yang lebih baru.
2. npm (terikut saat menginstal Node.js).

Langkah Eksekusi
1. Kloning Repositori:
git clone [https://github.com/Andreaslebew/AP1_kelompokRAWON_pinjamalatkampus.git](https://github.com/Andreaslebew/AP1_kelompokRAWON_pinjamalatkampus.git)

2. Masuk ke Direktori Proyek:
cd AP1_kelompokRAWON_pinjamalatkampus

3. Instal Dependensi:
npm install

4. Jalankan Server Lokal (Development):
npm run dev

5. Akses Aplikasi:
Buka peramban (browser) dan kunjungi tautan berikut:
http://localhost:5173

Skrip Tooling (package.json)
Di dalam berkas package.json, telah disediakan skrip otomatis untuk membantu pengelolaan kode:

npm run dev : Menjalankan server pengembangan lokal berbasis Vite.

npm run build : Memeriksa tipe TypeScript dan mengompilasi aset ke folder dist/ untuk produksi.

npm run lint : Memeriksa standar koding dan kualitas kode menggunakan ESLint.

npm run format : Merapikan format seluruh berkas kode secara otomatis menggunakan Prettier.
