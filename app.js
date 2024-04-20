const express = require('express');
const ProductManager = require('../BackJS2/scr/index');
const app = express();
const PORT = 8080;

// Creo una instancia de ProductManager
const manager = new ProductManager('../BackJS2/scr/products.json');
manager.initialize();

// Ruta para obtener todos los productos (con soporte para query param 'limit')
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = manager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para obtener un producto por su id
app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = manager.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
