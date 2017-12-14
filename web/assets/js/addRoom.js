$('.roomCategoryModal').on('click', function (e) {
    e.preventDefault();
    // todo add room to session

    // add in link
    roomName = $(this).text();
    numberOfRoomCat = $('.room-link[value=' + $(this).data('id') + ']').length;
    console.log(numberOfRoomCat);
    if (numberOfRoomCat > 0) {
        roomName += ' ' + (numberOfRoomCat + 1).toString();
    }

    var mylink = $('<li value="' + $(this).data('id') + '" class="room-link"><a href="#tab' + $(this).data('id') + numberOfRoomCat + '" data-toggle="pill">' + roomName + '</a></li>');
    // $('.room-links').append(mylink);
    $('.room-links').append(mylink);

    // add body
    var mybody = $('<div class="tab-pane room-item" id="tab' + $(this).data('id') + numberOfRoomCat + '">content</div>');
    $('.room-items').append(mybody);

    // close modal
    $('#myRoomCategoryModal').modal('toggle');

});