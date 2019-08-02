//Distance Bar Chart Module

var ESPURL                  = "http://10.0.0.6"; //http://147.10.68.24.9140
var ESP_MOISTURE_URL        = "http://10.0.0.6/moisture";  
var distanceLive            = [];
var humdidLive              = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Generate data function
function getDistanceData(){

    $.ajax({
        url: ESP_MOISTURE_URL,
        type: 'GET',
        success: function(result) {
            myBarChart.data.datasets[0].data[1] = result; 
            myBarChart.update();              
        },
        error: function (){
            document.getElementById("isSensorOn").innerHTML = "Hmm, I don't think the sensor is on";
        }
    })

    $.ajax({
        url: ESPURL,
        type: 'GET',
        success: function (result) {
            if(parseInt(result,10) < 200){
                myBarChart.data.datasets[0].data[0] = result;   
                myBarChart.update();            
            }
            document.getElementById("isSensorOn").innerHTML = "Data Coming in to you LIVE!";
        },
        error: function (){
            document.getElementById("isSensorOn").innerHTML = "Hmm, I don't think the sensor is on";
        }
    });
}

var ctx = document.getElementById('distanceBar').getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Distance (cm)', 'Moisture (%)'],
        datasets: [{
            label: ['Distance (cm)','Moisture (%)'],
            data: [distanceLive, humdidLive],
            backgroundColor: ['rgba(35, 203, 167, 1)', 'rgba(246, 71, 71, 1)'],
            borderColor: ['rgba(236, 100, 75, 1)','rgba(214, 69, 65, 1)'],
        },]
    },
    options:{
        title: {
            display: true,
            text: 'Track Live Data from Sensors!'
        },
        legend:{
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 150,
                    min: 0,
                }
            }],
        },
        animation: {
            animateScale: true
        },
        layout:{
            padding: 10
        },
    }
});


