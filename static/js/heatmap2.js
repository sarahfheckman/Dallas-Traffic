var API_KEY = "pk.eyJ1Ijoic2ZoZWNrbWFuIiwiYSI6ImNqdGdrMmdvMDI0Z280NG51aW56NTN1bmQifQ.r5vF7G3SuSO3YwRIs98mZw";

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var url = "/dallas_traffic";

// grabbing json data
var response = d3.json(url).then(function(response) {
  // seeing json data
  console.log(response);
  var Cluster = L.markerClusterGroup();
  // creating empty array for crime pinpoints
  var heatArray = [];
  // // looping through json data 
  for (var i = 0; i < response.length; i++) {
    var latitudeC = response[i].Latitude;
    var longitudeC = response[i].Longitude;
  
    // adding crime scenes to array where heatmap will be applied 
    Cluster.addLayer(L.marker([latitudeC, longitudeC])
        .bindPopup("<h2> Type of Incident : " + response[i]['Type of Incident'] +
        "</h2><hr><h3>" + response[i]['Type  Location'] +
          "</h3><hr><p>" + response[i]['Update Date'] + "</p>"));
    heatArray.push([latitudeC, longitudeC]);
  }

  // applying heat layer to crime scene array 
  var heat = L.heatLayer(heatArray, {
    radius: 30,
    blur: 35
  });

  var overlayMaps = {
    "Heatmap": heat,
    "Cluster": Cluster
  };

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var myMap = L.map("map", {
    center: [32.7763, -96.7969],
    zoom: 13,
    layers: [darkmap,heat]
  });
  
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var overlayMaps = {
    "Heatmap": heat,
    "Cluster": Cluster
  };

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var myMap = L.map("map", {
    center: [32.7763, -96.7969],
    zoom: 13,
    layers: [darkmap,heat]
  });
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  myMap.invalidateSize();

});


  myMap.invalidateSize();

});