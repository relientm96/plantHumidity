//Site specific functions

//Render random data when page finishes loading
$( document ).ready(function() {
    generateData();
    $('.fixed-action-btn').floatingActionButton();
    $( "#floatingBtn" ).click(function(){
        alert("I see that you are stalking Carolyn's Page");
    });
});












