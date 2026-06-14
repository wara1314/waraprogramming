const logAktivitas = (req, res, next) => {
    const waktu = new Date().toISOString();

    console.log('[LOG MASUK - ${waktu}] Metode HTTP: ${req.method} Alamat Akses: ${req.url}');
    next();
};

module.exports = logAktivitas;