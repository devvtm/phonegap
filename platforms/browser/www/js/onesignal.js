document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    window.plugins.OneSignal.setLogLevel({logLevel: 0, visualLevel: 0});

    var notificationOpenedCallback = function(jsonData) {

    };

    window.plugins.OneSignal
        .startInit("621980dd-98f7-433c-9605-52eeb053f12f")
        .handleNotificationOpened(notificationOpenedCallback)
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();

    window.plugins.OneSignal.addSubscriptionObserver(function (state) {
        if (!state.from.subscribed && state.to.subscribed) {
            auth.subscribe(device.uuid, state.to.userId)
        }
    });

    window.plugins.OneSignal.setSubscription(true);
}, false);