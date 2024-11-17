const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();



/*Conexion a la base de datos */

const connectDB = require('./config/db.js');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
console.log("URI de MongoDB:", process.env.MONGO_URI);

app.use('/api/auth',require('./api/auth.js'));
app.use('/api/products',require('./api/products.js'));
const path = require('path');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Servidor abierto en el puerto:  ${PORT}`);
});