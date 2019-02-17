const rp = require('request-promise');
const cheerio = require('cheerio');

exports.CollectChefNames = async function CollectChefNames() {
  const URL = "https://www.relaischateaux.com/fr/site-map/etablissements";
  const option = {
    uri: URL,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  // Declaration
  var country = "France";
  var listCountry;
  var listURLandChef = [];



  try {
    // récuperation du HTML du site.
    let $ = await rp(option);



    $("#countryF").find('h3').each(function(i, elem) {
      // teste si c'est le bon pays :
      if ($(this).text() == country) {

        listeFrance = $(this).next().find('li').each(function(i, elem) {

          var urlHotel = $(this).find('a').attr('href').trim();
          var nameRestaurant = $(this).find('a').first().text().trim();
          var nameChef;
          if ($(this).find('a').next().attr('href') !== undefined) {
            nameChef = $(this).find('a').next().attr('href').trim().split('/');

            nameChef = nameChef[nameChef.length - 1].replace('-', ' ')
            for (var i = 0; i < 10; i++) {
              nameChef = nameChef.replace('-', ' ')
            }
          } else {
            nameChef = null;
          }


          // si il y a un chef, on crée l'objet.
          if (nameChef != null) {
            listURLandChef.push({
              nameRestaurant,
              nameChef,
              urlHotel
            });
          }




        });
      }
    });
    //console.log($(this).first('a'));
  } catch (error) {
    console.log(error);
  }




  for (var i = 0; i< listURLandChef.length; i++){
    console.log(listURLandChef[i]);
  }



  return listURLandChef;
}
