
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
                    var itemId = $(this).data('listid');
                    console.log(itemId);
                        $.ajax({
                            type: "POST",
                            url: "/item/newitem/" + itemId,
                            timeout: 3000,
                            success: function () {
                                $('.tab-pane').val(itemId);
                            }
                        })
                    if ($('#tab-' + itemId).length === 0) {
                        elm = $("<li class=\"tab-pane room-item\" id=\"tab-" + itemId + "\">" + $(this).text() + "<span class='badge'>1</span></li>");

                        button_delete = $("<button><span class=\"glyphicon glyphicon-trash\"></span></button>");

                        button_delete.on('click', function (e) {
                            e.preventDefault();
                            // var itemRmId = $(this).val();
                            // console.log(itemRmId);
                            // $.ajax({
                            //     type: "POST",
                            //     url: "/item/delete/" + itemRmId,
                            //     timeout: 3000,
                            //     success: function () {
                            //         $('.tab-pane').val(itemRmId);
                            //     }
                            // })
                            $(this).parent().remove();
                        });
                        elm.append(button_delete);


                        $('.room-items').append(elm);
                    }
                    else {
                        span = $('#tab-' + itemId + " .badge");
                        count = parseInt(span.text() + 1);
                        console.log(span.text());
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
