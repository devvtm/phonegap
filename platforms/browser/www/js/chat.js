class Chat {

    fileHelper = null;
    refreshListener = null;

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

        $('#chat-back-btn').on('click', function ()
        {
            $('#chat-list-tab').tab('show');
            $('#chat-back-btn').hide();

            if (Helper.isMobile())
            {
                $('#menu-btn').show();
            }

            chatList.loadChatList();
            context.clearRefreshListener();
        });

        $('#file-choose-clear-btn').on('click', function ()
        {
            context.clearFilesContainer();
        });

        context.initFilesContainer();
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

    loadChat(id, name, group)
    {
        var context = this;

        localStorage.setItem('withResourceId', id);
        localStorage.setItem('chatName', name);
        localStorage.setItem('groupChat', group);

        var now = new Date();
        var end = Date.now();
        var start = now.setDate(now.getDate() - 30);
        this.changeUI(name);
        this.initFilesContainer();
        this.clearChatContainer();
        this.clearFilesContainer();
        this.clearRefreshListener();
        application.showLoading();
        this.loadMessages(start, end, function ()
        {
            localStorage.setItem('chatDateStart', start);
            context.changeLastTimeUpdate(end);
            context.initRefreshListener();
            application.hideLoading();
            application.clearPullDownToRefresh();
        });
    }

    reloadChat()
    {
        var id = localStorage.getItem('withResourceId');
        var name = localStorage.getItem('chatName');
        var group = localStorage.getItem('groupChat');

        this.loadChat(id, name, group);
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

        $.post(CONFIG.getChatUrl,
            {
                currentUserId: localStorage.getItem('userId'),
                withUserId: localStorage.getItem('withResourceId'),
                groupChat: localStorage.getItem('groupChat'),
                startDate: start,
                endDate: end
            },
            function (data, status)
            {
                context.updateChatContainer(data);
                callback(data);
            });
    }

    loadLastNewMessages()
    {
        var context = this;
        var end = Date.now();
        var start = localStorage.getItem('chatDateEnd');

        context.loadMessages(start, end, function (newMessages)
        {
            context.changeLastTimeUpdate(end);

            if (newMessages)
            {
                for (var i = 0; i < newMessages.length; ++i)
                {
                    if (newMessages[i].reply)
                    {
                        Helper.playSoundAboutNewMessage();
                        break;
                    }
                }
            }
        });
    }

    changeLastTimeUpdate(end)
    {
        localStorage.setItem('chatDateEnd', end + 1000);

        $.post(CONFIG.setMessagesReadUrl,
            {
                currentUserId: localStorage.getItem('userId'),
                withUserId: localStorage.getItem('withResourceId'),
                groupChat: localStorage.getItem('groupChat'),
                sendDate: localStorage.getItem('chatDateEnd')
            },
            function (data, status)
            {
            });
    }

    initRefreshListener()
    {
        var context = this;

        this.refreshListener = setInterval(function ()
        {
            context.loadLastNewMessages();

        }, CONFIG.messageRefreshTime);
    }

    clearRefreshListener()
    {
        if (this.refreshListener)
        {
            clearInterval(this.refreshListener)
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

    initFilesContainer()
    {
        var inputElement = document.querySelector('#file-choose-input');
        this.fileHelper = FilePond.create(inputElement);
    }

    hideFileModalWindow()
    {
        $('#file-choose-modal').modal('hide');
        this.updateFileCountLabel();
    }

    clearFilesContainer()
    {
        if (this.fileHelper)
        {
            this.fileHelper.removeFiles();
        }

        this.updateFileCountLabel();
    }

    updateFileCountLabel()
    {
        var count = '';

        if (this.fileHelper)
        {
            count = this.fileHelper.getFiles().length;

            if (count == '0')
            {
                count = '';
            }
        }

        $('#file-count-label').text(count);
    }

    updateChatContainer(items)
    {
        var context = this;
        context.initTemplate();

        if (items.length)
        {
            items.forEach(function (item)
            {
                context.addMessageToContainer(item);
            });
        }

        Helper.updateLinksAuth();
        this.scrollToLastMessage();
    }

    addMessageToContainer(item)
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
            return Helper.showNotification('Введите текст сообщения');
        }

        var formData = new FormData();
        formData.append('fromUserId', localStorage.getItem('userId'));
        formData.append('toUserId', localStorage.getItem('withResourceId'));
        formData.append('groupChat', localStorage.getItem('groupChat'));
        formData.append('parentNotificationId', context.getLastNotificationId());
        formData.append('message', $field.val());

        var files = this.fileHelper.getFiles();

        for (var i = 0; i < files.length; ++i)
        {
            var file = files[i].file;
            formData.append('file', file, file.name);
        }

        $.ajax({
            url: CONFIG.createMessageUrl,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',

            success: function (item)
            {
                context.clearRefreshListener();
                context.loadLastNewMessages();
                context.initRefreshListener();
                context.clearFilesContainer();
                $field.val(null);
            }
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
        $('#file-choose-modal').modal('show');
    }
}