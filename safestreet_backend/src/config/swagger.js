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
        ],
        // DAFtarkan SELEURUH RUTE API SECARA TEGAS DI SINI AGAR LANGSUNG MUNCUL DI BROWSER!
        paths: {
            "/api/auth/register": {
                "post": {
                    "tags": ["Auth"],
                    "summary": "Pendaftaran akun warga baru",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "required": ["name", "email", "password"],
                                    "properties": {
                                        "name": { "type": "string", "example": "Hawa" },
                                        "email": { "type": "string", "example": "hai@example.com" },
                                        "password": { "type": "string", "example": "rahasia123" }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": { "description": "Akun berhasil dibuat" },
                        "400": { "description": "Validasi gagal atau email sudah terdaftar" }
                    }
                }
            },
            "/api/auth/login": {
                "post": {
                    "tags": ["Auth"],
                    "summary": "Masuk ke dalam sistem SafeStreet",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "required": ["email", "password"],
                                    "properties": {
                                        "email": { "type": "string", "example": "hai@example.com" },
                                        "password": { "type": "string", "example": "rahasia123" }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": { "description": "Login berhasil, mengembalikan token JWT" },
                        "401": { "description": "Email atau password salah" }
                    }
                }
            },
            "/api/auth/profile": {
                "get": {
                    "tags": ["Auth"],
                    "summary": "Melihat data profil pengguna yang sedang login",
                    "responses": {
                        "200": { "description": "Berhasil mengambil data profil" },
                        "401": { "description": "Token tidak sah" }
                    }
                }
            },
            "/api/zones": {
                "get": {
                    "tags": ["Zones"],
                    "summary": "Mendapatkan semua data lokasi jalan rawan",
                    "responses": {
                        "200": { "description": "Berhasil menarik semua data dari MySQL cloud" }
                    }
                },
                "post": {
                    "tags": ["Zones"],
                    "summary": "Warga melaporkan lokasi jalan rawan baru",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "required": ["streetName", "dangerType", "description", "dangerLevel"],
                                    "properties": {
                                        "streetName": { "type": "string", "example": "Jalan Limau Manis" },
                                        "dangerType": { "type": "string", "example": "Rawan Begal Malam" },
                                        "description": { "type": "string", "example": "Area jalanan sepi dan minim penerangan lampu." },
                                        "dangerLevel": { "type": "string", "example": "TINGGI" }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": { "description": "Laporan berhasil disimpan ke database cloud" }
                    }
                }
            },
            "/api/zones/{id}": {
                "get": {
                    "tags": ["Zones"],
                    "summary": "Mendapatkan detail informasi dari satu lokasi jalan rawan",
                    "parameters": [
                        { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
                    ],
                    "responses": {
                        "200": { "description": "Detail data jalan berhasil ditemukan" }
                    }
                },
                "patch": {
                    "tags": ["Zones"],
                    "summary": "Petugas mengubah status kondisi jalan rawan (Khusus Petugas)",
                    "parameters": [
                        { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "required": ["status"],
                                    "properties": {
                                        "status": { "type": "string", "example": "AMAN" }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": { "description": "Status jalan rawan berhasil diperbarui" }
                    }
                },
                "delete": {
                    "tags": ["Zones"],
                    "summary": "Petugas menghapus data Laporan jalan rawan (Khusus Petugas)",
                    "parameters": [
                        { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
                    ],
                    "responses": {
                        "200": { "description": "Data Laporan jalan rawan berhasil dihapus" }
                    }
                }
            }
        }
    },
    apis: [], // Kita kosongkan karena jalurnya sudah dikunci lewat objek paths di atas!
};

const swaggerSpec = swaggerJsdoc(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Dokumentasi Swagger UI aktif di alamat /api-docs");
};

module.exports = { setupSwagger };