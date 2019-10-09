function loadData()
{
    var $spinner = $('#spinner');
    $spinner.removeClass('display-none');

    $.post(CONFIG.dataUrl,
        {
            userId: localStorage.getItem('userId')
        },
        function (data, status)
        {
            console.log('loadData');
            updateMeetingsContainer(data.meetings);
            updateMessagesContainer(data.messages);
            updateLinks();
            $spinner.addClass('display-none');
        });
}

function updateLinks()
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

function updateMeetingsContainer(items)
{
    var $table = $('#meetings-table');
    $table.html('');

    if (items != null)
    {
        for (var i = 0; i < items.length; ++i)
        {
            var item = items[i];
            $table.append(buildMeetingItem(item));
        }
    }
}

function buildMeetingItem(item)
{
    return "<tr style='background-color: " + getMeetingsStatusColor(item) + "'><td>" + item.content + "<button type='button' class='btn btn-primary btn-sm link-btn' onclick='gotoMeeting(" + item.id + ")'>Перейти к совещанию</button></td></tr>";
}

function gotoMeeting(id)
{
    loadAppPage(CONFIG.meetingUrl + id);
}

function getMeetingsStatusColor(item)
{
    var status = item.status;

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


// MESSAGES

function updateMessagesContainer(items)
{
    var $table = $('#messages-table');
    $table.html('');

    if (items != null)
    {
        for (var i = 0; i < items.length; ++i)
        {
            var item = items[i];
            $table.append(buildMessageItem(item));
        }
    }
}

function buildMessageItem(item)
{
    var content = item.content;
    content = content.split("href='app").join("href='" + window.CONFIG.siteUrl + "/app");
    content = content.split('href="app').join('href="' + window.CONFIG.siteUrl + '/app');
    content = content.split('_self|_blank|_parent|_top').join('_system');
    content = content.split("target='_system'").join("");
    content = content.split("href").join("target='_system' href");

    content += "<br/><button type='button' class='btn btn-primary btn-sm link-btn margin-5' onclick='chat.loadChat(" + item.authorId + ")'><i class='fa fa-comments fa-2x'></i></button>";
    content += "<button type='button' class='btn btn-success btn-sm link-btn margin-5' onclick='chat.setMessageRead(" + item.confirmationId + ")'><i class='fa fa-check fa-2x'></i></button>";

    return "<tr><td>" + content + "</td></tr>";
}