// references dropdown menu 
var e = document.getElementById("selDataset");
var strUser = e.options[e.selectedIndex].text;


function getNum(array,value){
    return array.filter((v) => (v === value)).length;
}


// pulling json data & constructing 
var url = "/selection/<selection>"
function buildChart(selection) {
    Plotly.d3.json(`/selection/${selection}`, function(error, response){
        if (error) {alert(error)}
        else {
            var selector = d3.select("#chart");
            selector.html("")

            // cleaning date column 
            var time = [];
            response.forEach((element) => {
                var test = element['Update Date'].split(' ')[1];
                time.push(parseInt(test.split(':')[0]));
            })
            
            var uniqTime = time.filter(function(item, pos){
                return time.indexOf(item) == pos;
            });
            var accidentCount = [];

            console.log(time)
            var count = 0;

            for (i =0; i< 24; i++) {
                accidentCount.push(getNum(time,i));
            }
          console.log(accidentCount);
        };

            var hours = uniqTime.sort(function(a, b){return a - b});
            var trace1 = {
                x: hours,
                y: accidentCount,
                autosize: false,
                mode: 'lines+markers',
                type: 'scatter',
                margin: {
                    l: 50,
                    r: 50,
                    b: 100,
                    t: 100,
                    pad: 4
                  },
                paper_bgcolor: '#7f7f7f',
                plot_bgcolor: '#c7c7c7'
            }
            var layout = {
                title: {
                    text: 'Accidents by Day and Time',
                    width: 800,
                    height: 800,
                },
                xaxis: {
                    title: {
                        text: 'Time of Day'
                    }
                },
                yaxis: {
                    title: {
                        text: '# of Accidents'
                    }
                }
            }
         
            var data =[trace1]

            Plotly.newPlot('scatter',data, layout);

        }

    )
}

// update information in graph 
function optionChanged(newSelection) {
    buildChart(newSelection);
}

const firstSample = 'Monday';
    buildChart(firstSample);





