require('dotenv').config();
const express = require("express");

const { setupSwagger } = require("./src/config/swagger"); 

const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/books.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Server Backend Manajemen Buku Sukses Berjalan!");
});

setupSwagger(app);

app.listen(PORT, () => {
    console.log(` Server berjalan di: http://localhost:${PORT}`);
    console.log(` Swagger UI      di: http://localhost:${PORT}/api-docs`);
});