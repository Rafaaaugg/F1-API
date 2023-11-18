const express = require('express')
const router = express.Router()
const sequelize = require("../helpers/bd")

const Season = require('../model/Season')
const Race = require('../model/Race')

router.get('/',async (req, res) => {

  await sequelize.sync({force:true})

    let years = [
        "1950","1951","1952","1953","1954","1955","1956","1957","1958","1959",
        "1960","1961","1962","1963","1964","1965","1966","1967","1968","1969",
        "1970","1971","1972","1973","1974","1975","1976","1977","1978","1979",
        "1980","1981","1982","1983","1984","1985","1986","1987","1988","1989",
        "1990","1991","1992","1993","1994","1995","1996","1997","1998","1999",
        "2000","2001","2002","2003","2004","2005","2006","2007","2008","2009",
        "2010","2011","2012","2013","2014","2015","2016","2017","2018","2019",
        "2020","2021","2022","2023"
    ];
    let chamPilot = [
        "Giuseppe Farina","Juan Manuel Fangio","Alberto Ascari","Alberto Ascari",
        "Juan Manuel Fangio","Juan Manuel Fangio","Juan Manuel Fangio","Juan Manuel Fangio",
        "Mike Hawthorn","Jack Brabham","Jack Brabham","Phil Hill","Graham Hill","Jim Clark",
        "John Surtees","Jim Clark","Jack Brabham","Denny Hulme","Graham Hill",
        "Jackie Stewart","Jochen Rindt","Jackie Stewart","Emerson Fittipaldi","Jackie Stewart",
        "Emerson Fittipaldi","Niki Lauda","James Hunt","Niki Lauda","Mario Andretti",
        "Jody Scheckter","Alan Jones","Nelson Piquet","Keke Rosberg","Nelson Piquet",
        "Niki Lauda","Alain Prost","Alain Prost","Nelson Piquet","Ayrton Senna","Alain Prost",
        "Ayrton Senna","Ayrton Senna","Nigel Mansell","Alain Prost","Michael Schumacher",
        "Michael Schumacher","Damon Hill","Jacques Villeneuve","Mika Häkkinen","Mika Häkkinen",
        "Michael Schumacher","Michael Schumacher","Michael Schumacher","Michael Schumacher",
        "Michael Schumacher","Fernando Alonso","Fernando Alonso","Kimi Räikkönen","Lewis Hamilton",
        "Jenson Button","Sebastian Vettel","Sebastian Vettel","Sebastian Vettel","Sebastian Vettel",
        "Lewis Hamilton","Lewis Hamilton","Nico Rosberg","Lewis Hamilton","Lewis Hamilton",
        "Lewis Hamilton","Lewis Hamilton","Max Verstappen" ,"Max Verstappen","Max Verstappen"
    ];
    let chamTeam = [
            "Alfa Romeo", "Alfa Romeo", "Ferrari", "Ferrari",
            "Mercedes", "Mercedes", "Ferrari", "Maserati", "Ferrari",
            "Cooper", "Cooper", "Ferrari", "BRM", "Lotus",
            "Ferrari", "Lotus", "McLaren", "McLaren", "Lotus",
            "Matra", "Lotus", "Tyrrell", "Lotus", "Tyrrell",
            "McLaren", "Ferrari", "McLaren", "Ferrari","Lotus",
            "Ferrari", "Williams","Brabham", "Williams", "Brabham",
            "McLaren", "McLaren", "McLaren", "Williams", "McLaren",
            "McLaren", "McLaren", "McLaren", "Williams", "Williams",
            "Benetton", "Benetton", "Williams", "Williams", "McLaren", 
            "McLaren","Ferrari", "Ferrari", "Ferrari", "Ferrari", 
            "Ferrari","Renault", "Renault", "Ferrari", "McLaren",
            "Brawn", "Red Bull", "Red Bull", "Red Bull", "Red Bull",
            "Mercedes", "Mercedes", "Mercedes", "Mercedes", "Mercedes",
            "Mercedes", "Mercedes", "Red Bull", "Red Bull", "Red Bull"
    ];
})

module.exports = router
