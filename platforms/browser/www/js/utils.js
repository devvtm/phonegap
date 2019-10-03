function isEmpty(value)
{
    return value === undefined || value == null || value === "";
}

function loadAppPage(url)
{
    window.open(addAuthToUrl(url), '_system');
}

function addAuthToUrl(url)
{
    if (url.indexOf('&p=') == -1)
    {
        url = url + "/?l=" + localStorage.getItem('login') + "&p=" + localStorage.getItem('password');
    }

    return url;
}