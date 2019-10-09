class Chat {

    loadChat(id, name)
    {
        if (id != null)
        {
            localStorage.setItem('withResourceId', id);
        }

        var context = this;
        var currentUserId = localStorage.getItem('userId');
        var withResourceId = localStorage.getItem('withResourceId');

        $('#chat-tab').tab('show');
        $('#chat-name').text(name);

        $.post(CONFIG.getChatUrl,
            {
                currentUserId: currentUserId,
                withUserId: withResourceId
            },
            function (data, status)
            {
                console.log(data);
                context.updateChatContainer(data);
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
                container.loadData();
            });
    }

    updateChatContainer(items)
    {
        if (items.length)
        {
            items.forEach(function (item)
            {
                self.addMessage(item);
            });
        }

        $(".messages").animate({scrollTop: $(document).height()}, "fast");
    }

    addMessage(item)
    {
        var style = item.reply ? 'replies' : 'sent';
        var newItem = '<li class="' + style + '"><p>' + item.message + '</p></li>';
        $('.messages ul').prepend(newItem);
    }

    sendMessage()
    {

    }

    addAttachment()
    {

    }
}

var chat = new Chat();