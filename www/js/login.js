function login()
{
    var login = $('#login').val();
    var password = $('#password').val();
    var server = $('#server').val();

    var errorVisible = isEmpty(login) || isEmpty(password);

    setErrorVisible(errorVisible);

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
                if (isEmpty(userId))
                {
                    setErrorVisible(true);
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

function setErrorVisible(show)
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
