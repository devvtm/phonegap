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

            context.clearRefreshListener();
            chat.loadChat(id, name, group);
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
                var newMessagesCount = context.updateChatListContainer();
                context.initRefreshListener();

                if (newMessagesCount > 0 && context.newMessagesCount != newMessagesCount)
                {
                    Helper.playSoundAboutNewMessage();
                    context.newMessagesCount = newMessagesCount;
                }

                application.hideLoading();
                application.clearPullDownToRefresh();
                context.updateNewMessagesCountInLeftAccordion();
            });
    }

    updateNewMessagesCountInLeftAccordion()
    {
        var refreshBtn = parent.document.getElementById('message-refresh-btn');

        if (refreshBtn)
        {
            refreshBtn.click();
        }
    }

    updateChatListContainer()
    {
        var context = this;
        var source = document.getElementById("contact-template").innerHTML;
        var template = Handlebars.compile(source);

        var $contacts = $('#contacts-list');

        $contacts.empty();

        context.users.sort((a, b) => (a.count < b.count) ? 1 : ((a.count > b.count) ? -1 : 0));

        var newMessagesCount = 0;
        context.users.forEach(function (el)
        {
            newMessagesCount += el.count;
            if (context.filter != null && el.name.toLowerCase().indexOf(context.filter.toLowerCase()) == -1)
            {
                return;
            }

            el.countStyle = el.count > 0 ? "new-message-count" : "hide";
            var child = template(el);
            $contacts.append(child);
        });

        context.loadUserProfileImages();
        return newMessagesCount;
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

    initRefreshListener()
    {
        var context = this;

        this.refreshListener = setInterval(function ()
        {
            context.loadChatList();

        }, CONFIG.chatListRefreshTime);
    }

    clearRefreshListener()
    {
        if (this.refreshListener)
        {
            clearInterval(this.refreshListener)
        }
    }

    createGroupChat()
    {
        var url = Helper.addAuthToUrl(CONFIG.createGroupChatUrl);
        CONFIG.navigateTo(url);
    }
}