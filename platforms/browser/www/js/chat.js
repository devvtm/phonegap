function loadChat(resourceId)
{
    if (resourceId != null)
    {
        localStorage.setItem('withResourceId', resourceId);
    }

    var currentUserId = localStorage.getItem('userId');
    var withResourceId = localStorage.getItem('withResourceId');

    $('#chat-tab').tab('show');

    $.post(CONFIG.getChatUrl,
        {
            currentUserId: currentUserId,
            withUserId: withResourceId
        },
        function (json, status)
        {
            var data = JSON.parse(json);
            updateChatContainer(data.messages);
            console.log(json);
            console.log(data);
        });
}

function updateChatContainer(items)
{

}