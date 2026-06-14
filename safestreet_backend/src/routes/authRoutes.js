const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.daftarAkunBaru);
router.post("/login", authController.masukAkun);

module.exports = router;