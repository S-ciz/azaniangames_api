const express = require("express");

const FormRouter = express.Router();

FormRouter.get('/form', (req, res)=>{

   const {SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, TEMPLATE_ID_GQ} = process.env;

   res.json({SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, TEMPLATE_ID_GQ});
})


module.exports = FormRouter;