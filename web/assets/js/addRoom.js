function modifyLink(parentDiv, roomName) {
    var mylink = $('<button></button>')
        .addClass('room-link')
        .attr('value', parentDiv.data('id')) // id of roomCat
        .attr('data-divid', parentDiv.data('id') + '_' + (numberOfRoomCat + 1).toString()) //nom unique : 8_3
        .text(roomName);

    mylink.on('click', function (e) {
        openRoom(e, parentDiv.data('id') + '_' + (numberOfRoomCat + 1).toString());
    });

    $('.room-links .add-room-button').before(mylink);
}

function modifyBody(parentDiv) {
    var mybody = $('<div></div>')
        .addClass('room-items')
        .attr('id', parentDiv.data('id') + '_' + (numberOfRoomCat + 1).toString());

    $('.items-div .row').append(mybody);
}


// Event triggering ADD
$('.roomCategoryModal .btn-success').on('click', function (e) {
    e.preventDefault();
    // todo add room to session

    // add in link
    roomName = $(this).parent().children('span:first').text();
    numberOfRoomCat = $('.room-link[value=' + $(this).parent().data('id') + ']').length;

    if (numberOfRoomCat > 0) {
        roomName += ' ' + (numberOfRoomCat + 1).toString();
    }

    // modify number in modal
    $(this).parent().children('span:last').text(numberOfRoomCat+1);

    // add to bdd
    $.ajax({
        type: "POST",
        url: "/room/newroom/" + $(this).parent().data('id') + "/" + roomName,
        timeout: 3000,
        success: function (){
            $(this).data('id');
        }
    });

    modifyLink($(this).parent(), roomName);

    // add body
    modifyBody($(this).parent());

    // close modal
    // $('#myRoomCategoryModal').modal('toggle');

    // trigger click on new room
    // mylink.click();
});
