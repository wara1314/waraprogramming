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

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: 'Selamat Datang!', user: req.user });
});

router.put('/change-password', authenticate, authController.changePassword);

router.get('/admin/dashboard',
    authenticate,
    authorize("ADMIN"),
    (req, res) => { res.json({ message: "Dashboard Admin" }); }
);

router.get('/content/review',
    authenticate,
    authorize("ADMIN", "MODERATOR"),
    (req, res) => { res.json({ message: "Halaman Review Konten" }); }
);

router.post('/token/refresh', authController.refreshToken);

module.exports = router;