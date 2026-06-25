# Proyek Backend SafeStreet API
Ini adalah project capstone backend (RESTful API) yang dibuat khusus untuk memetakan, melaporkan, dan mengelola kondisi jalan raya yang rawan atau fasilitas umum yang rusak di masyarakat secara real-time. 
Sistem ini memisahkan hak akses secara tegas antara akun warga biasa (untuk melapor) dan petugas (untuk mengubah status jalan atau menghapus laporan).

## Link Live Deployment (Railway)
Bisa langsung dicoba versi interaktifnya di sini ya:
[SafeStreet Swagger UI](https://safestreetbackend-production.up.railway.app)

## Cara Jalanin di Laptop Sendiri (Local Setup)
Kalau mau coba nyalain kodingan ini di komputer lokal, ikuti aja langkah-langkah di bawah ini:
### 1. Clone Project dari GitHub
Buka terminal, terus ketik perintah ini buat nge-clone foldernya:
```bash
git clone https://github.com
cd waraprogramming/safestreet_backend
```

### 2. Install Library / Dependensi
Jangan lupa install semua package yang dibutuhin pake npm:
```bash
npm install
```

### 3. Setup File Env
Buat file baru namanya `.env` di dalam folder `safestreet_backend`, terus isi variabelnya kayak gini:
```env
DATABASE_URL="mysql://root:zmaydvDdeDMsQuRiRPZVQORjNxNmADvX@metro.proxy.rlwy.net:46156/railway"
JWT_SECRET="kunci_rahasia_safestreet_123"
PORT=3000
```

### 4. Sinkronisasi Prisma ke MySQL Cloud
Biar tabel database-nya kebuat otomatis di cloud, jalanin perintah ini:
```bash
npx prisma db push
npx prisma generate
```

### 5. Nyalain Servernya
Terakhir, tinggal running server lokalnya:
```bash
# Mode biasa
node app.js

# Atau bisa pake start script
npm start
```
Kalau udah nyala, tinggal buka alamat ini di Google Chrome buat liat dokumentasinya: `http://localhost:3000/api-docs`
