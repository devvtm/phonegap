class Chat {

    constructor()
    {
        $(document).on('click', '#send-message', function (e, item)
        {
            chat.sendMessage();
        });
    }

    initTemplate()
    {
        var templateElement = document.getElementById("chat-item-template");

        if (templateElement)
        {
            var source = templateElement.innerHTML;
            self.template = Handlebars.compile(source);
        }
    }

    loadChat(id, name)
    {
        var context = this;

        if (id != null)
        {
            localStorage.setItem('withResourceId', id);
        }

        $('#chat-tab').tab('show');
        $('#chat-name').text(name);

        var now = new Date();
        var end = Date.now();
        var start = now.setDate(now.getDate() - 30);
        this.clearChatContainer();
        this.loadMessages(start, end, function ()
        {
            localStorage.setItem('chatDateStart', start);
            localStorage.setItem('chatDateEnd', end);
            context.initRefreshListener();
        });
    }

    loadMessages(start, end, callback)
    {
        var context = this;
        var currentUserId = localStorage.getItem('userId');
        var withResourceId = localStorage.getItem('withResourceId');

        $.post(CONFIG.getChatUrl,
            {
                currentUserId: currentUserId,
                withUserId: withResourceId,
                startDate: start,
                endDate: end
            },
            function (data, status)
            {
                context.updateChatContainer(data);
                callback();
            });
    }

    initRefreshListener()
    {
        var context = this;

        self.refreshListener = setInterval(function ()
        {
            var end = Date.now();
            var start = localStorage.getItem('chatDateEnd');

            context.loadMessages(start, end, function ()
            {
                localStorage.setItem('chatDateEnd', end);
            });

        }, CONFIG.messageRefreshTime);
    }

    clearRefreshListener()
    {
        if (self.refreshListener)
        {
            clearInterval(self.refreshListener)
        }
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

    clearChatContainer()
    {
        $('.messages ul').empty();
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
        this.scrollToLastMessage();
    }

    addMessage(item)
    {
        item.message = Helper.changeUrlToGlobal(item.message);
        item.style = item.reply ? 'replies' : 'sent';
        var newItem = self.template(item);
        $('.messages ul').append(newItem);
    }

    sendMessage()
    {
        var context = this;
        var $field = $("#message-field");
        var message = $field.val();

        if ($.trim(message) == '')
        {
            return false;
        }

        var currentUserId = localStorage.getItem('userId');
        var withResourceId = localStorage.getItem('withResourceId');

        $.post(CONFIG.createMessageUrl,
            {
                fromUserId: currentUserId,
                toUserId: withResourceId,
                parentNotificationId: context.getLastNotificationId(),
                message: $field.val()
            },
            function (item, status)
            {
                context.addMessage(item);
                context.scrollToLastMessage();
                $field.val(null);
            });
    }

    getLastNotificationId()
    {
        var $message = $('.messages ul li.replies:last');

        if ($message)
        {
            return $message.data('id');
        }

        return null;
    }

    scrollToLastMessage()
    {
        $(".messages").animate({scrollTop: 100000000000}, "fast");
    }

    addAttachment()
    {

    }
}