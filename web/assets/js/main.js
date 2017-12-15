function openRoom(evt, roomName) {
    // Declare all variables
    var i, roomitems, roomlink;

    // Get all elements with class="room-items" and hide them
    // roomitems = document.getElementsByClassName("room-items");
    // for (i = 0; i < roomitems.length; i++) {
    //     roomitems[i].style.display = "none";
    // }
    $('.room-items').hide()
                    .removeClass('active');

    // Get all elements with class="room-link" and remove the class "active"
    // roomlink = document.getElementsByClassName("room-link");
    // for (i = 0; i < roomlink.length; i++) {
    //     roomlink[i].className = roomlink[i].className.replace(" active", "");
    // }
    $('.room-link').removeClass('active');

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(roomName).style.display = "contents";
    $('#'+roomName).addClass('active');
    evt.currentTarget.className += " active";

}


// $('.room-links').click(function(){
//     $('#searchbar').focus();
// });

$(function () {
  $('.karura').fadeOut('fast')
});

document.getElementById("defaultOpen").click();
