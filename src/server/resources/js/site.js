//Site specific functions

var ESPURL = "http://147.10.68.24:9140/";
var ESP_MARIO_URL = "http://147.10.68.24:9140/mario"
var ESP_PIRATES_URL = "http://147.10.68.24:9140/pirates"

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
        $.post({url: ESP_MARIO_URL, success: function(){
        }});
    });
    $("#piratesBtn").click(function(){
        $.post({url: ESP_PIRATES_URL, success: function(){
        }});
    });

    //Continually Poll sensor data in background every second
    setInterval(getLiveData, 1000); 

});

function getLiveData() {
    let numb2 = Math.random()*2+5;
    var element_1 = document.getElementById("distanceTextHolder");

    var element_2 = document.getElementById("humidityTextHolder");
    element_2.innerHTML = (parseInt(numb2)).toString() + " g/m3";

    //Get request to ESP8266 server to get live data
    const Http = new XMLHttpRequest();
    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if( (parseInt(this.responseText, 10) > 60) ){
            element_1.innerHTML = "I Don't See Anything Around...";
        }  
        else if((parseInt(this.responseText, 10) <= 6)){
            element_1.innerHTML = "Someone is too close to me!";
        }
        else{
            element_1.innerHTML = this.responseText + " cm";
        }
      }
    };
    Http.open("GET", ESPURL, true);
    Http.send();

}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
  });














