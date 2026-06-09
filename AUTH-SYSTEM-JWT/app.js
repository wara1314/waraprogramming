require('dotenv').config();
const express = require("express");

const { setupSwagger } = require("./src/config/swagger"); 

const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/books.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.redirect('/api-docs');
});

    app.listen(PORT, () => {
    console.log("Server backend manajemen buku berhasil dijalankan!");
});