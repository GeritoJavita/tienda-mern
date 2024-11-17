const mongoose = require('mongoose');

const Esquema_Producto = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        
    },
   
})

module.exports = mongoose.model('Producto',Esquema_Producto);