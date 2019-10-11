class ChatList {

    users = [];
    filter = "";

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
    }

    loadChatList()
    {
        var context = this;
        var currentUserId = localStorage.getItem('userId');

        $('#chat-list-tab').tab('show');

        context.clearFilter();
        application.showLoading();

        $.post(CONFIG.getResourcesUrl,
            {
                currentUserId: currentUserId
            },
            function (users, status)
            {
                context.users = users;
                context.updateChatListContainer();
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

        context.users.forEach(function (el)
        {
            if (context.filter != null && el.name.toLowerCase().indexOf(context.filter.toLowerCase()) == -1)
            {
                return;
            }

            var child = template(el);
            $contacts.append(child);
        });

        context.loadUserProfileImages();
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
}