const michelin = require('./src/michelin');
const relaisCastles = require('./src/relaisAndCastles');

Main();
async function Main() {
var namesMichelin = await michelin.collectNames();
var restaurantRC = await relaisCastles.CollectRestaurants();

var listCompared = Compare(namesMichelin, restaurantRC);






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
