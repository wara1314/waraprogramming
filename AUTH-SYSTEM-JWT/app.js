require('dotenv').config();
const express = require("express");

// Memanggil modul dokumentasi API bawaan tugasmu
const { setupSwagger } = require("./src/config/swagger"); 

// Menghubungkan berkas rute kontrol autentikasi dan buku
const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/books.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Mengaktifkan jalur dokumentasi antarmuka di atas rute API
setupSwagger(app);

// 2. Mendaftarkan rute utama Express
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// 3. Jalur bypass pengalihan otomatis agar server langsung membuka Swagger
app.get("/", (req, res) => {
    res.redirect('/api-docs');
});

// 4. Membuka gerbang jaringan server secara bersih tanpa penumpukan fungsi
app.listen(PORT, () => {
    console.log(`Server backend berhasil berjalan pada port ${PORT}`);
});
