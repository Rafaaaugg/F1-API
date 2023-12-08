const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { success, fail } = require("../helpers/resposta");
const User = require("../model/userModel")
const Auth = require('../helpers/auth')

router.post("/", (req, res) => {
  let { usuario, senha } = req.body;

  if (usuario && senha) {
    User.createUser(usuario, senha, 'comum')
      .then((user) => {
        let token = jwt.sign({ usuario: user.usuario, tipo: user.tipo }, 'Rafael3948230*&!', {
          expiresIn: '20 min',
        });
        res.json({ logged: true, token: token });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(fail("Erro ao criar usuário"));
      });
  } else {
    res.status(403).json(fail('Usuário ou senha inválidos'));
  }
});

router.post("/CreateAdmin", Auth.validaAcesso, (req, res) => {
  let { usuario, senha } = req.body;
  if (req.isAdmin) {
    if (usuario && senha) {
      User.createAdmin(usuario, senha, 'admin')
        .then((user) => {
          let token = jwt.sign({ usuario: user.usuario, tipo: user.tipo }, 'Rafael3948230*&!', {
            expiresIn: '20 min',
          });
          res.json({ logged: true, token: token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(fail("Erro ao criar administrador"));
        });
    } else {
      res.status(403).json(fail('Usuário ou senha inválidos'));
    }
  } else {
    res.status(403).json(fail("Acesso Negado"));
  }
});

router.delete("/:id", Auth.validaAcesso, async (req, res) => {
  const userId = req.params.id
  const userToDelete = await User.getUserById(userId)
  if (req.isAdmin) {
    if (!userToDelete) {
      return res.status(404).json(fail('Usuário não encontrado'))
    }

    if (userToDelete.tipo === 'comum') {
      await User.deleteUser(userId)
      res.json({ deleted: true });
    } else {
      return res.status(403).json(fail('Apenas administradores podem excluir usuários comuns'))
    }
  } else {
    return res.status(500).json(fail('Usuarios comuns não podem deletar outro'))
  }

});


module.exports = router;