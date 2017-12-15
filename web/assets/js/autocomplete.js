$(".search-bar").keyup(function () {
    var itemType = $(this).val();
    if (itemType.length >= 1) {
        $.ajax({
            type: "POST",
            url: "/itemtype/list/" + itemType,
            dataType: 'json',
            timeout: 3000,
            success: function (response) {
                var itemtypes = JSON.parse(response.data);
                html = "";
                var currentCat = '';
                for (itemtype in itemtypes) {
                    if (currentCat !== itemtypes[itemtype].icatName) {
                        currentCat = itemtypes[itemtype].icatName;
                        html += "<li class='unacceptable'>" + itemtypes[itemtype].icatName + "</li>";
                    }
                    html += "<li data-listid='" + itemtypes[itemtype].id + "' class='list-element-you-know' onclick='clickCounter()'>" + itemtypes[itemtype].name + "</li>";
                }

                $('#autocomplete').html(html);
                $('#autocomplete .list-element-you-know').on('click', function () {
                    var itemId = $(this).data('listid');
                    var activeRoom = 40;
                    alert('OK');
                        $.ajax({
                            type: "POST",
                            url: "/item/newitem/" + itemId + "/" + activeRoom,
                            timeout: 3000,
                            success: function () {
                                // $('.tab-pane').val(itemId);
                            }
                        });
                    if ($('.active .room-item[data-id=tab-' + itemId + ']').length === 0) {
                        elm = $("<li>" + $(this).text() + "<span class='badge'>" + 1 + "</span></li>")
                            .addClass('tab-pane room-item col-sm-6')
                            .attr('data-id', 'tab-' + itemId)

                        button_delete = $("<button value=\""+104+"\"><span class=\"glyphicon glyphicon-trash\"></span></button>");

                        button_delete.on('click', function (e) {
                            e.preventDefault();
                            var itemRmId = $(this).val();
                            console.log(itemRmId);
                            $.ajax({
                                type: "POST",
                                url: "/item/deleteItem/" + itemRmId,
                                timeout: 3000,
                                success: function (response) {
                                    console.log(response);
                                    $('.items-div').html(response);
                                }

                            })
                            $(this).parent().remove();
                        });
                        elm.append(button_delete);

                        $('.items-div .row .active').append(elm);
                    }
                    else {
                        span = $('.active .room-item[data-id=tab-' + itemId + '] .badge');
                        // count = parseInt(span.text(), 10) + 1;
                        count = span.text();
                        count++;
                        // span.text(count.toString(10));
                        span.text(count);

                        // pulsing span
                        span.animate({
                            opacity: 0.5,
                        }, 300)
                            .animate({
                                opacity: 1,
                            }, 300);

                    }

                });
            },
            error: function () {
                $('#autocomplete').text('Ajax call error');
            }
        });
    } else {
        $('#autocomplete').html('');
    }
});
