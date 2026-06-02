const express = require('express');
const app = express ();
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());
app.use('/books', bookRoutes);

module.exports = app;