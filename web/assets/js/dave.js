

// counts the number of credits
    function clickCounter() {
    //   if (typeof(Storage) !== "undefined") {
      //
    //     //reset the counter when it reaches 100 and play a sound
    //     if (sessionStorage.clickcount >= 99) {
    //       sessionStorage.clickcount = 0;
    //     }
    //     //increase the counter, stop the current sound and start a new one
    //     else if (sessionStorage.clickcount) {
    //       sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
    //     }
    //     // set the first credit
    //     else {
    //       sessionStorage.clickcount = 1;
    //     }
    //     // change INSERT COIN. to CREDITS
    //     console.log(sessionStorage);
    //   }
        $('.coincoin').stop().css('margin-top','7vh').animate({ 'marginTop': '100vh' }, 250);
        document.getElementByClass("amount").innerHTML =  document.getElementByClass("amount").innerHTML - 2;
    };

$('.list-element-you-know').click(function() {
    alert("Y a quelqu'un ?")
    $('.coincoin').animate({ 'marginTop': '50vh' }, 1000);
});

//If checked
var $newprice = $("#totalprice").text(function(i,v){
    return parseInt(v,10) + 299;
});
//If NOT checked
var $newprice = $("#totalprice").text(function(i,v){
    return parseInt(v,10) - 299;
});
