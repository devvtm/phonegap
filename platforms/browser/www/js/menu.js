function buildLeftMenu()
{
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        menuItem = $('.menu a'),
        isClosed = false;

    trigger.click(function ()
    {
        hamburger_cross();
    });

    menuItem.click(function ()
    {
        trigger.click();
    });

    function hamburger_cross()
    {
        if (isClosed == true)
        {
            isClosed = false;
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');

        } else
        {
            isClosed = true;
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
        }
    }

    $('[data-toggle="offcanvas"]').click(function ()
    {
        $('#wrapper').toggleClass('toggled');
    });
}

function applySettings()
{
    $.post(CONFIG.getSettingsUrl,
        {
            userId: localStorage.getItem('userId')
        },
        function (settings, status)
        {
            if (settings.allNotificationDisabled)
            {
                $('#all-notification-choose').bootstrapToggle('on')
            }

            if (settings.meetingNotificationDisabled)
            {
                $('#meeting-notification-choose').bootstrapToggle('on')
            }
        });
}

function changeSettings()
{
    var meetingVal = $('#meeting-notification-choose').prop('checked');
    var allVal = $('#all-notification-choose').prop('checked');

    $.post(CONFIG.changeSettingsUrl,
        {
            userId: localStorage.getItem('userId'),
            meetingNotificationDisabled: meetingVal,
            allNotificationDisabled: allVal
        },
        function (json, status)
        {
            $('#success-modal').modal('show');
        });
}