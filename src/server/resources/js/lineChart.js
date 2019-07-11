//Chat js render methods

var humidityData = [];
var temperatureData = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';
//Chart.defaults.global.defaultFontSize   =  18;

//Generate data function
function generateData(){
    var humid = [];
    var temp = [];
    for (let i = 0; i < 7 ; i++){
        humid[i] = Math.floor((Math.random()*5)) + 1;
        temp[i] = Math.floor((Math.random()*16)) + 5;
    }
    myChart.data.datasets[0].data = humid;   
    myChart.data.datasets[1].data = temp;   
    myChart.update();
}

//Poll data from backend express server
function getChartData(){
    var humid = [];
    var temp = [];
    $.ajax({
        url: "http://localhost:45130/api/data/humidity",
        success: function (result) {
            $.each(result, function(index) {
                humid.push(result[index].value);
            });        
            myChart.data.datasets[0].data = humid; 
            myChart.update();  
        }
    });
    $.ajax({
        url: "http://localhost:45130/api/data/temperature",
        success: function (result) {
            $.each(result, function(index) {
                temp.push(result[index].value);
            });        
            myChart.data.datasets[1].data = temp; 
            myChart.update();  
        }
    });
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
    }
});


