alert('ALLO ?');
function openRoom(evt, roomName) {
    alert('ALLO ?');
    // Declare all variables
    var i, room-items, room-link;

    // Get all elements with class="room-items" and hide them
    room-items = document.getElementsByClassName("room-items");
    for (i = 0; i < room-items.length; i++) {
        room-items[i].style.display = "none";
    }

    // Get all elements with class="room-link" and remove the class "active"
    room-link = document.getElementsByClassName("room-link");
    for (i = 0; i < room-link.length; i++) {
        room-link[i].className = room-link[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(roomName).style.display = "block";
    evt.currentTarget.className += " active";
}
