class DataContainer {

    constructor()
    {
        var source = document.getElementById("button-chat-template").innerHTML;
        self.chatTemplate = Handlebars.compile(source);

        source = document.getElementById("button-read-template").innerHTML;
        self.readTemplate = Handlebars.compile(source);

        source = document.getElementById("meeting-item-template").innerHTML;
        self.meetingTemplate = Handlebars.compile(source);
    }

    loadData()
    {
        var context = this;
        var $spinner = $('#spinner');
        $spinner.removeClass('display-none');

        $.post(CONFIG.dataUrl,
            {
                userId: localStorage.getItem('userId')
            },
            function (data, status)
            {
                console.log('loadData');
                context.updateMeetingsContainer(data.meetings);
                context.updateMessagesContainer(data.messages);
                context.updateLinks();
                $spinner.addClass('display-none');
            });
    }

    updateLinks()
    {
        $('a').each(function (index)
        {
            var href = $(this).attr('href');
            var role = $(this).attr('role');

            if (isEmpty(role))
            {
                $(this).attr('href', addAuthToUrl(href));
            }
        });
    }

    // MEETINGS

    updateMeetingsContainer(items)
    {
        var $table = $('#meetings-table');
        $table.html('');

        if (items != null)
        {
            for (var i = 0; i < items.length; ++i)
            {
                var item = items[i];
                $table.append(DataContainer.buildMeetingItem(item));
            }
        }
    }

    static buildMeetingItem(item)
    {
        return self.meetingTemplate(item);
    }

    static gotoMeeting(id)
    {
        loadAppPage(CONFIG.meetingUrl + id);
    }

    static getMeetingsStatusColor(status)
    {
        if (status != null)
        {
            switch (status)
            {
                case 'DONE':
                    return '#28a745';
                case 'CANCELED':
                    return '#6c757d';
                case 'MOVED':
                    return '#ffc107';
            }
        }

        return '#FFFFFF';
    }

    updateMessagesContainer(items)
    {
        var $table = $('#messages-table');
        $table.html('');

        if (items != null)
        {
            for (var i = 0; i < items.length; ++i)
            {
                var item = items[i];
                $table.append(this.buildMessageItem(item));
            }
        }
    }

    buildMessageItem(item)
    {
        var content = item.content;
        content = content.split("href='app").join("href='" + window.CONFIG.siteUrl + "/app");
        content = content.split('href="app').join('href="' + window.CONFIG.siteUrl + '/app');
        content = content.split('_self|_blank|_parent|_top').join('_system');
        content = content.split("target='_system'").join("");
        content = content.split("href").join("target='_system' href");

        content += "<br/>";
        content += self.chatTemplate(item);
        content += self.readTemplate(item);

        return "<tr><td>" + content + "</td></tr>";
    }
}

var container = new DataContainer();