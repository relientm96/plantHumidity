//Distance Bar Chart Module

var distanceLive            = [];

//Globals
Chart.defaults.global.defaultFontFamily = 'Roboto';

//Generate data function
function getDistanceData(){

    var distanceText = document.getElementById("distanceTextHolder");
    $.ajax({
        url: ESP_DIST_URL,
        type: 'GET',
        success: function (result) {

            //Update plot
            if(parseInt(result,10) < 200){
                myBarChart.data.datasets[0].data[0] = result;   
                myBarChart.update();            
            }
            document.getElementById("isSensorOn").innerHTML = "Data Coming in to you LIVE!";

            //Update distance text field
            if( (parseInt(result, 10) > 80) ){
                distanceText.innerHTML = "I Don't See Anything Around...";
            }  
            else if((parseInt(result, 10) <= 7)){
                distanceText.innerHTML = "Someone is too close to me!";
            }
            else{
                distanceText.innerHTML = result + " cm";
            }

        },
        error: function (){
            document.getElementById("isSensorOn").innerHTML = "Hmm, I don't think the sensor is on";
            distanceText.innerHTML = "Cannot read distance from sensor!! :(";
        }
    });
}

var ctx = document.getElementById('distanceBar').getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Distance (cm)'],
        datasets: [{
            label: ['Distance (cm)'],
            data: distanceLive,
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
                    max: 80,
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


