var CONFIG = {
    siteUrl : null,
    loginUrl: null,
    logoutUrl: null,
    dataUrl: null,
    subscribeUrl: null,
    messageReadUrl: null,
    meetingUrl: null,

    initConfig: function()
    {
        var server = localStorage.getItem('server');

        switch (server)
        {
            case "VTM":
            {
                this.siteUrl = "https://proj.vtm-dorproekt.ru:9443/";
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
    }
};