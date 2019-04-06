var API_KEY = "pk.eyJ1Ijoic2ZoZWNrbWFuIiwiYSI6ImNqdGdrMmdvMDI0Z280NG51aW56NTN1bmQifQ.r5vF7G3SuSO3YwRIs98mZw";

// basemaps 
var baseMaps = {
  Light: lightmap,
  Dark: darkmap
};

// Overlays that may be toggled on or off
// var overlayMaps = {
//   Accidents: heat, cluster
// };

// create map
document.getElementById('map').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

var myMap = L.map("map", {
  center: [32.7767, -96.7970],
  zoom: 13,
  //layers: [baseMaps, overlayMaps]
});

  // Create the tile layer that will be the background of our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);


// read SQLlite db by referencing our JS app route to the SQLlite db
function buildheatLayer(accident) {
  d3.json("/dallas_traffic/").then((data) => {
    
  console.log(heatLayer);

  // create heat layer
  heatLayer.forEach(function(heatLayer) {
    // creating blank array for accident locations
    var accidentLocations = []
    // looping through latitude & longitude to construct coordinates
    for (var i = 0; i < data.length; i++) {
      var latitude = data[i].Latitude;
      var longitude = data[i].Longitude;
      if (latitude & longitude) {
        accidentLocations.push([latitude, longitude])
      }
  }
    // applying heat layer to traffic accident array
    var heat = L.heatLayer(accidentLocations, {
    radius: 20,
    blur: 35
  }).addTo(myMap);
});
});
};

// grab data with d3 to build clusters 
function buildMarkerClusters(accident) {
  d3.json("/dallas_traffic").then((data) => {
    // create marker cluster group 
    var markers = L.markerClusterGroup();
    // loop through 
    for (var i = 0; i < data.length; i++) {
      var latitude = data[i].Latitude;
      var longitude = data[i].Longitude;
      if (latitude & longitude) {
        accidentLocations.push([latitude, longitude])
        .bindPopup(response[i].descriptor);
      }
    }
  // add layers to map 
  myMap.addLayer(markers);
});
};

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


