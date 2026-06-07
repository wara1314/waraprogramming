require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
