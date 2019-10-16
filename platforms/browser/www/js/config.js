var CONFIG = {

    // Settings
    messageRefreshTime: 5 * 1000,
    chatListRefreshTime: 5 * 1000,

    // MobileAppController
    siteUrl: null,
    loginUrl: null,
    logoutUrl: null,
    dataUrl: null,
    subscribeUrl: null,
    messageReadUrl: null,
    meetingUrl: null,
    getSettingsUrl: null,
    changeSettingsUrl: null,

    // MobileAppMessageController
    getChatUrl: null,
    createMessageUrl: null,
    getResourcesUrl: null,
    setMessagesReadUrl: null,

    // MediaController
    getUserImageUrl: null,

    // Audio
    newMessageAudioUrl: null,


    initConfig: function ()
    {
        var server = localStorage.getItem('server');

        switch (server)
        {
            case "VTM":
            {
                //this.siteUrl = "https://proj.vtm-dorproekt.ru:9443/";
                this.siteUrl = "http://127.0.0.1:8090/";
                break;
            }
            case "IKPAD":
            {
                this.siteUrl = "http://94.141.62.220:8181/";
                break;
            }
            case "MERIDIAN":
            {
                this.siteUrl = "http://217.173.79.42:8181/";
                break;
            }
        }

        this.loginUrl = this.buildAction("mobileapp/login");
        this.logoutUrl = this.buildAction("mobileapp/logout");
        this.dataUrl = this.buildAction("mobileapp/loadData");
        this.subscribeUrl = this.buildAction("mobileapp/subscribeDevice");
        this.messageReadUrl = this.buildAction("mobileapp/messageRead");
        this.meetingUrl = this.buildAction("app#NewMeetingChart/meetingChart=");
        this.getSettingsUrl = this.buildAction("mobileapp/getSettings");
        this.changeSettingsUrl = this.buildAction("mobileapp/changeSettings");

        this.getChatUrl = this.buildAction("mobileappmessage/getChat");
        this.createMessageUrl = this.buildAction("mobileappmessage/createMessage");
        this.getResourcesUrl = this.buildAction("mobileappmessage/getResources");
        this.setMessagesReadUrl = this.buildAction("mobileappmessage/setMessagesRead");

        this.getUserImageUrl = this.buildAction("media/getUserImage");
        this.newMessageAudioUrl = this.buildAction("audio/message.mp3")

    },

    buildAction: function (url)
    {
        return this.siteUrl + url;
    },

    loadPage: function (page)
    {
        window.location = page + ".html";
    },

    loadPage: function (page, param, value)
    {
        window.location = page + ".html?" + param + "=" + value;
    },

    buildUrl: function (page, param, value)
    {
        return page + "?" + param + "=" + value;
    }
};