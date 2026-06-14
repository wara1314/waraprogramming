const jwt = require("jsonwebtoken");
const cekKunciToken = (req, res, next) => {
    const KategoriHeader = req.headers["authorization"];
    const token = KategoriHeader && KategoriHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Akses ditolak! kamu harus membawa kunci token JWT untuk masuk."
        });
    }
    try {
        const dataterbongkar = jwt.verify(token, process.env.JWT_SECRET || "kunci_rahasia_safestreet_123");
        req.user = dataterbongkar;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Waduh, kunci token kamu sudah kedaluwarsa atau tidak sah!"
        });
    }
};

const batasiHakAkses = (...peranYangDiizinkan) => {
    return (req, res, next) => {
        if (!peranYangDiizinkan.includes(req,user.role)) {
            return res.status(403).json({
                success: false,
                message: `Maaf, fitur khusus ini dilarang untuk role ${req.user.role}!`
            });
        }
        next();
    };
};

module.exports = { cekKunciToken, batasiHakAkses };