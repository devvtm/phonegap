class ChatList {

    users = [];
    filter = "";

    loadChatList()
    {
        var context = this;
        var currentUserId = localStorage.getItem('userId');
        var withResourceId = localStorage.getItem('withResourceId');

        $('#chat-list-tab').tab('show');

        $.post(CONFIG.getResourcesUrl,
            {
                currentUserId: currentUserId
            },
            function (users, status)
            {
                context.users = users;
                context.updateChatListContainer();
            });
    }

    updateChatListContainer()
    {
        var context = this;
        var source = document.getElementById("contact-template").innerHTML;
        var template = Handlebars.compile(source);

        var $contacts = $('#contacts-list');
        $contacts.html('');

        context.users.forEach(function (el)
        {
            if (context.filter != null && el.name.toLowerCase().indexOf(context.filter.toLowerCase()) == -1)
            {
                return;
            }

            var child = template(el);
            $contacts.append(child);
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
}

var chatList = new ChatList();


