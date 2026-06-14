const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Fungsi jembatan untuk menyalakan Swagger UI menggunakan spesifikasi dari app.js
const setupSwagger = (app, swaggerSpec) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Dokumentasi Swagger UI aktif di alamat /api-docs");
};

module.exports = { setupSwagger };