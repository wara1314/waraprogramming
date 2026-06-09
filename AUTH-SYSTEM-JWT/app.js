require('dotenv').config();
const express = require("express");
const { apiReference } = require("@scalar/express-api-reference");

// Hapus import swagger lama karena kita pakai scalar yang anti-gagal
const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/books.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Jalur bypass utama untuk memunculkan dokumentasi API kamu di Railway
app.use(
  "/docs",
  apiReference({
    spec: {
      url: "https://railway.app",
    },
  }),
);

app.get("/", (req, res) => {
    res.status(200).send("Server Backend Manajemen Buku Sukses Berjalan! Buka link /docs untuk melihat dokumentasi API.");
});

app.listen(PORT, () => {
    console.log("Server backend berhasil dijalankan secara aman!");
});
