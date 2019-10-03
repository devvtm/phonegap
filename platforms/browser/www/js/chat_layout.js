// var CSSReload={head:null,init:function(){this._storeHead(),this._listenToPostMessages()},_storeHead:function(){this.head=document.head||document.getElementsByTagName("head")[0]},_listenToPostMessages:function(){var e=this;window[this._eventMethod()](this._messageEvent(),function(t){try{var s=JSON.parse(t.data);"string"==typeof s.css&&e._refreshCSS(s)}catch(e){}},!1)},_messageEvent:function(){return"attachEvent"===this._eventMethod()?"onmessage":"message"},_eventMethod:function(){return window.addEventListener?"addEventListener":"attachEvent"},_refreshCSS:function(e){var t=this._findPrevCPStyle(),s=document.createElement("style");s.type="text/css",s.className="cp-pen-styles",s.styleSheet?s.styleSheet.cssText=e.css:s.appendChild(document.createTextNode(e.css)),this.head.appendChild(s),t&&t.parentNode.removeChild(t),"prefixfree"===e.css_prefix&&StyleFix.process()},_findPrevCPStyle:function(){for(var e=document.getElementsByTagName("style"),t=e.length-1;t>=0;t--)if("cp-pen-styles"===e[t].className)return e[t];return!1}};CSSReload.init();

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
    message = $(".message-input input").val();
    if ($.trim(message) == '')
    {
        return false;
    }
    $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({scrollTop: $(document).height()}, "fast");
}