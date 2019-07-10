//Humidity Chart Script

var humidityData = [];
var temperatureData = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';
Chart.defaults.global.defaultFontSize   =  18;

//Generate data function
function generateData(){
    for (let i = 0; i < 7 ; i++){
        humidityData[i] = Math.floor((Math.random()*5)) + 1;
        temperatureData[i] = Math.floor((Math.random()*16)) + 5;
    }
    myChart.update();
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['8:00 a.m.', '10:00 a.m.' , '12:00 p.m.', '2:00 p.m.', '4:00 p.m.', '6:00 p.m.', '8:00 p.m.'],
        datasets: [{
            label: 'Humidity',
            data: humidityData,
            backgroundColor: 'rgba(107, 185, 240, 1)',
            fill: false,
            borderColor: 'rgba(107, 185, 240, 1)',
            borderWidth: 1,
        },{
            label: 'Temperature ',
            data: temperatureData,
            backgroundColor: 'rgba(214, 69, 65, 1)',
            fill: false,
            borderColor: 'rgba(214, 69, 65, 1)',
            borderWidth: 1,
        }]
    },
    options : {
        title:{
            display:true,
            text: 'Greenhouse Readings',
            fontSize: 28,
        },
        legend:{
            position:'top',
            labels:{
                fontColor:'#000'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        layout:{
            padding: 10
        },
        responsive: false,
        maintainAspectRatio: false,
    }
});