const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Buku API",
            version: "1.0.0",
            description: "Dokumentasi API Aplikasi Manajemen Buku",
        },
        servers: [
            {
                url: "https://waraprogramming-production.up.railway.app",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        paths: {
            "/api/auth/register": {
                post: {
                    tags: ["Auth"],
                    summary: "Registrasi pengguna baru",
                    responses: { "201": { description: "Registrasi sukses" } }
                }
            },
            "/api/auth/login": {
                post: {
                    tags: ["Auth"],
                    summary: "Login pengguna",
                    responses: { "200": { description: "Login sukses" } }
                }
            }
        }
    },
    apis: [], 
};
    
const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    // Kita buat rute khusus yang memuntahkan data JSON asli tanpa memanggil UI bawaan yang bug
    app.get("/api-docs", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log("Jalur data JSON Swagger berhasil diaktifkan!");
};

module.exports = { setupSwagger };