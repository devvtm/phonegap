class App {

    buildLeftMenu()
    {
        var context = this;
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            menuItem = $('.menu a'),
            isClosed = false;

        trigger.click(function ()
        {
            hamburger_cross();
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

        menuItem.click(function ()
        {
            trigger.click();
        });

        $('[data-toggle="offcanvas"]').click(function ()
        {
            $('#wrapper').toggleClass('toggled');
        });
    }

    applySettings()
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

    changeSettings()
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

    loadTemplates(callback)
    {
        $('#template-container').load('template.html', callback);
    }
}