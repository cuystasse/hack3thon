function openRoom(evt, roomName) {
    // Declare all variables
    var i, roomitems, roomlink;

    // Get all elements with class="room-items" and hide them
    roomitems = document.getElementsByClassName("room-items");
    for (i = 0; i < roomitems.length; i++) {
        roomitems[i].style.display = "none";
    }

    // Get all elements with class="room-link" and remove the class "active"
    roomlink = document.getElementsByClassName("room-link");
    for (i = 0; i < roomlink.length; i++) {
        roomlink[i].className = roomlink[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(roomName).style.display = "block";
    evt.currentTarget.className += " active";

}

    document.getElementById("defaultOpen").click();
