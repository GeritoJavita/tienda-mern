const express = require('express');
const Product= require('../models/Product.js');
const router = express.Router();
/*Create */
/*Creando el Producto */

router.post('/', async (req, res) => {
    const {name,price,description}=req.body;
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newPoduct);
    } catch (error) {
        res.status(500).send('Error al crear el producto' );
    }
});

/*Read
Leer los productos*/

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

/*Update
Actualizar un producto*/

router.put('/:id', async (req, res) => {
    const { id }=req.params;
    const {name,price,description}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('El id no es válido');

    const updatedProduct = {
        _id: id,
        name: name,
        price: price,
        description: description
    };

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, {new: true});
        if(!product) return res.status(404).send('Producto no encontrado');

    } catch (error) {
        res.status(500).send('Error al actualizar el producto');
    }
});

/*Delete
Borrar un producto*/

router.delete('/:id', async (req, res) => {
    const { id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('El id no es válido');

    try {
      await Product.findByIdAndDelete(id);
    
        res.json({message: 'Producto eliminado'});
    } catch (error) {
        res.status(500).send('Error al borrar el producto');
    }
});

module.exports = router;