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
        function (data, status)
        {
            console.log(data);
        });
}
