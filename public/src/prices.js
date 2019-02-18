const rp = require('request-promise');
const cheerio = require('cheerio');

exports.collectPrices = async function collectPrices(tabHotel) {
  //async function collectPrices(tabHotel) {
  // déclaration

//  console.log("je suis dans la recherche de prix.")
  var prices = [];

  try {
  //  console.log("je suis dans le try.")
    //console.log(tabHotel)

  //  console.log("la longueur du tabHotel : " + tabHotel.length)
    for (var indexHotel = 0; indexHotel < tabHotel.length; indexHotel++) {
    //  console.log("Hotel n°"+indexHotel)
      var price = await collectPriceHotel(tabHotel[indexHotel].urlHotel);
//      console.log(price)
      var urlHotel = tabHotel[indexHotel].urlHotel;
      var nameChef = tabHotel[indexHotel].nameChef;
      var nameRestaurant = tabHotel[indexHotel].nameRestaurant;
      if (price !== null) {
        prices.push({
          nameRestaurant,
          nameChef,
          price,
          urlHotel
        });
    //    console.log(prices)
      }
    }
  } catch (error) {
    console.log(error);
  }
  return prices;
}





async function collectPriceHotel(urlHotel) {
  const option = {
    uri: urlHotel,
    transform: function(body) {
      return cheerio.load(body);
    }
  };
  var price;
  try {
    let $ = await rp(option);
    if ($('.priceTag').children().children().first().attr("class") !== "priceLabel") {
      price = $('.price').text()
      //console.log(typeof price)
      //console.log(price)
    } else {
      price = null;
    }
  } catch (error) {
    console.log(error);
  }
  return price;
}
