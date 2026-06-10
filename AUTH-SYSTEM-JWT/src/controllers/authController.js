const authService = require('../services/authService');
const { registerSchema, loginSchemaFull, changePasswordSchema } = require('../validation/authValidation');
const authController = {    
    async register(req, res) {

        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: 'validasi gagal.',
                errors: validation.error.issues.map(e => ({
                    field: e.path.join("."),
                    message: e.message,
                }))
            });
        }

        try {
            const user = await authService.register(validation.data);
            return res.status(201).json({ message: "Registrasi berhasil.", data: user });
        } catch (error) {
            if (error.message === 'EMAIL_ALREADY_EXISTS') {
                return res.status(409).json({ message: "email sudah terdaftar." });
            }
            if (error.message === 'FORBIDDEN_ROLE') {
                return res.status(403).json({ message: "tidak diizinkan membuat akun ADMIN." });
            }
            return res.status(500).json({ message: "terjadi kesalahan server", });
        }
    },

    async login(req, res) {
        const validation = loginSchemaFull.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: 'validasi gagal.',
                errors: validation.error.issues.map(e => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }
            try {
                const tokens = await authService.login(validation.data);
                return res.status(200).json({ message: "Login berhasil.", ...tokens });
            } catch (error) {
                if (error.message === 'INVALID_CREDENTIALS') {
                    return res.status(401).json({ message: "Email atau password salah." });
                }
                return res.status(500).json({ message: "Terjadi kesalahan server." });
            }
    },

    async changePassword(req, res) {
        const validation = changePasswordSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: 'validasi gagal.',
                errors: validation.error.issues.map(e => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }

        try {
            const userId = req.user.userId;
            const result = await authService.changePassword(userId, {
                currentPassword: validation.data.oldPassword, 
                    newPassword: validation.data.newPassword,
                });
                
            return res.status(200).json(result);
        } catch (error) {
            console.error("ERROR ASLI:", error); 
            if (error.message === 'INVALID_OLD_PASSWORD') {
                return res.status(401).json({ message: "Password lama tidak sesuai." });
            }
            return res.status(500).json({ message: "Terjadi kesalahan server." });
        }
    },
    async refreshToken(req, res) {
        
        const { refreshToken } = req.body;

        try {
           
            const result = await authService.refreshToken(refreshToken);
            
            return res.status(200).json({ 
                message: "Token berhasil diperbarui.", 
                ...result 
            });
        } catch (error) {
            if (error.message === 'TOKEN_REQUIRED') {
                return res.status(400).json({ message: "Refresh token diperlukan." });
            }
            if (error.message === 'INVALID_REFRESH_TOKEN' || error.message === 'TOKEN_EXPIRED_OR_INVALID') {
                return res.status(401).json({ 
                    message: "Refresh token tidak valid atau telah kedaluwarsa. Silakan login kembali." 
                });
            }
            return res.status(500).json({ message: "Terjadi kesalahan server." });
        }
    },
    };
module.exports = authController;