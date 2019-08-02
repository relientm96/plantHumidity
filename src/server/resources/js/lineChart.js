//Chat js render methods

var humidityData;
var temperatureData;

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Generate data function
function generateData(){
    newHumid = (Math.floor((Math.random()*6)) + 1);
    newTemp = (Math.floor((Math.random()*16)) + 5);

    var currentDate = new Date();
    var timeNow = currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':'+ currentDate.getSeconds().toString()
    myChart.data.datasets[0].data.push(newHumid);         
    myChart.data.datasets[1].data.push(newTemp);   
    myChart.data.labels.push(timeNow); 

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
        datasets: [{
            label: 'Humidity',
            data: humidityData,
            backgroundColor: 'rgba(107, 185, 240, 1)',
            fill: false,
            borderColor: 'rgba(107, 185, 240, 1)',
            borderWidth: 2.5,
        },{
            label: 'Temperature ',
            data: temperatureData,
            backgroundColor: 'rgba(214, 69, 65, 1)',
            fill: false,
            borderColor: 'rgba(214, 69, 65, 1)',
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


