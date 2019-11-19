/*Main Javascript*/

//FLAG to change from local to public URLs
const LOCAL_TEST = 0;
//External modem IP address
const MY_EXTERNAL_IP = "matthewhome.dnsalias.org" //"123.208.255.150"; // "147.10.69.128"; 

//Flag to toggle on/off data polling to sensor
var readData = 1;

//Define URLS based on if local environment or cloud environment

//if testing locally
if (LOCAL_TEST) {
    var IPToESP = "10.0.0.6";
    var BACKENDURL = "localhost:45130";
}
//for cloud
else {
    var IPToESP = MY_EXTERNAL_IP + ":9140";
    var BACKENDURL = "pollpots.dynalias.com";
}

//Defined URLS for sensor polling to ESP8266
var ESP_MOISTURE_URL = "http://" + IPToESP + "/moisture";
var ESP_TEMP_URL = "http://" + IPToESP + "/temperature";
var ESP_HUMID_URL = "http://" + IPToESP + "/humidity";
var ESP_DIST_URL = "http://" + IPToESP + "/";

//Render random data when page finishes loading
$(document).ready(function() {

    //generateData();
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false,
    });

    $("#floatingBtn").click(function() {
        alert("Welcome Back Plant Mum Carolyn!\nLet's see what the greenhouse has today!");
    });

    $("#marioBtn").click(function() {
        $.ajax({
            url: "http://" + BACKENDURL + "/remote/mario",
            type: 'POST',
            success: function(result) {
                document.getElementById("playSongTextHolder").innerHTML = result;
            },
            error: function() {
                document.getElementById("playSongTextHolder").innerHTML = "I don't think the sensor is on...";
            }
        });
    });

    $("#piratesBtn").click(function() {
        $.ajax({
            url: "http://" + BACKENDURL + "/remote/pirates",
            type: 'POST',
            success: function(result) {
                document.getElementById("playSongTextHolder").innerHTML = result;
            },
            error: function() {
                document.getElementById("playSongTextHolder").innerHTML = "I don't think the sensor is on...";
            }
        });
    });

    $("#dataButtonTrigger").click(function() {
        readData ^= 1;
    });

    $("#resetButton").click(function() {
        resetPlots();
    })

    //Set timer between polling evens to ESP8266
    setInterval(getDistanceData, 1000);
    setInterval(pollMoisture, 500);

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});