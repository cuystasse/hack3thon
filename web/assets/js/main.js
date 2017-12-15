function openRoom(evt, roomName) {
    // Declare all variables
    var i, roomitems, roomlink;

    // Get all elements with class="room-items" and hide them
    $('.room-items').hide()
                    .removeClass('active');

    // Get all elements with class="room-link" and remove the class "active"
    $('.room-link').removeClass('active');

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(roomName).style.display = "contents";
    // $('#'+roomName).addClass('active'); // add active to the current room-tab-items
    // console.log('mon id '+roomName);
    $('#'+roomName).addClass('active'); // add active to the current room-tab-items
    evt.currentTarget.className += " active";

}


// $('.room-links').click(function(){
//     $('#searchbar').focus();
// });

$(function () {
  $('.karura').fadeOut('fast')
});

// document.getElementById("defaultOpen").click();
