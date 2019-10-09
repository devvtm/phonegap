class Chat {

    loadChat(resourceId)
    {
        if (resourceId != null)
        {
            localStorage.setItem('withResourceId', resourceId);
        }

        var context = this;
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
                context.updateChatContainer(data.messages);
            });
    }

    setMessageRead(confirmationId)
    {
        $.post(CONFIG.messageReadUrl,
            {
                confirmationId: confirmationId
            },
            function (json, status)
            {
                loadData();
            });
    }

    updateChatContainer(items)
    {

    }

    sendMessage()
    {

    }

    addAttachment()
    {

    }
}

var chat = new Chat();