//Distance Bar Chart Module

var ESPURL           = "http://147.10.68.24:9140/";

var distanceLive         = [];
var humdidLive           = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Generate data function
function getDistanceData(){
    $.get( ESPURL, function( result ) {
        if(parseInt(result,10) < 200){
            myBarChart.data.datasets[0].data[0] = result;   
            myBarChart.data.datasets[0].data[1] = Math.floor(Math.random()*20+5);   
            myBarChart.update();            
        }
        else{
            myBarChart.data.datasets[0].data[1] = Math.floor(Math.random()*20+5);   
            myBarChart.update();            
        }
    });
}

var ctx = document.getElementById('distanceBar').getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Distance (cm)', 'Humidity'],
        datasets: [{
            label: ['Distance (cm)','Humidity'],
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
                    suggestedMin: 0,
                    suggestedMax: 40,
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


