class Desktop {
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