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
                //this.siteUrl = "http://192.168.0.101:8090";
                this.siteUrl = "http://127.0.0.1:8090";
                break;
            }
            case "IKPAD":
            {
                this.siteUrl = "http://192.168.0.101:8090";
                break;
            }
            case "MERIDIAN":
            {
                this.siteUrl = "http://192.168.0.101:8090";
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