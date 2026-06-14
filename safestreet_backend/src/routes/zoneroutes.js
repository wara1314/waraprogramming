const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

// 1. Panggil pengaman token JWT dan fungsi batasiHakAkses dari berkas middleware kamu
const { cekKunciToken, batasiHakAkses } = require("../middlewares/authMiddlewares");
const { aturanLaporJalan } = require("../validations/zoneValidation");

/**
 * @swagger
 * /api/zones:
 *   get:
 *     tags: [Zones]
 *     summary: Mendapatkan semua data lokasi jalan rawan
 *     responses:
 *       200:
 *         description: Berhasil menarik semua data dari MySQL cloud
 */
router.get("/", async (req, res, next) => {
    try {
        const dataJalanAsli = await prisma.dangerZone.findMany();
        res.status(200).json({
            success: true,
            totalData: dataJalanAsli.length,
            data: dataJalanAsli
        });
    } catch (error) { next(error); }
});

/**
 * @swagger
 * /api/zones:
 *   post:
 *     tags: [Zones]
 *     summary: Warga melaporkan lokasi jalan rawan baru
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [streetName, dangerType, description, dangerLevel]
 *             properties:
 *               streetName:
 *                 type: string
 *                 example: Jalan Limau Manis
 *               dangerType:
 *                 type: string
 *                 example: Rawan Begal Malam
 *               description:
 *                 type: string
 *                 example: Area jalanan sepi dan minim penerangan lampu.
 *               dangerLevel:
 *                 type: string
 *                 example: TINGGI
 *     responses:
 *       201:
 *         description: Laporan berhasil disimpan ke database cloud
 *       400:
 *         description: Validasi data input Zod gagal
 */
router.post("/", cekKunciToken, async (req, res, next) => {
    try {
        const saringData = aturanLaporJalan.safeParse(req.body);
        if (!saringData.success) {
            return res.status(400).json({ success: false, message: saringData.error.errors.message });
        }
        const { streetName, dangerType, description, dangerLevel } = saringData.data;
        const laporanBaru = await prisma.dangerZone.create({
            data: { streetName, dangerType, description, dangerLevel, status: "RAWAN" }
        });
        res.status(201).json({ success: true, message: "Laporan berhasil disimpan!", data: laporanBaru });
    } catch (error) { next(error); }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   patch:
 *     tags: [Zones]
 *     summary: Petugas mengubah status kondisi jalan rawan (Khusus Petugas)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID nomor jalan rawan yang mau diubah statusnya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [RAWAN, DI-PATROLI, AMAN]
 *                 example: AMAN
 *     responses:
 *       200:
 *         description: Status jalan rawan berhasil diperbarui oleh petugas
 *       403:
 *         description: Akses ditolak karena kamu bukan Petugas
 */
// RUTE BARU: Mengunci akses agar murni hanya boleh di-update oleh user ber-role PETUGAS!
router.patch("/:id", cekKunciToken, batasiHakAkses("PETUGAS"), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["RAWAN", "DI-PATROLI", "AMAN"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status wajib diisi antara: RAWAN, DI-PATROLI, atau AMAN!"
            });
        }

        const jalanDiperbarui = await prisma.dangerZone.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.status(200).json({
            success: true,
            message: "Selamat petugas, status laporan jalan rawan berhasil diperbarui!",
            data: jalanDiperbarui
        });
    } catch (error) { next(error); }
});

module.exports = router;