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
    },
    // Menunjuk langsung folder routes dari root utama secara aman
    apis: ["./src/routes/*.js"], 
};
    
const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    // 1. Jalur data JSON Swagger asli
    app.get("/api-docs-json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    // 2. Trik HTML Bypass: Memaksa halaman Swagger UI muncul murni dari jaringan CDN pusat resmi
    app.get("/api-docs", (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Buku API - Swagger UI</title>
                <link rel="stylesheet" type="text/css" href="https://unpkg.com" />
                <style>html { box-sizing: border-box; overflow-y: scroll; } *, *:before, *:after { box-sizing: inherit; } body { margin:0; background: #fafafa; }</style>
            </head>
            <body>
                <div id="swagger-ui"></div>
                <script src="https://unpkg.com" charset="UTF-8"> </script>
                <script>
                    window.onload = function() {
                        const ui = SwaggerUIBundle({
                            url: "/api-docs-json",
                            dom_id: '#swagger-ui',
                            deepLinking: true,
                            presets: [SwaggerUIBundle.presets.apis]
                        });
                        window.ui = ui;
                    };
                </script>
            </body>
            </html>
        `);
    });
    console.log("Bypass Swagger UI CDN berhasil didaftarkan!");
};

module.exports = { setupSwagger };
