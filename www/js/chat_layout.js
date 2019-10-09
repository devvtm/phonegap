$(function() {

    $('.submit').click(function ()
    {
        newMessage();
    });
});

$(window).on('keydown', function (e)
{
    if (e.which == 13)
    {
        newMessage();
        return false;
    }
});

function newMessage()
{
    var $field = $("#message-field");
    message = $field.val();
    if ($.trim(message) == '')
    {
        return false;
    }
    $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $field.val(null);
    $(".messages").animate({scrollTop: $(document).height()}, "fast");
}