document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {

    };

    window.plugins.OneSignal
        .startInit("621980dd-98f7-433c-9605-52eeb053f12f")
        .handleNotificationOpened(notificationOpenedCallback)
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();

    window.plugins.OneSignal.addSubscriptionObserver(function (state) {
        console.log("state");
        if (!state.from.subscribed && state.to.subscribed) {
            subscribe(device.uuid, state.to.userId)
        }
    });

    console.log("one signal init complete");
}, false);