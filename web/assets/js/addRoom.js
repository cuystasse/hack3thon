$('.roomCategoryModal').on('click', function (e) {
    e.preventDefault();
    // todo add room to session

    // add in link
    roomName = $(this).text();
    numberOfRoomCat = $('.room-link[value=' + $(this).data('id') + ']').length;

    if (numberOfRoomCat > 0) {
        roomName += ' ' + (numberOfRoomCat + 1).toString();
    }

    $.ajax({
        type: "POST",
        url: "/room/newroom/" + $(this).data('id') + "/" + roomName,
        timeout: 3000,
        success: function (){
            $(this).data('id');
        }
    });

    // var mylink = $('<li value="' + $(this).data('id') + '" class="room-link"><a href="#tab' + $(this).data('id') + numberOfRoomCat + '" data-toggle="pill">' + roomName + '</a></li>');
    var mylink = $('<button></button>')
        .addClass('room-link')
        .attr('value', $(this).data('id')) // id of roomCat
        .attr('data-divid', $(this).data('id') + '_' + (numberOfRoomCat + 1).toString()) //nom unique : 1_3
        .text(roomName);

    mylink.on('click', function (e) {
        openRoom(e, $(this).data('divid'));
    });

    $('.room-links .add-room-button').before(mylink);
        // add body
    // var mybody = $('<div class="tab-pane room-item" id="tab' + $(this).data('id') + numberOfRoomCat + '">content</div>');
    var mybody = $('<div></div>')
        .addClass('room-items')
        .attr('id', $(this).data('id') + '_' + (numberOfRoomCat + 1).toString());
    $('.items-div .row').append(mybody);

    // close modal
    $('#myRoomCategoryModal').modal('toggle');

    // trigger click on new room
    mylink.click();



});
