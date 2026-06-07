const express = require('express');
const router = express.Router();

let books = [
    {id: 1, title: 'atomatic habits', author: 'james clear', price: 120000, stock: 50},
    {id: 2, title: 'filosofi teras', author: 'henry Manampiring', price: 110000, stock: 45},
]

let nextId = 3;

//rute untuk mendapatkan semua buku
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})

//mengambil satu buku
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find ((b) => b.id == id )

    if (!book) {
        return res.status (404).json({
            success: false,
            messages: 'buku tidak ditemukan'
        })
    }

     res.status(200).json({
            success: true,
            data: book
        })
    })

    //ambil buku baru
    router.post('/', (req, res) => {
        const {title, author, price, stock } = req.body

        const newBook = {id: nextId++, title, author, price, stock }
        books.push(newBook);

        res.status(201).json({
            success: true,
            data: newBook
        })
    })

    //memperbarui data buku
    router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id == id )

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Buku tidak ditemukan'
        })
    }

    books[index] = { id, ...req.body };
    res.status(200).json({ success: true, data: books[index] })
})

//delete buku
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id == id )

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Buku tidak ditemukan'
        })
    }

    books.splice(index, 1); 
    res.status(200).json({
        success: true,
        message: 'buku berhasil dihapus',
        data: books
    })

})

module.exports = router;

const express = require("express");
const bookController = require("../controller/book.controller")
const router = express.Router();

router.get("/", bookController.getAllBooks);       //ambil semua buku
router.get("/:id", bookController.getBookById);   //ambil satu
router.post("/", bookController.createBook);      //
router.put("/:id", bookController.updateBook);    
router.delete("/:id", bookController.deleteBook);

module.exports = router;
