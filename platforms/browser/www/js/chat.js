class Chat {

    constructor()
    {
        var context = this;

        $('#send-message').on('click', function ()
        {
            context.sendMessage();
        });

        $("#menu").find("a").click(function (e)
        {
            context.clearRefreshListener();
        });

        $('#chat-back-btn').on('click', function()
        {
            $('#chat-list-tab').tab('show');
            $('#chat-back-btn').hide();
            $('#menu-btn').show();
        })
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

        localStorage.setItem('withResourceId', id);
        localStorage.setItem('chatName', name);
        var now = new Date();
        var end = Date.now();
        var start = now.setDate(now.getDate() - 30);
        this.changeUI(name);
        this.clearChatContainer();
        this.clearRefreshListener();
        application.showLoading();
        this.loadMessages(start, end, function ()
        {
            localStorage.setItem('chatDateStart', start);
            localStorage.setItem('chatDateEnd', end);
            context.initRefreshListener();
            application.hideLoading();
        });
    }

    reloadChat()
    {
        var id = localStorage.getItem('withResourceId');
        var name = localStorage.getItem('chatName');
        this.loadChat(id, name);
    }

    changeUI(chatName)
    {
        $('#chat-tab').tab('show');
        $('#chat-name').text(chatName);
        $('#menu-btn').hide();
        $('#chat-back-btn').show();
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