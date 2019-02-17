const rp = require('request-promise');
const cheerio = require('cheerio');
//const $ = require('cheerio');

collectNames();

/*export.collectNames() = */
async function collectNames() {
  // Create the list with the URL of the pages of michelin guide where are the URLs
  var listURLPage = CreateListURL();
var chefs = []
  try {
    for (var indexURL = 0; indexURL < listURLPage.length; indexURL++) {
      // récuperer les noms des chefs
      //  chefs.push(await CollectUrlAndNames(listURLPage[indexURL]));
      chefs = Fusion(chefs, await CollectUrlAndNames(listURLPage[indexURL]));
    }
  } catch (error) {
    console.log(error);
  }
  console.log(chefs)
  console.log(chefs.length)
  return chefs;
}

// Fonction Ok
function CreateListURL() {
  var listURLPage = [];
  for (var indexPage = 1; indexPage < 36; indexPage++) {
    listURLPage.push("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-" + indexPage + "?indirect=278");
  }
  return listURLPage;
}

async function CollectUrlAndNames(url) {

  // Affichage


  const option = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  // déclarations
  var listChefs = [];
  var listURLRestaurants = [];

  // code
  try {
      let $ = await rp(option);
    // récupérer tous les URLs des restaurants : dans le HTML ils ont tous 'class="poi-card-link"'

    var blockOfRestaurant = $('.poi-card-link').each(function() {
      listURLRestaurants.push($(this).attr('href'));
    });

    // récuperer les noms des tous les chefs
    for (var indexURL = 0; indexURL < listURLRestaurants.length; indexURL++) {
      var nameChef = await CollectChefName("https://restaurant.michelin.fr/" + listURLRestaurants[indexURL]);
      listChefs.push(nameChef);
      //PrintS(nameChef);
      }
  } catch (error) {
    console.log(error);
  }
  PrintS(listChefs.length)
  return listChefs;
}

async function CollectChefName(url) {
  const option = {
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  };
  var chefRestaurant;
  try {
    let $ = await rp(option);
    chefRestaurant = $('.field--name-field-chef').find('div').children().text().replace('-', ' ').toLowerCase();
  } catch (error) {
    console.log(error);
  }
  return chefRestaurant;
}

function Print(liste) {
  for (var indexList = 0; indexList < liste.length; indexList++) {
    console.log(liste[indexList]);
  }
}

function PrintS(string) {
  console.log(string);
}

function Pause() {
  console.log("C'est la pause")
  while (true) {
    ;
  }
}
function Fusion(liste1, liste2) {
  for (var index = 0; index < liste2.length; index++){
    liste1.push(liste2[index]);
  }
  return liste1;
}
