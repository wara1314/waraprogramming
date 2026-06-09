const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
                url: `waraprogramming-production.up.railway.app`,
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
                    summary: "Registrasi pengguna baru",
                    responses: { "201": { description: "Registrasi sukses" } }
                }
            },
            "/api/auth/login": {
                post: {
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
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(` Swagger UI: https://railway.app/api-docs`);
};

module.exports = { setupSwagger };
