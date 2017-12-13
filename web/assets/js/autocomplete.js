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
                    html += "<li class='list-element-you-know'>" + itemtypes[itemtype].name + "</li>";
                }
                $('#autocomplete').html(html);
                $('#autocomplete li').on('click', function () {
                    $('.search-bar').val($(this).text());
                    var itemId = itemtypes[itemtype].id;
                    if ($('#tab-' + itemId).length === 0) {
                        elm = $("<li class=\"tab-pane room-item\" id=\"tab-" + itemId + "\">" + $(this).text() + "<span class='badge'>1</span></li>")
                        $('.room-items').append(elm);
                    }
                    else {
                        span = $('#tab-' + itemId + " span:last-child");
                        count = parseInt(span.text()) + 1;
                        span.text(count);
                        // $('#tab-' + itemId + "span:last-child").text('hello');
                        console.log(count);
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