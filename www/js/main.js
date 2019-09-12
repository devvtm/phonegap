function logout()
{
    localStorage.removeItem('userId');
    window.location = "index.html";
}

function loadMeetings()
{
    $.post(config.meetingsUrl,
        {
            userId: localStorage.getItem('userId')
        },
        function (json, status)
        {
            var data = JSON.parse(json);
            updateMeetingsContainer(data.meetings)
            updateMessagesContainer(data.messages)
        });
}

function updateMeetingsContainer(items)
{
    var $table = $('#meetings-table');
    $table.html('');

    if (items != null)
    {
        for (var i = 0 ; i < items.length; ++i)
        {
            var item = items[i];
            var color = getMeetingsStatusColor(item);
            var child = "<tr style='background-color: " + color + "'><td>" + item.content + "</td></tr>";
            $table.append(child);
        }
    }
}

function getMeetingsStatusColor(item)
{
    var status = item.status;

    if (status != null)
    {
        switch (status)
        {
            case 'DONE': return '#28a745';
            case 'CANCELED': return '#6c757d';
            case 'MOVED': return '#ffc107';
        }
    }

    return '#FFFFFF';
}

function updateMessagesContainer()
{
    var $messages = $('#messages');
    $messages.html('');
}
