var myMap = L.map("map", {
  center: [32.7763, -96.7969],
  zoom: 13
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "/accidents";

// grabbing json data
d3.json(url).then(function(response) {
  // seeing json data
  console.log(response);
   
  // creating empty array for crime pinpoints
  var heatArray = [];
  // looping through json data 
  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;
    // adding crime scenes to array where heatmap will be applied 
    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
  // applying heat layer to crime scene array 
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

});

myMap.invalidateSize();
