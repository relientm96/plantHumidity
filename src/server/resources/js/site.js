//Site specific functions

var ESPURL              = "http://10.0.0.6/";          //http://147.10.68.24:9140/
var ESP_MOISTURE        = "http://10.0.0.6/moisture";  
var ESP_MARIO_URL       = "http://10.0.0.6//mario";    //http://147.10.68.24:9140/mario
var ESP_PIRATES_URL     = "http://10.0.0.6/pirates";   //http://147.10.68.24:9140/pirates

//Render random data when page finishes loading
$( document ).ready(function() {

    generateData();
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false,
    });

    $( "#floatingBtn" ).click(function(){
        alert("Welcome Back Plant Mum Carolyn!\nLet's see what the greenhouse has today!");
    });

    $("#marioBtn").click(function(){
        $.ajax({
            url: "http://localhost:45130/remote/mario", 
            type: 'POST',
            success: function (result) {
                document.getElementById("playSongTextHolder").innerHTML = result;
            },
            error: function (){
                document.getElementById("playSongTextHolder").innerHTML = "I don't think the sensor is on...";
            }
        });
    });

    $("#piratesBtn").click(function(){
        $.ajax({
            url: "http://localhost:45130/remote/pirates",
            type: 'POST',
            success: function (result) {
                document.getElementById("playSongTextHolder").innerHTML = result;
            },
            error: function (){
                document.getElementById("playSongTextHolder").innerHTML = "I don't think the sensor is on...";
            }
        });
    });

    setInterval(getLiveData,     1000); 
    setInterval(getDistanceData, 1000);
    setInterval(pollMoisture,    250);

});

function getLiveData() {

    var element_1 = document.getElementById("distanceTextHolder");
    var element_2 = document.getElementById("humidityTextHolder");

    $.ajax({
        url: ESP_MOISTURE,
        success: function (result) {
            element_2.innerHTML = result + " %";
        },
        error: function (){
            element_2.innerHTML = "Cannot connect to sensor...";
        }
    })

    $.ajax({
        url: ESPURL,
        success: function (result) {
            if( (parseInt(result, 10) > 80) ){
                element_1.innerHTML = "I Don't See Anything Around...";
            }  
            else if((parseInt(result, 10) <= 7)){
                element_1.innerHTML = "Someone is too close to me!";
            }
            else{
                element_1.innerHTML = result + " cm";
            }
        },
        error: function (){
            element_1.innerHTML = "Cannot connect to sensor...";
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
  });














