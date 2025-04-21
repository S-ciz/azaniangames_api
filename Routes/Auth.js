const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const AuthRouter = express.Router();
require('dotenv').config();

async function hash(password) {
    return await argon2.hash(password);
}

async function verify(password, hash) {
    return await argon2.verify(hash, password)
}



AuthRouter.post('/verifyToken', async(req, res)=>{

    const {token } = req.body;
    try{
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    res.json({"status":true})

    }catch(err)
    {
      res.json({"status": false})
    }
})


AuthRouter.post('/auth', async (req, res) => {

    const { email, password } = req.body;


    let pass = await hash(process.env.ADMIN_PASS);
    const compare = await verify(password, pass);
    const token = jwt.sign({email, password},process.env.JWT_SECRET_KEY, {expiresIn: '60m'});

    if (email === process.env.ADMIN_EMAIL && compare) {

        res.json({ "output": true , "hash": token})
    } else {

        res.json({ "output": false })
    }


})






module.exports = AuthRouter;