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
        function (data, status)
        {
            updateChatContainer(data.messages);
            console.log(data);
        });
}

function updateChatContainer(items)
{

}