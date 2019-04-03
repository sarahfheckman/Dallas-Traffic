// read CSV with accident data 
d3.csv("./CleanPo_po.csv", function(error, accidentData) {
  if (error) return console.warn(error);
  
  console.log(accidentData);

  // create heat layer 
  accidentData.forEach(function(data) {
    // creating blank array for accident locations
    var accidentLocations = []
    // looping through 
    for (var i = 0; i < data.length; i++) {
      var location = data[i].Coordinates;
      if (location) {
        accidentLocations.push([Location])
      }
    }
    // applying heat layer to crime scene array 
    var heat = L.heatLayer(accidentLocations, {
    radius: 20,
    blur: 35
  }).addTo(myMap);
})

// light layer 
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// dark layer 
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// basemaps 
var baseMaps = {
  Light: lightmap,
  Dark: darkmap
};

// Overlays that may be toggled on or off
var overlayMaps = {
  Accidents: heat
};

// create map
var myMap = L.map("map", {
  center: [32.7767, -96.7970],
  zoom: 13,
  layers: [baseMaps, overlayMaps]
})
});