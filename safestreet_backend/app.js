const express = require("express");
const cors = require("cors"); 
const swaggerJsdoc = require("swagger-jsdoc");

const logAktivitas = require("./src/middlewares/logmiddlewares"); // Pastikan s kecil/besar sesuai folder
const zoneroutes = require("./src/routes/zoneroutes");
const authRoutes = require("./src/routes/authRoutes");
const { setupSwagger } = require("./src/config/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" })); 
app.use(express.json());
app.use(logAktivitas);

app.use("/api/auth", authRoutes);
app.use("/api/zones", zoneroutes);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SafeStreet Backend",
            version: "1.0.0",
            description: "Dokumentasi API Aplikasi Keamanan Jalan Raya dan Fasilitas Umum",
        },
        servers: [
            {
                url: "https://safestreetbackend-production.up.railway.app",
                description: "Server Utama Live di Internet"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Masukkan token JWT kamu langsung (tanpa kata Bearer)."
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

setupSwagger(app, swaggerSpec);

app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

app.use((err, req, res, next) => {
    console.error("TERDETEKSI ERROR INTERNAL:", err.stack);
    res.status(500).json({ success: false, message: "terjadi kesalahan internal pada server" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("server aman berjalan di port", PORT);
});