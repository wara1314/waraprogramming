const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
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
        ]
    },
    apis: ["./src/routes/authRoutes.js", "./src/routes/zoneroutes.js"],
};

const swaggerSpec = swaggerJsdoc(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Dokumentasi Swagger UI aktif di alamat /api-docs");
};

module.exports = { setupSwagger };
