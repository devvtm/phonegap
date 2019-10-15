class Desktop {
    static initLocalStorageData()
    {
        if (Helper.isMobile())
        {
            return;
        }

        localStorage.setItem('userId', 1);
        localStorage.setItem('server', 'VTM');
    }

    static initDesktopPage()
    {
        if (Helper.isMobile())
        {
            return;
        }

        $('#menu-btn').hide();
        $('#top-header-label').hide();
        chatList.loadChatList();
    }
}