const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { aturanDaftarWarga, aturanMasukAkun } = require("../validations/authValidation");

const daftarAkunBaru = async (req, res, next) => {
    try {
        const saringData = aturanDaftarWarga.safeParse(req.body);
        if (!saringData.success) {
            return res.status(400).json({
                success: false,
                message: saringData.error.errors[0].message });
        }
    
        const { name, email, password } = saringData.data;
        const emailSudahAda = await prisma.user.findUnique({ where: { email } });
        if (emailSudahAda) {
            return res.status(400).json({
                success: false,
                message: "Aduh, alamt email ini sudah terdaftar di sistem!" });
        }
    
        const passwordAcak = await bcrypt.hash(password, 10);
        const userBaru = await prisma.user.create({
            data: { name, email, password: passwordAcak, role: "WARGA" }
        });
        
        return res.status(201).json({
            success: true,
            message: "Selamat, akun warga SafeStreet kamu berhasil dibuat!",
            data: { id: userBaru.id, name: userBaru.name, email: userBaru.email }
        });
    } catch (error) { next(error); }
};

const masukAkun = async (req, res, next) => {
    try {
        const saringData = aturanMasukAkun.safeParse(req.body);
        if (!saringData.success) {
            return res.status(400).json({ success: false, message: saringData.error.errors[0].message });
        }
        const { email, password } = saringData.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: "Email atau password kamu salah!" });
        }
        const passwordCocok = await bcrypt.compare(password, user.password);
        if (!passwordCocok) {
            return res.status(401).json ({ success: false, message: "Email atau password kamu salah!" });
        }
        const accessToken = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET || "kunci_rahasia_safestreet_123",
            { expiresIn: "1h" }
        );
        return res.status(200).json({
            succes: true,
            message: "yeayy! kamu berhasil masuk ke sistem SafeStreet.",
            accessToken
        });
    } catch (error) { next (error); }
};

module.exports = { daftarAkunBaru, masukAkun };