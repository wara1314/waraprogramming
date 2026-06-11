const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const { authenticate, authorize } = require('../middlewares/authMiddleware');

console.log("Cek fungsi authenticate:", typeof authenticate);
console.log("Cek fungsi changePassword:", typeof authController.changePassword);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrasi pengguna baru
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
 *                 example: hawa@example.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Validasi gagal atau email sudah terdaftar
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login dan dapatkan JWT token
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
 *                 example: hawa@example.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan JWT token
 *       401:
 *         description: Email atau password salah
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Mendapatkan profil pengguna yang sedang login
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data profil
 */
router.get('/profile', authenticate, (req, res) => {
    res.json({ message: 'Selamat Datang!', user: req.user });
});

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     tags: [Auth]
 *     summary: Mengubah password pengguna
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 */
router.put('/change-password', authenticate, authController.changePassword);

/**
 * @swagger
 * /api/auth/admin/dashboard:
 *   get:
 *     tags: [Auth]
 *     summary: Halaman khusus admin
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengakses dashboard admin
 */
router.get('/admin/dashboard',
    authenticate,
    authorize("ADMIN"),
    (req, res) => { res.json({ message: "Dashboard Admin" }); }
);

/**
 * @swagger
 * /api/auth/content/review:
 *   get:
 *     tags: [Auth]
 *     summary: Halaman review konten khusus Admin dan Moderator
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengakses halaman review
 */
router.get('/content/review',
    authenticate,
    authorize("ADMIN", "MODERATOR"),
    (req, res) => { res.json({ message: "Halaman Review Konten" }); }
);

/**
 * @swagger
 * /api/auth/token/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Memperbarui token JWT menggunakan refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token berhasil diperbarui
 */
router.post('/token/refresh', authController.refreshToken);

module.exports = router;