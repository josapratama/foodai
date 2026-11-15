# FoodAI 🥗🤖

FoodAI adalah aplikasi web pintar berbasis AI untuk analisis makanan dan pelacakan nutrisi secara instan. Dibangun menggunakan Next.js 14 (App Router), TypeScript, Prisma ORM, integrasi OpenAI API untuk identifikasi makanan, dan Edamam Nutrition API untuk analisis kandungan gizi real-time.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.20-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)

---

## ✨ Fitur Utama

- 🔍 **AI Food Recognition**: Menganalisis deskripsi dan gambar makanan menggunakan model OpenAI untuk mengenali jenis makanan dalam Bahasa Indonesia.
- 📊 **Edamam Nutrition Analysis**: Menghitung kandungan kalori, protein, lemak, karbohidrat, dan mikronutrien secara akurat dari database Edamam.
- 🔐 **Autentikasi & Akun Lengkap**:
  - Registrasi & Login dengan hashing kata sandi (`bcryptjs`) dan JWT session.
  - Reset Password berbasis OTP verifikasi email via Nodemailer.
  - Next.js Edge Middleware route guard untuk memproteksi halaman `/dashboard` dan `/analysis`.
- 🥑 **Katalog Makanan & Nutrisi**:
  - Filter kategori: Makanan, Minuman, Buah, Sayuran, dan Camilan.
  - Manajemen riwayat konsumsi harian.
- 🎨 **Modern Responsive UI**: Dibangun dengan Tailwind CSS, Lucide Icons, dan komponen visual interaktif.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ORM & Database**: Prisma ORM & PostgreSQL
- **AI & External APIs**: OpenAI API & Edamam Nutrition API
- **Auth & Security**: JSON Web Token (JWT) & bcryptjs
- **Mailer**: Nodemailer (SMTP OTP delivery)
- **Runtime / Package Manager**: Bun / Node.js

---

## 🚀 Memulai Proyek

### 1. Prasyarat
- [Node.js](https://nodejs.org/) v18+ atau [Bun](https://bun.sh/)
- PostgreSQL database

### 2. Kloning & Instalasi Dependensi
```bash
git clone https://github.com/josapratama/foodai.git
cd foodai
bun install
# atau
npm install
```

### 3. Konfigurasi Environment Variable
Salin file konfigurasi environment dan sesuaikan:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/foodai?schema=public"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# OpenAI API
OPENAI_API_KEY="sk-..."

# Edamam Nutrition API
EDAMAM_APP_ID="your_edamam_app_id"
EDAMAM_APP_KEY="your_edamam_app_key"

# SMTP Email (Untuk OTP Reset Password)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### 4. Sinkronisasi Database Prisma
```bash
bunx prisma db push
# atau generate client
bunx prisma generate
```

### 5. Jalankan Mode Development
```bash
bun run dev
# atau npm run dev
```
Akses aplikasi di [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Production Build

Untuk memverifikasi build produksi:
```bash
bun run build
bun run start
```

---

## 📁 Struktur Direktori

```
foodai/
├── prisma/
│   └── schema.prisma         # Definisi skema database PostgreSQL
├── public/                   # Asset statis dan icon
├── src/
│   ├── app/                  # Next.js App Router (pages & API routes)
│   │   ├── (auth)/           # Route login, register, reset password
│   │   ├── analysis/         # Fitur analisis makanan AI
│   │   ├── dashboard/        # Dashboard nutrisi & riwayat
│   │   └── api/              # Endpoint backend (OpenAI, Edamam, Auth, Data)
│   ├── components/           # Komponen UI modular
│   ├── lib/                  # Helper utilities (Prisma client, JWT, Mailer)
│   └── middleware.ts         # Edge route guard & redirect handler
└── package.json
```

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT. Dibuat oleh [@josapratama](https://github.com/josapratama).
