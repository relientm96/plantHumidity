//Number of elements to keep in plot
var numberOfElements = 5;
//Keep track of number of updates
var updateCount = 0;
var updateCount1 = 0;
var updateCount2 = 0;

//Data Values
var dataOfMoisture = [];
var dataOfTemperature = [];
var dataOfHumidity = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Poll data from backend express server
function pollMoisture() {
    /*
    if(updateCount < numberOfElements){
        newHumid = (Math.floor((Math.random()*6)) + 1);
        var currentDate = new Date();
        var timeNow = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':'+ currentDate.getSeconds().toString()
        thisChart.data.datasets[0].data.push(newHumid);         
        thisChart.data.labels.push(timeNow); 
        thisChart.update();
        updateCount +=1 ;
    }
    else {
        for (let i = 0 ; i < Math.floor(numberOfElements/4) ; i++){
            thisChart.data.labels.pop();
            thisChart.data.datasets[0].data.pop(); 
        }
        thisChart.data.labels.shift(); 
        thisChart.data.datasets[0].data.shift(); 
        updateCount = 0;
        thisChart.update();
    }*/
    if (readData == 1) {
        var moistureStatus = document.getElementById("moistureStatus");
        var moistureText = document.getElementById("moistureTextHolder");
        $.ajax({
            url: ESP_MOISTURE_URL,
            success: function(result) {
                if (updateCount < numberOfElements) {
                    var currentDate = new Date();
                    var timeNow = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':' + currentDate.getSeconds().toString()
                    thisChart.data.datasets[0].data.push(result);
                    thisChart.data.labels.push(timeNow);
                    updateCount += 1;
                } else {
                    for (let i = 0; i < Math.floor(numberOfElements / 3); i++) {
                        thisChart.data.labels.pop();
                        thisChart.data.datasets[0].data.pop();
                        thisChart.data.labels.shift();
                        thisChart.data.datasets[0].data.shift();
                    }
                    thisChart.data.labels.shift();
                    thisChart.data.datasets[0].data.shift();
                    updateCount = 0;
                }
                moistureStatus.innerHTML = "Live Data Coming In..."
                moistureText.innerHTML = result + " %";
                thisChart.update();
            },
            error: function() {
                moistureStatus.innerHTML = "Cannot read sensor!"
                moistureText.innerHTML = "Cannot read moisture from sensor! :(";
            }
        });

        $.ajax({
            url: ESP_TEMP_URL,
            success: function(result) {
                if (updateCount1 < numberOfElements) {
                    var currentDate = new Date();
                    var timeNow = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':' + currentDate.getSeconds().toString()
                    thisChart.data.datasets[1].data.push(result);
                    thisChart.data.labels.push(timeNow);
                    updateCount1 += 1;
                } else {
                    for (let i = 0; i < Math.floor(numberOfElements / 3); i++) {
                        thisChart.data.labels.pop();
                        thisChart.data.datasets[1].data.pop();
                        thisChart.data.labels.shift();
                        thisChart.data.datasets[1].data.shift();
                    }
                    thisChart.data.labels.shift();
                    thisChart.data.datasets[1].data.shift();
                    updateCount1 = 0;
                }
                moistureStatus.innerHTML = "Live Data Coming In..."
                thisChart.update();
            },
            error: function() {
                moistureStatus.innerHTML = "Cannot read sensor!"
            }
        });

        $.ajax({
            url: ESP_HUMID_URL,
            success: function(result) {
                if (updateCount2 < numberOfElements) {
                    var currentDate = new Date();
                    var timeNow = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':' + currentDate.getSeconds().toString()
                    thisChart.data.datasets[2].data.push(result);
                    thisChart.data.labels.push(timeNow);
                    updateCount2 += 1;
                } else {
                    for (let i = 0; i < Math.floor(numberOfElements / 3); i++) {
                        thisChart.data.labels.pop();
                        thisChart.data.datasets[2].data.pop();
                        thisChart.data.labels.shift();
                        thisChart.data.datasets[2].data.shift();
                    }
                    thisChart.data.labels.shift();
                    thisChart.data.datasets[2].data.shift();
                    updateCount2 = 0;
                }
                moistureStatus.innerHTML = "Live Data Coming In..."
                thisChart.update();
            },
            error: function() {
                moistureStatus.innerHTML = "Cannot read sensor!"
            }
        });
    }
}

function resetPlots() {
    readData = 0;
    thisChart.data.labels = [0];
    thisChart.data.datasets.forEach((dataset) => {
        dataset.data = [0];
    });
    thisChart.update();

    setTimeout(function() {
        readData = 1;
    }, 500);
}





var ctx = document.getElementById('moistureChart').getContext('2d');
var thisChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Live Moisture (%)',
            data: dataOfMoisture,
            backgroundColor: 'rgba(146, 217, 225, 1)',
            fill: false,
            borderColor: 'rgba(107, 185, 240, 1)',
            borderWidth: 2.5,
        }, {
            label: 'Live Temperature (Celcius)',
            data: dataOfTemperature,
            backgroundColor: 'rgba(231, 76, 60, 1)',
            fill: false,
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 2.5,
        }, {
            label: 'Live Humidity (%)',
            data: dataOfHumidity,
            backgroundColor: 'rgba(137, 196, 244, 1)',
            fill: false,
            borderColor: 'rgba(137, 196, 244, 1)',
            borderWidth: 2.5,
        }]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
                fontColor: '#000'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        layout: {
            padding: 10
        },
        maintainAspectRatio: false,
    }
});