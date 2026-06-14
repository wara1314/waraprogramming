const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

const { cekKunciToken } = require("../middlewares/authMiddlewares");
const { aturanLaporJalan } = require("../validations/zoneValidation");

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

router.post("/", cekKunciToken, async (req, res, next) => {
    try {
        const saringData = aturanLaporJalan.safeParse(req.body);
        if (!saringData.success) {
            return  res.status(400).json({
                succes: false,
                message: saringData.error.errors[0].message
            });
        }
        const { streetName, dangerType, description, dangerLevel } = saringData.data;
        const laporanBaru = await prisma.dangerZone.create({
            data: {
                streetName, dangerType, description, dangerLevel, status: "RAWAN"
            }
        });

        res.status(201).json({
            succcess: true,
            message: "Laporan jalan rawan SafeStreet berhasil disimpan ke database!",
            data: laporanBaru
        });
    } catch (error) { next (error); }
});

module.exports = router;