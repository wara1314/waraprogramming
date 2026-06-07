const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

console.log("Cek fungsi authenticate:", typeof authenticate);
console.log("Cek fungsi changePassword:", typeof authController.changePassword);

router.post('/register', authController.register);
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