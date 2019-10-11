var CONFIG = {

    // Settings
    messageRefreshTime: 3 * 1000,

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

    // MediaController
    getUserImageUrl: null,


    initConfig: function ()
    {
        var server = localStorage.getItem('server');

        switch (server)
        {
            case "VTM":
            {
                //this.siteUrl = "https://proj.vtm-dorproekt.ru:9443/";
                this.siteUrl = "http://192.168.0.105:8090/";
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

        this.loginUrl = this.siteUrl + "/mobileapp/login";
        this.logoutUrl = this.siteUrl + "/mobileapp/logout";
        this.dataUrl = this.siteUrl + "/mobileapp/loadData";
        this.subscribeUrl = this.siteUrl + "/mobileapp/subscribeDevice";
        this.messageReadUrl = this.siteUrl + "/mobileapp/messageRead";
        this.meetingUrl = this.siteUrl + "/app#NewMeetingChart/meetingChart=";
        this.getSettingsUrl = this.siteUrl + "/mobileapp/getSettings";
        this.changeSettingsUrl = this.siteUrl + "/mobileapp/changeSettings";

        this.getChatUrl = this.siteUrl + "/mobileappmessage/getChat";
        this.createMessageUrl = this.siteUrl + "/mobileappmessage/createMessage";
        this.getResourcesUrl = this.siteUrl + "/mobileappmessage/getResources";

        this.getUserImageUrl = this.siteUrl + "/media/getUserImage";
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