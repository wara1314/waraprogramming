const { z } = require("zod");

const aturanLaporJalan = z.object({
    streetName: z.string().min(5, "Nama jalan minimal harus 5 huruf!"),
     dangerType: z.string().min(3, "Jenis bahaya harus diisi dengan jelas (misal: Begal)!"),
      description: z.string().min(10, "Mohon berikan deskripsi kronologi minimal 10 huruf!"),
       dangerLevel: z.enum(["RENDAH", "SEDANG", "TINGGI"], {
        errorMap: () => ({ message: "Tingkat bahaya harus antara: RENDAH, SEDANG, atau TINGGI!"})
       })
    });

    module.expors = { aturanLaporJalan };