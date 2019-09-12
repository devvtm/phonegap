function login()
{
    var login = $('#login').val();
    var password = $('#password').val();

    var errorVisible = isEmpty(login) || isEmpty(password);

    setErrorVisible(errorVisible)

    if (!errorVisible)
    {
        $.post(config.loginUrl,
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
                    loadMainPage();
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

function loadMainPage()
{
    window.location = "main.html";
}
