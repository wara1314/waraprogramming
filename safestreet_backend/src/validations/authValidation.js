const { z } = require("zod");
const aturanDaftarWarga = z.object({
    name: z.string().min(3, "Nama kamu minimal harus 3 huruf ya!"),
    email: z.string().email("Format email kamu tidak valid nih!"),
    password: z.string().min(6, "Kata sandi pengaman minimal harus 6 karakter!"),
});

const aturanMasukAkun = z.object({
    email: z.string().email("Format alamat email tidak valid!"),
    password: z.string().min(1, "Kata sandi tidak boleh kosong!"),
});

module.exports = { aturanDaftarWarga, aturanMasukAkun };