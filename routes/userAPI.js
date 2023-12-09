const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { success, fail } = require("../helpers/resposta");
const User = require("../model/userModel")
const Auth = require('../helpers/auth')
const id = 0

router.post("/", (req, res) => {
  let { usuario, senha } = req.body;
  if (usuario && senha) {
    User.createUser(usuario, senha, 'comum')
      .then((user) => {
        let token = jwt.sign({ usuario: user.usuario, tipo: user.tipo, id: user.id }, 'Rafael3948230*&!', {
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
          let token = jwt.sign({ usuario: user.usuario, tipo: user.tipo, id: user.id }, 'Rafael3948230*&!', {
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

router.put("/:id", Auth.validaAcesso, async (req, res) => {
  const userId = req.params.id;
  const { usuario, senha } = req.body;
  const userToUpdate = await User.getUserById(userId);

  console.log('ID do usuário passado por parâmetro:', userId);
  console.log('ID do usuário autenticado no token:', req.usuario.id);

  if (!userToUpdate) {
    return res.status(404).json(fail('Usuário não encontrado'));
  }

  if (req.isAdmin || userToUpdate.id == req.params.id) {
    await User.updateUser(userId, usuario, senha);
    return res.json({ success: true, message: 'Dados atualizados com sucesso' });
  } else {
    return res.status(403).json(fail('Permissão negada para atualizar este usuário'));
  }
});



module.exports = router;