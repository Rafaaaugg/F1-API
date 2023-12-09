const swaggerAutogen = require('swagger-autogen')()
const output = './swagger_doc.json'
const endpoints = ['./app.js']

const doc = {
  info: {
    version: "1.0",
    title: "F1 API",
    description: "Documentação do meu projeto de api com tema de F1"
  }
}

swaggerAutogen(output, endpoints, doc)