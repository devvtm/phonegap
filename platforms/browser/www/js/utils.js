class Helper {
    static isEmpty(value)
    {
        return value === undefined || value == null || value === "";
    }

    static loadAppPage(url)
    {
        window.open(Helper.addAuthToUrl(url), '_system');
    }

    static addAuthToUrl(url)
    {
        if (url.indexOf('&p=') == -1)
        {
            url = url + "/?l=" + localStorage.getItem('login') + "&p=" + localStorage.getItem('password');
        }

        return url;
    }

    static changeUrlToGlobal(content)
    {
        content = content.split("href='app").join("href='" + window.CONFIG.siteUrl + "/app");
        content = content.split('href="app').join('href="' + window.CONFIG.siteUrl + '/app');
        content = content.split('_self|_blank|_parent|_top').join('_system');
        content = content.split("target='_system'").join("");
        content = content.split("href").join("target='_system' href");

        return content;
    }

    static updateLinksAuth()
    {
        $('a').each(function (index, element)
        {
            var href = $(element).attr('href');
            if (href.indexOf(CONFIG.siteUrl) != -1 && href.indexOf('&p=') != -1)
            {
                $(element).attr('href', Helper.addAuthToUrl(href));
            }
        });
    }

}

