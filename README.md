A F1-API é um sistema concebido em torno dos princípios da Fórmula 1. Nele, foram inseridos os registros dos pilotos vitoriosos de cada década, cobrindo os anos de 1950 1960 1970 1980 1990 2000 2010 e 2020.

Os modelos estruturais adotados compreendem:

Season: Esta seção contempla o ano correspondente.
Races: Refere-se às corridas de cada campeonato.
Foi estabelecida uma associação por meio do modelo SeasonRace, que incorpora o ID da Season e todas as corridas vinculadas a ela.
Além disso, o sistema apresenta modelos específicos para pilotos e construtores, detalhando seus nomes, conquistas e outros atributos relevantes. Os dados dos usuários são parte integrante do sistema, armazenando informações como nome de usuário, senha e nível de acesso, distinguindo entre comum e administrador (vale ressaltar que os números representam toda a história dos pilotos e construtorese não apenas daquela temporada).

Todos os modelos possuem rotas definidas para operações GET, POST, PUT e DELETE. Adicionalmente, são implementados recursos auxiliares para a conexão com o banco de dados e autenticação por meio do método JWT (JSON Web Token).

Não posso deixar de mencionar o arquivo .env, onde são mantidas as configurações do banco de dados. Além disso, o sistema é complementado com documentação gerada pelo Swagger. O epicentro do sistema reside no arquivo app.js, onde todas as definições e configurações são estabelecidas.

É importante frisar as extensões incorporadas:

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
