const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { cekKunciToken, batasiHakAkses } = require("../middlewares/authMiddlewares");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Pendaftaran akun warga baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hawa
 *               email:
 *                 type: string
 *                 example: hai@example.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       201:
 *         description: Akun berhasil dibuat
 *       400:
 *         description: Validasi gagal atau email sudah terdaftar
 */
router.post("/register", authController.daftarAkunBaru);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Masuk ke dalam sistem SafeStreet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: hai@example.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan token JWT
 *       401:
 *         description: Email atau password salah
 */
router.post("/login", authController.masukAkun);


/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Melihat data profil pengguna yang sedang login
 *     security:
 *       - BearerAuth: []  
 *     responses:
 *       200:
 *         description: Berhasil mengambil data profil
 *       401:
 *         description: Token tidak ditemukan atau tidak sah
 */
router.get("/profile", cekKunciToken, (req, res) => {
    res.json({ success: true, message: "Selamat Datang!", user: req.user });
});

module.exports = router;