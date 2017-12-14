// $( document ).ready(function() {
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
                    if (currentCat != itemtypes[itemtype].icatName) {
                        currentCat = itemtypes[itemtype].icatName;
                        html += "<li class='catpppp'>" + itemtypes[itemtype].icatName + "</li>";
                    }
                    html += "<li data-listid='" + itemtypes[itemtype].id + "' class='list-element-you-know'>" + itemtypes[itemtype].name + "</li>";
                }

                $('#autocomplete').html(html);
                $('#autocomplete .list-element-you-know').on('click', function () {
                    $('.search-bar').val($(this).text());
                    var itemId = $(this).data('listid');
                    if ($('#tab-' + itemId).length === 0) {
                        elm = $("<li class=\"tab-pane room-item\" id=\"tab-" + itemId + "\">" + $(this).text() + "<span class='badge'>1</span></li>");

                        button_delete = $("<button><span class=\"glyphicon glyphicon-trash\"></span></button>");

                        button_delete.on('click', function (e) {
                            e.preventDefault();
                             $(this).parent().remove();
                        });
                        elm.append(button_delete);


                        $('.room-items').append(elm);
                    }
                    else {
                        span = $('#tab-' + itemId + " .badge");
                        count = parseInt(span.text()) + 1;
                        span.text(count);
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
// });