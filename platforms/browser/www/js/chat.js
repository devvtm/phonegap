class Chat {

    initTemplate()
    {
        var source = document.getElementById("chat-item-template").innerHTML;
        self.template = Handlebars.compile(source);
    }

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
        var context = this;
        context.initTemplate();

        if (items.length)
        {
            items.forEach(function (item)
            {
                context.addMessage(item);
            });
        }

        Helper.updateLinksAuth();
        $(".messages").animate({scrollTop: $(document).height()}, "fast");
    }

    addMessage(item)
    {
        item.message = Helper.changeUrlToGlobal(item.message);
        item.style = item.reply ? 'replies' : 'sent';
        var newItem = self.template(item);
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