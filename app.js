import router from './scr/router/index.js';

const express = require('express');
const ProductManager = require('./scr/managers/productsManager.js');
const app = express();
const PORT = 8080;

app.use ("/api", router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});