const prisma = require("../config/prisma.js")

// cari semua buku
const getAllBooks = async ( req, res, next ) => {
    try {
        const books = await prisma.book.findMany();
        res.status(200).json ({
            status: "success",
            data: books
        });
    } catch (error) {
        next(error)
    }
}
// cari satu buku
const getBookById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
            where: { id: Number(id)}
        })

        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Buku tidak di temukan"
            })
        }

        res.status(200).json({
            status: "success",
            data: book
        })

    } catch (error) {
        next(error)
    }
}
// bikin buku baru
const createBook = async ( req, res, next) => {
    try {
        const { title, author, price, stock } = req.body
        const newBook = await prisma.book.create({
            data: { title, author, price, stock }
        })
        res.status(201).json({
            status: "success",
            data: newBook
        })
    } catch (error) {
        next(error)
    }
}
// update satu buku
const updateBook = async (req, res, next) => {
    try { 
        const { id } = req.params
        const { title, author, price, stock } = req.body
        const updateBook = await prisma.Book.update({
            where: { id: (Number(id))},
            data: { title, author, price, stock }
        })
        res.status(200).json({
            status: "success",
            data: updateBook
        })
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                status: "error",
                message: "Buku tidak ditemukan"
            })
        }
        next(error)
    }
}
// ngehapus satu buku
const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        await prisma.book.delete({
            where: { id: Number(id)}
        })
        res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus"
        })
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                status: "error",
                message: "Buku tidak ditemukan"
            })
        } 
        next(error)
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}