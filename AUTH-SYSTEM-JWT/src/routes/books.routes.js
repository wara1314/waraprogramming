const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authMiddleware'); 

let books = [
    {id: 1, title: 'atomatic habits', author: 'james clear', price: 120000, stock: 50},
    {id: 2, title: 'filosofi teras', author: 'henry Manampiring', price: 110000, stock: 45},
];

let nextId = 3;

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Mendapatkan semua daftar buku
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data buku
 */
//rute untuk mendapatkan semua buku
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Mendapatkan satu buku berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id 
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buku ditemukan
 *       404: 
 *         description: Buku tidak ditemukan
 */
//mengambil satu buku
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find ((b) => b.id == id );

    if (!book) {
        return res.status (404).json({
            success: false,
            messages: 'buku tidak ditemukan'
        });
    }

    res.status(200).json({
        success: true,
        data: book
    });
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     summary: Menambahkan buku baru
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 */
//ambil buku baru
router.post('/', authenticate, (req, res) => {
    const {title, author, price, stock } = req.body;

    const newBook = {id: nextId++, title, author, price, stock };
    books.push(newBook);

    res.status(201).json({
        success: true,
        data: newBook
    });
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Memperbarui data buku berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Data buku berhasil diperbarui
 *       404:
 *         description: Buku tidak ditemukan
 */
//memperbarui data buku
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id == id );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Buku tidak ditemukan'
        });
    }

    books[index] = { id, ...req.body };
    res.status(200).json({ success: true, data: books[index] });
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Menghapus data buku berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 */
//delete buku
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id == id );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Buku tidak ditemukan'
        });
    }

    books.splice(index, 1); 
    res.status(200).json({
        success: true,
        message: 'buku berhasil dihapus',
        data: books
    });
});

module.exports = router;