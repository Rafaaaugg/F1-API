const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let { usuario, senha, tipo } = req.body

  if (usuario != "" && senha != "") {
    let token = jwt.sign({ usuario: usuario, senha: senha, tipo: tipo }, 'Rafael3948230*&!', {
      expiresIn: '20 min',
    })
    res.json({ logged: true, token: token })
  } else {
    res.status(403).json({ logged: false, mensagem: 'Usuario e Senha inválidos' })
  }
})

module.exports = router;