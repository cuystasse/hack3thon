$(".search-bar").keyup(function () {
    var itemType = $(this).val();
    if (itemType.length >= 2) {
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
                        html += "<li class='catpppp'>" + itemtypes[itemtype].icatName + "</li>";
                    }
                    html += "<li data-listid='" + itemtypes[itemtype].id + "' class='list-element-you-know'>" + itemtypes[itemtype].name + "</li>";
                }

                $('#autocomplete').html(html);

                $('#autocomplete li').on('click', function () {
                    var itemId = $(this).data('listid');
                    if ($('.room-item[data-id=tab-' + itemId + ']').length === 0) {
                        elm = $("<li>" + $(this).text() + "<span class='badge'>" + 1 + "</span></li>")
                            .addClass('tab-pane room-item')
                            .attr('data-id', 'tab-' + itemId)

                        button_delete = $("<button><span class=\"glyphicon glyphicon-trash\"></span></button>");

                        button_delete.on('click', function (e) {
                            e.preventDefault();
                            $(this).parent().remove();
                        });
                        elm.append(button_delete);


                        $('.room-items').append(elm);
                    }
                    else {
                        span = $('.room-item[data-id=tab-' + itemId + '] .badge');
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
