class App {

    pullDownToRefresh = null;

    disableBackButton()
    {
        document.addEventListener("backbutton", function (e)
        {
            e.preventDefault();
        }, false);

        history.pushState(null, null, window.location.href);
        window.onpopstate = function ()
        {
            history.go(1);
        };
    }

    initPullDownToRefresh()
    {
        var context = this;

        PullToRefresh.init({
            mainElement: '#myTabContent',
            onRefresh: function (pullDownToRefresh) {
                context.pullDownToRefresh = pullDownToRefresh;

                var tab = $("ul#menu li a.active").attr('id');

                switch (tab)
                {
                    case 'messages-tab':
                    case 'meetings-tab':
                    {
                        container.loadData();
                        break;
                    }

                    case 'chat-list-tab':
                    {
                        chatList.loadChatList();
                        break;
                    }

                    case 'chat-tab':
                    {
                        chat.reloadChat();
                        break;
                    }
                }
            }
        });
    }

    clearPullDownToRefresh()
    {
        if (this.pullDownToRefresh)
        {
            this.pullDownToRefresh();
            this.pullDownToRefresh = undefined;
        }
    }

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
                Helper.showNotification('Операция выполнена успешно');
            });
    }

    includeFiles(callback)
    {
        $('#template-container').load('template.html', callback);
        $('#modal-container').load('modal.html');
    }

    showLoading()
    {
        $('body').addClass('loading');
    }

    hideLoading()
    {
        $('body').removeClass('loading');
    }
}