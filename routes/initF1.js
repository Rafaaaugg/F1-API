const express = require("express");
const router = express.Router();
const sequelize = require("../helpers/bd");
const Auth = require('../helpers/auth')
const Season = require("../model/seasonModel");
const constructor = require("../model/constructorChampModel");
const driver = require("../model/driverChampModel");

router.get("/", Auth.validaAcesso, async (req, res) => {
  await sequelize.sync({ force: true });

  //season year, races
  //champilots nome,pais,vitorias,poles,podius,championship
  //chamcosntructors nome,pais,vitorias,poles,podiuns,chamConstructors, chamDrivers
  /* 
    let autores = [
        "J. K. Rowling", "J. R. R. Tolkien", "Aldous Huxley", "George Orwell", "Clarice Lispector"
    ]
    let lautores = []
    for (let i = 0; i < autores.length; i++) {
        lautores.push(await AuthorModel.save(autores[i]))
    }

    let book1 = await BookModel.save("Harry Potter e a Pedra Filosofal", lautores[0].codigo, "Editora 1", 1997)
    let book2 = await BookModel.save("O Senhor dos Anéis", lautores[1], "Editora 2", 1950)
    let book3 = await BookModel.save("Admirável Mundo Novo", "Aldous Huxley", "Editora 1", 1932)

    llivros = [book1, book2, book3]
    res.json({status:true, autores: lautores, livros: llivros})
    */
  let years = ["1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020"];

  let driver1 = await driver.save("Giuseppe Farina", "Italy", 5, 5, 20, 1);
  let driver2 = await driver.save("Jack Brabham", "Australia", 14, 13, 31, 3);
  let driver3 = await driver.save("Jochen Rindt", "Austria", 6, 10, 13, 1);
  let driver4 = await driver.save("Alan Jones", "Austria", 12, 6, 24, 1);
  let driver5 = await driver.save("Ayrton Senna", "Brazil", 41, 65, 80, 3);
  let driver6 = await driver.save(
    "Michael Schumacher",
    "Germany",
    91,
    68,
    155,
    7
  );
  let driver7 = await driver.save(
    "Sebastian Vettel",
    "Germany",
    53,
    57,
    122,
    4
  );
  let driver8 = await driver.save(
    "Lewis Hamilton",
    "United Kingdom",
    103,
    104,
    197,
    7
  );

  let lchampdrivers = [
    driver1,
    driver2,
    driver3,
    driver4,
    driver5,
    driver6,
    driver7,
    driver8,
  ];

  let constructor1 = await constructor.save(
    "Alfa Romeo",
    "Italy",
    10,
    12,
    26,
    0,
    2
  );
  let constructor2 = await constructor.save(
    "Cooper",
    "United Kingdom",
    16,
    11,
    58,
    2,
    2
  );
  let constructor3 = await constructor.save(
    "Lotus",
    "United Kingdom",
    81,
    107,
    197,
    7,
    6
  );
  let constructor4 = await constructor.save(
    "Williams",
    "United Kingdom",
    114,
    128,
    313,
    9,
    7
  );
  let constructor5 = await constructor.save(
    "McLaren",
    "United Kingdom",
    183,
    156,
    503,
    8,
    12
  );
  let constructor6 = await constructor.save(
    "Ferrari",
    "Italy",
    243,
    249,
    807,
    16,
    15
  );
  let constructor7 = await constructor.save(
    "Red Bull",
    "United Kingdom",
    113,
    95,
    264,
    6,
    7
  );
  let constructor8 = await constructor.save(
    "Mercedes",
    "Germany",
    125,
    137,
    289,
    8,
    9
  );

  let lchampConstructors = [
    constructor1,
    constructor2,
    constructor3,
    constructor4,
    constructor5,
    constructor6,
    constructor7,
    constructor8,
  ];
  res.json({
    status: true,
    constructor: lchampConstructors,
    driver: lchampdrivers,
  });

  let races = [
    [
      "THE BRITISH GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE INDIANAPOLIS GRAND PRIX",
      "THE SWITZERLAND GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE FRENCH GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
    ],

    [
      "THE ARGENTINA GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE INDIANAPOLIS GRAND PRIX",
      "THE NETHERLANDS GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE FRENCH GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE PORTUGUESE GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE UNITED STATES GRAND PRIX",
    ],

    [
      "THE SOUTH AFRICA GRAND PRIX",
      "THE SPANISH GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE NETHERLANDS GRAND PRIX",
      "THE FRENCH GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE GERMANY GRAND PRIX",
      "THE AUSTRIAN GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE CANADIAN GRAND PRIX",
      "THE UNITED STATES GRAND PRIX",
      "THE MEXICAN GRAND PRIX",
    ],

    [
      "THE ARGENTINA GRAND PRIX",
      "THE BRAZILIAN GRAND PRIX",
      "THE SOUTH AFRICA GRAND PRIX",
      "THE US WEST UNITED STATES GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE FRENCH GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE GERMANY GRAND PRIX",
      "THE AUSTRIAN GRAND PRIX",
      "THE NETHERLANDS GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE CANADIAN GRAND PRIX",
      "THE UNITED STATES GRAND PRIX",
    ],

    [
      "THE UNITED STATES GRAND PRIX",
      "THE BRAZILIAN GRAND PRIX",
      "THE SAN MARINO GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE CANADIAN GRAND PRIX",
      "THE MEXICAN GRAND PRIX",
      "THE FRENCH GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE GERMANY GRAND PRIX",
      "THE HUNGARIAN GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE PORTUGUESE GRAND PRIX",
      "THE SPANISH GRAND PRIX",
      "THE JAPANESE GRAND PRIX",
      "THE AUSTRALIAN GRAND PRIX",
    ],

    [
      "THE AUSTRALIAN GRAND PRIX",
      "THE BRAZILIAN GRAND PRIX",
      "THE SAN MARINO GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE SPANISH GRAND PRIX",
      "THE EUROPEAN GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE CANADIAN GRAND PRIX",
      "THE FRENCH GRAND PRIX",
      "THE AUSTRIAN GRAND PRIX",
      "THE GERMANY GRAND PRIX",
      "THE HUNGARIAN GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE UNITED STATES GRAND PRIX",
      "THE JAPANESE GRAND PRIX",
      "THE MALAYSIAN GRAND PRIX",
    ],

    [
      "THE BAHRAIN GRAND PRIX",
      "THE AUSTRALIAN GRAND PRIX",
      "THE MALAYSIAN GRAND PRIX",
      "THE CHINESE GRAND PRIX",
      "THE SPANISH GRAND PRIX",
      "THE MONACO GRAND PRIX",
      "THE TURKISH GRAND PRIX",
      "THE CANADIAN GRAND PRIX",
      "THE EUROPEAN GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE GERMANY GRAND PRIX",
      "THE HUNGARIAN GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE SINGAPORE GRAND PRIX",
      "THE JAPANESE GRAND PRIX",
      "THE KOREAN GRAND PRIX",
      "THE BRAZILIAN GRAND PRIX",
      "THE ABU DHABI GRAND PRIX",
    ],

    [
      "THE AUSTRIAN GRAND PRIX",
      "THE STYRIAN GRAND PRIX",
      "THE HUNGARIAN GRAND PRIX",
      "THE BRITISH GRAND PRIX",
      "THE 70TH ANNIVERSARY GRAND PRIX",
      "THE SPANISH GRAND PRIX",
      "THE BELGIUM GRAND PRIX",
      "THE ITALIAN GRAND PRIX",
      "THE TUSCAN GRAND PRIX",
      "THE RUSSIAN GRAND PRIX",
      "THE EIFEL GRAND PRIX",
      "THE PORTUGUESE GRAND PRIX",
      "THE EMILIA ROMAGNA GRAND PRIX",
      "THE TURKISH GRAND PRIX",
      "THE BAHRAIN GRAND PRIX",
      "THE SAKHIR ROMAGNA GRAND PRIX",
      "THE ABU DHABI GRAND PRIX",
    ],
  ];
});

module.exports = router;
