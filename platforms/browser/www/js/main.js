class DataContainer {

    initTemplates()
    {
        var templateElement = null;

        if (templateElement = document.getElementById("button-chat-template"))
        {
            self.chatTemplate = Handlebars.compile(templateElement.innerHTML);
        }

        if (templateElement = document.getElementById("button-read-template"))
        {
            self.readTemplate = Handlebars.compile(templateElement.innerHTML);
        }

        if (templateElement = document.getElementById("meeting-item-template"))
        {
            self.meetingTemplate = Handlebars.compile(templateElement.innerHTML);
        }
    }

    loadData()
    {
        var context = this;
        application.showLoading();

        $.post(CONFIG.dataUrl,
            {
                userId: localStorage.getItem('userId')
            },
            function (data, status)
            {
                context.initTemplates();
                context.updateMeetingsContainer(data.meetings);
                context.updateMessagesContainer(data.messages);
                context.updateLinks();
                application.clearPullDownToRefresh();
                application.hideLoading();
            });
    }

    updateLinks()
    {
        $('a').each(function (index)
        {
            var href = $(this).attr('href');
            var role = $(this).attr('role');

            if (Helper.isEmpty(role))
            {
                $(this).attr('href', Helper.addAuthToUrl(href));
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
        Helper.loadAppPage(CONFIG.meetingUrl + id);
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
        var content = Helper.changeUrlToGlobal(item.content);
        content += "<br/>";
        content += self.chatTemplate(item);
        content += self.readTemplate(item);

        return "<tr><td>" + content + "</td></tr>";
    }
}