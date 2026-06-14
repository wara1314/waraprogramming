const express = require("express");

const cors = require("cors"); 

const logAktivitas = require("./src/middlewares/logmiddlewares");
const zoneroutes = require("./src/routes/zoneroutes");
const authRoutes = require("./src/routes/authRoutes");

const { setupSwagger } = require("./src/config/swagger");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" })); 

app.use(express.json());
app.use(logAktivitas);

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/zones", zoneroutes);

app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

app.use((err, req, res, next) => {
    console.error("TERDETEKSI ERROR INTERNAL:", err.stack);
    res.status(500).json({
        success: false,
        message: "terjadi kesalahan internal pada server"
    });
});

app.listen(PORT, () => {
    console.log("server aman berjalan di port", PORT);
});