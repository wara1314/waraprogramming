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
                url: `https://waraprogramming-production.up.railway.app`,
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
                
    apis: ["./src/routes/*.js"],

};
    
const swaggerSpec = swaggerJsdoc(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(` Swagger UI: https://railway.app/api-docs`);
};

module.exports = { setupSwagger };
