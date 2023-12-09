const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();

module.exports = {
  validaAcesso: (req, res, next) => {
    let beartoken = req.headers['authorization'] || ""
    let token = beartoken.split(" ")
    if (token[0] == 'Bearer') {
      token = token[1]
    }
    console.log("Bear token:", beartoken)
    console.log("Token:", token)
    jwt.verify(token, 'Rafael3948230*&!', (err, obj) => {
      if (err) res.status(403).json({ mensagem: 'Token invalido' })
      else {
        req.usuario = obj.usuario;
        if (obj.tipo && obj.tipo === 'admin') {
          req.isAdmin = true;
        } else {
          req.isAdmin = false;
        }
        req.usuario.id = obj._id;
        next();
      }
    })
  }
}