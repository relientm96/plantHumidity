
//Number of elements to keep in plot
var numberOfElements = 5;
//Keep track of number of updates
var updateCount = 0;

var dataOfMoisture = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Poll data from backend express server
function pollMoisture(){
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

    var moistureStatus = document.getElementById("moistureStatus");
    $.ajax({
        url: ESP_MOISTURE_URL,
        success: function (result) {     
            if(updateCount < numberOfElements){
                var currentDate = new Date();
                var timeNow = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':'+ currentDate.getSeconds().toString()
                thisChart.data.datasets[0].data.push(result);         
                thisChart.data.labels.push(timeNow); 
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
            }
            moistureStatus.innerHTML = "Moisture Data Live!"
            thisChart.update();  
        },
        error: function (){
            moistureStatus.innerHTML = "Cannot read sensor!"
        }
    });
    
}

var ctx = document.getElementById('moistureChart').getContext('2d');
var thisChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Live Moisture',
            data: dataOfMoisture,
            backgroundColor: 'rgba(146, 217, 225, 1)',
            fill: false,
            borderColor: 'rgba(107, 185, 240, 1)',
            borderWidth: 2.5,
        }]
    },
    options : {
        legend:{
            position:'top',
            labels:{
                fontColor:'#000'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        layout:{
            padding: 10
        },
        maintainAspectRatio: false,
    }
});


