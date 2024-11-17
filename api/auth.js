const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

/*Creando el registro de usuarios */

router.post('/register', async (req, res) => {
const {username,email,password}= req.body
    try{
        /* admin123 = SADADas123D eso hace el Hash*/
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = new User({username, email, password: hashedPassword});
        await user.save();

        res.json({message: 'Usuario registrado correctamente'});


    } catch (error){
        res.status(500).send('Error en el servidor o al ingresar')
    }
    
   

});


/* Creando el Login de usuarios */

router.post('/login', async (req, res) => {
    const {email, password}= req.body

    try{
        const user = await User.findOne({email});
        /*Aqui busca si el usuario existe con el correo */
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        /*Validar si la contraseña es correcta o no */
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }

        /* Creando el token de JWT */
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'

        });
        
        res.json({token});

    } catch (error){
        res.status(500).send('Error en el servidor')
    }
});

module.exports = router;