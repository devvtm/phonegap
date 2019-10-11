class Auth {

    login()
    {
        var context = this;
        var login = $('#login').val();
        var password = $('#password').val();
        var server = $('#server').val();

        var errorVisible = Helper.isEmpty(login) || Helper.isEmpty(password);

        context.setErrorVisible(errorVisible);

        if (!errorVisible)
        {
            localStorage.setItem('server', server);

            CONFIG.initConfig();

            $.post(CONFIG.loginUrl,
                {
                    login: login,
                    password: password
                },
                function (userId, status)
                {
                    if (Helper.isEmpty(userId))
                    {
                        context.setErrorVisible(true);
                    }
                    else
                    {
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('login', login);
                        localStorage.setItem('password', password);
                        CONFIG.loadPage("main");
                    }
                });
        }
    }

    setErrorVisible(show)
    {
        if (show)
        {
            $('#error-alert').removeClass('invisible');
        }
        else
        {
            $('#error-alert').addClass('invisible');
        }
    }

    logout()
    {
        $.post(CONFIG.logoutUrl,
            {
                userId: localStorage.getItem('userId'),
                deviceId: localStorage.getItem('deviceId')
            },
            function (json, status)
            {
                localStorage.removeItem('userId');
                window.plugins.OneSignal.setSubscription(false);
                window.location = "index.html";
            });
    }

    subscribe(deviceId, signalId)
    {
        localStorage.setItem('deviceId', deviceId);
        localStorage.setItem('signalId', signalId);

        $.post(CONFIG.subscribeUrl,
            {
                userId: localStorage.getItem('userId'),
                deviceId: deviceId,
                signalId: signalId
            },
            function (json, status)
            {
            });
    }
}