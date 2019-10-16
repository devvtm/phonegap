class ChatList {

    users = [];
    filter = "";
    newMessagesCount = 0;
    refreshListener = null;

    constructor()
    {
        var context = this;

        $(document).on('click', '.contact', function (e, item)
        {
            var group = $(this).data('group');
            var id = $(this).data('id');
            var name = $(this).data('name');

            if (group)
            {

            }
            else
            {
                context.clearRefreshListener();
                chat.loadChat(id, name);
            }
        });

        $(document).on('keyup', '#resource-filter', function (e, item)
        {
            var value = $(this).val();
            if (value && value.length)
            {
                context.applyFilter();
            }
            else
            {
                context.clearFilter();
            }
        });

        $("#menu").find("a").click(function (e)
        {
            context.clearRefreshListener();
        });
    }

    loadChatList()
    {
        var context = this;
        var currentUserId = localStorage.getItem('userId');

        $('#chat-list-tab').tab('show');

        context.clearFilter();
        context.clearRefreshListener();
        application.showLoading();

        $.post(CONFIG.getResourcesUrl,
            {
                currentUserId: currentUserId
            },
            function (users, status)
            {
                context.users = users;
                context.updateChatListContainer();
                context.initRefreshListener();

                if (context.newMessagesCount > 0)
                {
                    context.playSoundAboutNewMessage();
                }

                application.hideLoading();
                application.clearPullDownToRefresh();
            });
    }

    updateChatListContainer()
    {
        var context = this;
        var source = document.getElementById("contact-template").innerHTML;
        var template = Handlebars.compile(source);

        var $contacts = $('#contacts-list');

        $contacts.empty();

        context.users.sort((a, b) => (a.count < b.count) ? 1 : ((a.count > b.count) ? -1 : 0));

        context.newMessagesCount = 0;
        context.users.forEach(function (el)
        {
            context.newMessagesCount += el.count;
            if (context.filter != null && el.name.toLowerCase().indexOf(context.filter.toLowerCase()) == -1)
            {
                return;
            }

            el.countStyle = el.count > 0 ? "new-message-count" : "hide";
            var child = template(el);
            $contacts.append(child);
        });

        context.loadUserProfileImages();
    }

    updateChatListNewMessages()
    {
        var context = this;
        var currentUserId = localStorage.getItem('userId');
        var source = document.getElementById("contact-template").innerHTML;
        var template = Handlebars.compile(source);

        $.post(CONFIG.getResourcesUrl,
            {
                currentUserId: currentUserId
            },
            function (users, status)
            {
                var messagesCount = 0;
                context.users = users;
                context.users.sort((a, b) => (a.count > b.count) ? 1 : ((a.count < b.count) ? -1 : 0));
                context.users.forEach(function (el)
                {
                    messagesCount += el.count;
                    el.countStyle = el.count > 0 ? "new-message-count" : "hide";

                    var $contact = $('li.contact[data-id=' + el.id + ']');

                    if ($contact)
                    {
                        if (el.count > 0)
                        {
                            var $contacts = $('#contacts-list');
                            $contacts.remove
                            $contact.prependTo('#contacts-list')
                        }
                        else
                        {
                            $contact.replaceWith(template(el));
                        }
                    }
                });

                if (messagesCount > 0 && context.newMessagesCount != messagesCount)
                {
                    context.newMessagesCount = messagesCount;
                    context.playSoundAboutNewMessage();
                }
            });
    }

    applyFilter()
    {
        this.filter = $('#resource-filter').val();
        this.updateChatListContainer();
    }

    clearFilter()
    {
        $('#resource-filter').val("");
        this.filter = "";
        this.updateChatListContainer();
    }

    loadUserProfileImages()
    {
        $('img[data-lazysrc]').each(function ()
            {
                var id = $(this).attr('data-lazysrc');
                var src = CONFIG.buildUrl(CONFIG.getUserImageUrl, "id", id);
                $(this).attr('src', src);
            }
        );
    }

    playSoundAboutNewMessage()
    {
        var sound = new Howl({
            src: [CONFIG.newMessageAudioUrl],
            volume: 0.5,
            onend: function ()
            {
            }
        });
        sound.play()
    }

    initRefreshListener()
    {
        var context = this;

        this.refreshListener = setInterval(function ()
        {
            context.updateChatListNewMessages();

        }, CONFIG.chatListRefreshTime);
    }

    clearRefreshListener()
    {
        if (this.refreshListener)
        {
            clearInterval(this.refreshListener)
        }
    }
}