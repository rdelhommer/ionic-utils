// Wrapper for the Cordova plugin - cordova-plugin-fcm 
(function () {
  'use strict';

  angular.module('rdelhommer.ionic.providers')
    .provider('fcmWrapper', FcmWrapperProvider);

  function FcmWrapperProvider() {
    var _notificationIds;

    this.injectDependencies = injectDependencies;
    this.$get = $get;

    function injectDependencies(notificationIds) {
      _notificationIds = notificationIds;
    }

    function $get($ionicPlatform, eventEmitterFactory) {
      if (!_notificationIds) {
        console.log('WARNING: Dependencies for fcmService have not been injected');
      }

      return new FcmWrapper($ionicPlatform, eventEmitterFactory.create(), _notificationIds);
    }

    function FcmWrapper($ionicPlatform, eventEmitter, notificationIds) {
      this.notificationIds = notificationIds;

      this.getCurrentToken = getCurrentToken;
      this.onNotification = onNotification;
      this.onTokenRefreshed = onTokenRefreshed;

      _wrapFcmService();

      function _wrapFcmService() {
        $ionicPlatform.ready(() => {
          // return if client is not a device
          var isBrowser = ionic.Platform.platforms.indexOf('browser') !== -1;
          if (isBrowser) return;

          console.log('Register handler for FCMPlugin.onTokenRefresh');
          FCMPlugin.onTokenRefresh(function () {
            console.log('FCM token refreshed');
            FCMPlugin.getToken((token) => {
              if (token === null || token === undefined || token === '') {
                return onGetTokenError(new Error('Got a token but it was null, undefined, or empty string.'))
              }

              console.log('Successfully got FCM token');
              eventEmitter.emit('fcm_token_refresh', token);
            }, onGetTokenError);

            function onGetTokenError(err) {
              console.error('Unable to update FCM token');
              console.log(JSON.stringify(err));
            }
          });

          console.log('Register handler for FCMPlugin.onNotification');
          FCMPlugin.onNotification(data => () => {
            eventEmitter.emit('notification+' + data.notificationId, data);
          });
        });
      }

      function getCurrentToken() {
        // return if client is not a device
        if (ionic.Platform.platforms.indexOf('browser') !== -1) return;

        // get the token
        FCMPlugin.getToken(function (token){
          if (token === null || token === undefined || token === '') {
            return onGetTokenError(new Error('Got a token but it was null, undefined, or empty string.'))
          }

          console.log('Successfully got FCM token');
          eventEmitter.emit('fcm_token_refresh', token);
        });
      }

      function onNotification(notificationIds, callback, registrationScope, disableScopeWarning) {
        notificationIds.forEach((id) => {
          if (notificationIds.indexOf(id) === -1) {
            console.log('WARNING: Attempted to subscribe to a notification not registered with FCM service - ' + id);
          }
        });

        notificationIds.forEach((id) => {
          eventEmitter.on('notification+' + id, callback, registrationScope, disableScopeWarning);
        });
      }

      function onTokenRefreshed(callback, registrationScope, disableScopeWarning) {
        eventEmitter.on('fcm_token_refresh', callback, registrationScope, disableScopeWarning);
      }
    }
  }
}());
