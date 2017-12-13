// $( document ).ready(function() {
$(".search-bar").keyup(function () {
    var itemType = $(this).val();
    if (itemType.length >= 2) {
        $.ajax({
            type: "POST",
            url: "/itemyype/list/" + itemType,
            dataType: 'json',
            timeout: 3000,
            success: function (response) {
                var itemtypes = JSON.parse(response.data);
                html = "";
                for (itemtype in itemtypes) {
                    html += "<li>" + itemtypes[itemtype].name + "</li>";
                }
                $('#autocomplete').html(html);
                $('#autocomplete li').on('click', function () {
                    $('.search-bar').val($(this).text());
                    $('#autocomplete').html('');
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