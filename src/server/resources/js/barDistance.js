//Distance Bar Chart Module

var ESPURL           = "http://147.10.68.24:9140/";

var distanceLive         = [];
var humdidLive           = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Generate data function
function getDistanceData(){
    $.get( ESPURL, function( result ) {
        console.log("Data for bar: " + result);
        myBarChart.data.datasets[0].data[0] = result;   
        myBarChart.data.datasets[0].data[1] = Math.floor(Math.random()*20+5);   
        myBarChart.update();
    });
}

var ctx = document.getElementById('distanceBar').getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Distance (cm)', 'Humidity'],
        datasets: [{
            label: ['Distance (cm)', 'Humidity'],
            data: [distanceLive, humdidLive],
            backgroundColor: ['rgba(107, 185, 240, 1)', 'rgba(214, 69, 65, 1)'],
            borderColor: ['rgba(107, 185, 240, 1)','rgba(214, 69, 65, 1)'],
        },]
    },
    options:{
        legend:{
            position:'top',
            labels:{
                fontColor:'#000'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 30,
                    stepSize: 2,
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


