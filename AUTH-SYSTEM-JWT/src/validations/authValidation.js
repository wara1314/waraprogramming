const {z} = require('zod');

const loginSchema = z.object({
    email: z.string()
    .email(),
    password: z.string()
    .min(8),
});

const roleEnum = z.enum(["USER", "MODERATOR"]);

const registerSchema = z.object({
    email: z.string()
    .email({ message: "format email tidak valid." }),
    password: z.string()
    .min(8, { message: "password harus memiliki minimal 8 karakter." }),
    role: z.enum(["USER", "MODERATOR"], {
        errorMap: () => ({ message: "Role hanya boleh USER atau MODERATOR." })
    }).optional().default("USER"),
});

const loginSchemaFull = z.object({
    email: z.string().email({ message: "Format email tidak valid." }),
    password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, {message: "Password lama tidak boleh kosong."}),
    newPassword: z.string().min(8, {message: "Password baru minimal 8 karakter."}),
})

module.exports = { registerSchema, loginSchema, loginSchemaFull, changePasswordSchema };

const validateRegister = (req, res, next) => {
const result = registerSchema.safeParse(req.body);

if (!result.success) {

    return res.status(400).json({ 
        message: "Validasi gagal.",
        error: result.error.errors.map(e => ({
            field: e.path.join("."),
            mesage: e.message
        })),
    });
}

req.validateBody = result.data;

next();
};

module.exports = { 
    validateRegister,
    registerSchema,        
    loginSchemaFull,      
    changePasswordSchema
};
