//Site specific functions

//Render random data when page finishes loading
$( document ).ready(function() {

    generateData();
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false,
    });
    $( "#floatingBtn" ).click(function(){
        alert("Welcome Back Plant Mum Carolyn!\nLet's see what the greenhouse has today!");
    });

    //Make AJAX Request on press
    $("#songBtn").click(function(){
        $.post({url: "http://10.0.0.6", success: function(){
        }});
    });

    setInterval(getSensorData, 1000); //300000 MS == 5 minutes

});

function getSensorData() {
    let numb = Math.random()*4+10 ;
    var element = document.getElementById("sensorTextHolder");
    element.innerHTML = (parseInt(numb)).toString() + " cm";
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
  });














