document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 6});

    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
        .startInit("621980dd-98f7-433c-9605-52eeb053f12f")
        .handleNotificationOpened(notificationOpenedCallback)
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();

    window.plugins.OneSignal.addSubscriptionObserver(function (state) {
        if (!state.from.subscribed && state.to.subscribed) {
            console.log("Subscribed for OneSignal push notifications!")
            // get player ID
            state.to.userId
        }
        console.log("Push Subscription state changed: " + JSON.stringify(state));
    });

    window.plugins.OneSignal.getPermissionSubscriptionState(function(status) {
        console.log(status);
    });

    window.plugins.OneSignal.provideUserConsent(true);
}, false);