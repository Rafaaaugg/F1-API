A F1-API é um sistema que se fundamenta na Fórmula 1. Realizei a inclusão dos pilotos vencedores de cada década, abrangendo os períodos de 1950, 1960, 1970, 1980, 1990, 2000, 2010 e 2020.

Os modelos estruturais adotados são os seguintes:

Season: Esta seção contém o ano correspondente.
Races: Refere-se às corridas de cada campeonato.
Estabeleci uma associação, criando o modelo SeasonRace, que inclui o ID da Season e todas as corridas associadas a ela.
Além disso, o sistema possui modelos para pilotos e construtores, com seus respectivos dados de nome, vitórias, entre outros detalhes. Os usuários também são parte integrante do sistema, armazenando suas informações como usuário, senha e tipo de acesso, distinguindo entre comum e administrador.

Todos os modelos contam com rotas definidas para operações GET, POST, PUT e DELETE. Adicionalmente, são implementados auxiliares para a conexão com o banco de dados e autenticação através do método JWT (JSON Web Token).

Não posso deixar de mencionar o arquivo .env, onde são mantidas as configurações do banco de dados. Além disso, o sistema dispõe de documentação gerada pelo Swagger. O ponto central do sistema é o arquivo app.js, onde todas as definições e configurações são estabelecidas.

NÃO POSSO DEIXAR DE FALAR AS EXTENÇÕES QUE SÃO:

"dependencies": {
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2",
  "mysql2": "^3.6.3",
  "nodemon": "^3.0.1",
  "sequelize": "^6.35.0",
  "swagger-autogen": "^2.23.7",
  "swagger-ui-express": "^5.0.0"
  }
