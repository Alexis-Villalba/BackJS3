import { Router } from "express";
import ProductManager from "../managers/productsManager.js";

const router = Router();
const manager = new ProductManager('../JavaScriptD2/src/data/products.json');

// Ruta para obtener todos los productos 
router.get('/', async (req, res) => {
    try {
        await manager.initialize(); 
        const limit = req.query.limit;
        const products = await manager.getProducts(limit); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para obtener un producto por su id
router.get('/:pid', async (req, res) => {
    try {
        await manager.initialize(); 
        const pid = parseInt(req.params.pid);
        const product = await manager.getProductById(pid); 
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post("/", async (req, res) => {
    try {
        await manager.initialize(); 
        const product = req.body;
        const newProduct = await manager.addProduct(product); 
        res.status (201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        await manager.initialize(); 
        const { pid } = req.params;
        const product = req.body;
        const updateProduct = await manager.updateProduct(pid, product); 
        res.status (201).json(updateProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        await manager.initialize(); 
        const { pid } = req.params;
        await manager.deleteProduct(pid); 
        res.status (204).json({message: "Producto eliminado con éxito"}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;
