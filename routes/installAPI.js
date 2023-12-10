const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router()
const sequelize = require("../helpers/bd")
const Season = require("../model/seasonModel")
const constructor = require("../model/constructorChampModel")
const driver = require("../model/driverChampModel")
const Race = require('../model/raceModel')
const User = require('../model/userModel')

router.get("/", async (req, res) => {
  await sequelize.sync({ force: true })

  const usuario = 'admin'
  const senha = 'admin'
  const tipo = 'admin'

  const tokenAdmin = jwt.sign({ usuario: usuario, senha: senha, tipo: tipo }, 'Rafael3948230*&!', {
    expiresIn: '999999 min',
  })

  let admin = await User.createAdmin(usuario, senha, tipo, tokenAdmin)

  let years = ["1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020"]

  let driver1 = await driver.save("Giuseppe Farina", "Italy", 5, 5, 20, 1)
  let driver2 = await driver.save("Jack Brabham", "Australia", 14, 13, 31, 3)
  let driver3 = await driver.save("Jochen Rindt", "Austria", 6, 10, 13, 1)
  let driver4 = await driver.save("Alan Jones", "Austria", 12, 6, 24, 1)
  let driver5 = await driver.save("Ayrton Senna", "Brazil", 41, 65, 80, 3)
  let driver6 = await driver.save("Michael Schumacher", "Germany", 91, 68, 155, 7)
  let driver7 = await driver.save("Sebastian Vettel", "Germany", 53, 57, 122, 4)
  let driver8 = await driver.save("Lewis Hamilton", "United Kingdom", 103, 104, 197, 7)

  let lchampdrivers = [driver1, driver2, driver3, driver4, driver5, driver6, driver7, driver8,]

  let constructor1 = await constructor.save("Alfa Romeo", "Italy", 10, 12, 26, 0, 2)
  let constructor2 = await constructor.save("Cooper", "United Kingdom", 16, 11, 58, 2, 2)
  let constructor3 = await constructor.save("Lotus", "United Kingdom", 81, 107, 197, 7, 6)
  let constructor4 = await constructor.save("Williams", "United Kingdom", 114, 128, 313, 9, 7)
  let constructor5 = await constructor.save("McLaren", "United Kingdom", 183, 156, 503, 8, 12)
  let constructor6 = await constructor.save("Ferrari", "Italy", 243, 249, 807, 16, 15)
  let constructor7 = await constructor.save("Red Bull", "United Kingdom", 113, 95, 264, 6, 7)
  let constructor8 = await constructor.save("Mercedes", "Germany", 125, 137, 8, 9)

  let lchampConstructors = [constructor1, constructor2, constructor3, constructor4, constructor5, constructor6, constructor7, constructor8,]

  let race1 = await Race.save("THE BRITISH GRAND PRIX")
  let race2 = await Race.save("THE MONACO GRAND PRIX")
  let race3 = await Race.save("THE INDIANAPOLIS GRAND PRIX")
  let race4 = await Race.save("THE SWITZERLAND GRAND PRIX")
  let race5 = await Race.save("THE BELGIUM GRAND PRIX")
  let race6 = await Race.save("THE FRENCH GRAND PRIX")
  let race7 = await Race.save("THE ITALIAN GRAND PRIX")
  let race8 = await Race.save("THE ARGENTINA GRAND PRIX")
  let race9 = await Race.save("THE NETHERLANDS GRAND PRIX")
  let race10 = await Race.save("THE PORTUGUESE GRAND PRIX")
  let race11 = await Race.save("THE UNITED STATES GRAND PRIX")
  let race12 = await Race.save("THE SOUTH AFRICA GRAND PRIX")
  let race13 = await Race.save("THE SPANISH GRAND PRIX")
  let race14 = await Race.save("THE GERMANY GRAND PRIX")
  let race15 = await Race.save("THE AUSTRIAN GRAND PRIX")
  let race16 = await Race.save("THE CANADIAN GRAND PRIX")
  let race17 = await Race.save("THE MEXICAN GRAND PRIX")
  let race18 = await Race.save("THE BRAZILIAN GRAND PRIX")
  let race19 = await Race.save("THE US WEST UNITED STATES GRAND PRIX")
  let race20 = await Race.save("THE SAN MARINO GRAND PRIX")
  let race21 = await Race.save("THE HUNGARIAN GRAND PRIX")
  let race22 = await Race.save("THE JAPANESE GRAND PRIX")
  let race23 = await Race.save("THE AUSTRALIAN GRAND PRIX")
  let race24 = await Race.save("THE EUROPEAN GRAND PRIX")
  let race25 = await Race.save("THE MALAYSIAN GRAND PRIX")
  let race26 = await Race.save("THE BAHRAIN GRAND PRIX")
  let race27 = await Race.save("THE CHINESE GRAND PRIX")
  let race28 = await Race.save("THE TURKISH GRAND PRIX")
  let race29 = await Race.save("THE SINGAPORE GRAND PRIX")
  let race30 = await Race.save("THE KOREAN GRAND PRIX")
  let race31 = await Race.save("THE ABU DHABI GRAND PRIX")
  let race32 = await Race.save("THE STYRIAN GRAND PRIX")
  let race33 = await Race.save("THE 70TH ANNIVERSARY GRAND PRIX")
  let race34 = await Race.save("THE TUSCAN GRAND PRIX")
  let race35 = await Race.save("THE RUSSIAN GRAND PRIX")
  let race36 = await Race.save("THE EIFEL GRAND PRIX")
  let race37 = await Race.save("THE EMILIA ROMAGNA GRAND PRIX")
  let race38 = await Race.save("THE SAKHIR GRAND PRIX")

  let lRaces = [race1, race2, race3, race4, race5, race6, race7, race8, race9, race10, race11, race12, race13, race14, race15,
    race16, race17, race18, race19, race20, race21, race22, race23, race24, race25, race26, race27, race28, race29, race30,
    race31, race32, race33, race34, race35, race36, race37, race38,
  ]

  let season1 = await Season.save(1950, constructor1.id, driver1.id, [race1, race2, race3, race4, race5, race6, race7])
  let season2 = await Season.save(1960, constructor1.id, driver1.id, [race8, race2, race3, race9, race5, race6, race1, race10, race7, race11])
  let season3 = await Season.save(1970, constructor1.id, driver1.id, [race12, race13, race2, race5, race9, race6, race1, race14, race15, race7, race16, race11, race17])
  let season4 = await Season.save(1980, constructor1.id, driver1.id, [race8, race18, race12, race19, race5, race2, race6, race1, race14, race15, race9, race7, race16, race11])
  let season5 = await Season.save(1990, constructor1.id, driver1.id, [race11, race18, race20, race2, race16, race17, race6, race1, race14, race21, race5, race7, race10, race13, race22, race23])
  let season6 = await Season.save(2000, constructor1.id, driver1.id, [race23, race18, race20, race1, race13, race24, race2, race16, race6, race15, race14, race21, race5, race7, race11, race22, race25])
  let season7 = await Season.save(2010, constructor1.id, driver1.id, [race26, race23, race25, race27, race13, race2, race28, race16, race24, race1, race14, race21, race5, race7, race29, race22, race30, race18, race31])
  let season8 = await Season.save(2020, constructor1.id, driver1.id, [race15, race32, race21, race1, race33, race13, race5, race7, race34, race35, race36, race10, race37, race28, race26, race38, race31])
  let lSeasons = [season1, season2, season3, season4, season5, season6, season7, season8]

  let responseData = {
    status: true,
    User: admin,
    token: tokenAdmin,
    constructor: lchampConstructors,
    driver: lchampdrivers,
    races: lRaces,
    seasons: lSeasons
  }

  res.json(responseData)
})

module.exports = router
