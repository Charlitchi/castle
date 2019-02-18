var fs = require('fs');
const michelin = require('./src/michelin');
const relaisCastles = require('./src/relaisAndCastles');
const hotelPrices = require('./src/prices');

Main();
async function Main() {
/*
  console.log("je vais chercher les michelins.")
var namesMichelin = await michelin.collectNames();

  console.log("je vais chercher les RC.")
var restaurantRC = await relaisCastles.CollectRestaurants();

console.log("je vais comparer les listes.")
var listCompared = await Compare(namesMichelin, restaurantRC);

console.log(listCompared)

 var str = JSON.stringify(listCompared);
 fs.writeFile("listCompared.json",str,function (err) {
 if (err) throw err;
 console.log('Saved!');
});*/


 var result = fs.readFileSync("listCompared.json");
result= result.toString();
var listCompared = JSON.parse(result);

// console.log(listCompared)


listComparedWithPrices = await hotelPrices.collectPrices(listCompared);

console.log(listComparedWithPrices)


var str = JSON.stringify(listCompared);
fs.writeFile("listComparedWithPrices.json",str,function (err) {
if (err) throw err;
console.log('Saved!');


})

}



async function Compare(listMichelin, listRC){
  listCompared = [];
  for(var indexMichelin = 0; indexMichelin< listMichelin.length; indexMichelin++) {
    for (var indexRC = 0; indexRC < listRC.length ; indexRC++){
      if (listMichelin[indexMichelin] === listRC[indexRC].nameChef){
        listCompared.push(listRC[indexRC]);
        //console.log(listRC[indexRC].nameRestaurant + " " + listRC[indexRC].nameChef + " " + listRC[indexRC].urlHotel);
      }
    }
  }
  //console.log("Liste comparee :" + listCompared.length)
  return listCompared;
}
