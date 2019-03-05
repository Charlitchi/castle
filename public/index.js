//var fs = require('fs');
//console.log(fs.readFileSync("french_castle.html").toString());
const fs = require('fs');
var request = require("request");
const parse5 = require('parse5');
const jsdom = require('jsdom');
const cheerio = require('cheerio');
const rp = require('request-promise');
var listeFrance;

var temp;

rp("https://www.relaischateaux.com/fr/site-map/etablissements")
  .then((html) => {

    var text = "France";

    var listeFrance;

    var listeURLFrance = Array(1000);

    var quatre = cheerio("#countryF", html);


    quatre.find('h3').each(function(i, elem) {
      if (cheerio(this).text() == text) {
        listeFrance = cheerio(this)
      }
    });


    // Récupération des URLS
    listeURLFrance = listeFrance.next().find('li').map(
      function(i, el) {
        return cheerio(this).find('a').map(
          function(ii, ell) {
            if (ii === 0) {
              return cheerio(ell).attr('href');
            }
          }
        )[0];
      });


    // Affichage des URLS
    for (var i = 0; listeURLFrance[i] !== undefined; i++) {
      console.log(listeURLFrance[i])
    }

    // écriture des URL dans un fichier distinct via une boucle sur chacun des item de la liste
    for (var i = 0; listeURLFrance[i] !== undefined; i++) {
      // changement d'item
      content = listeURLFrance[i] + " ";
      // fonction d'écriture
      fs.writeFile('listURL.txt', content, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }
    console.log("The file was saved!");
    //test pour voir si on peut le sortir de la boucle
    temp = listeURLFrance
    console.log(typeof temp)

  })
  .catch((err) => {
    console.log(err)
  })

console.log(typeof temp)
// for (var i = 0; temp[i] !== undefined; i++) {
//   console.log("--" + temp[i])
// }

// request("https://www.relaischateaux.com/fr/site-map/etablissements", function(error, response, body) {
//   //const document = parse5.parse(body);
//   //console.log(document.querySelector("CountryF"));
//   $ = cheerio.load(body)
//   //console.log($)
//   console.log($().find('CountryF').html());
// });

/*listeFrance.next().find('li').each(function(i, el) {
  //console.log(cheerio(this));
  console.log(cheerio(this).find('a').map(function(ii,ell) {
      if(i === 0)
      {
        return cheerio(ell).attr('href')
      }
      //console.log(el);
  })[][0]);*/


// listeFrance.next().find('li').each(function(i, el) {
//   cheerio(this).find('a').each(function(ii,ell) {
//       if(ii === 0)
//       {
//         console.log(cheerio(ell).attr('href'));
//       }
//   });
