//Site specific functions

var ESPURL           = "http://147.10.68.24:9140/";
var ESP_MARIO_URL    = "http://147.10.68.24:9140/mario";
var ESP_PIRATES_URL  = "http://147.10.68.24:9140/pirates";

//Render random data when page finishes loading
$( document ).ready(function() {

    generateData();
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false,
    });
    $( "#floatingBtn" ).click(function(){
        alert("Welcome Back Plant Mum Carolyn!\nLet's see what the greenhouse has today!");
    });

    //Song button requests
    $("#marioBtn").click(function(){
        $.ajax({
            url: ESP_MARIO_URL,
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
            url: ESP_PIRATES_URL,
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

});

function getLiveData() {
    let numb2 = Math.floor((Math.random()*6)) + 1;
    var element_1 = document.getElementById("distanceTextHolder");

    var element_2 = document.getElementById("humidityTextHolder");
    element_2.innerHTML = (parseInt(numb2)).toString() + " g/m3";

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














