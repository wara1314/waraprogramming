const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server berjalan dengan mantap di http://localhost:${PORT}`);
});