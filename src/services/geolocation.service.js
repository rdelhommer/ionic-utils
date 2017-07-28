// Wrapper for the Cordova plugin - cordova-plugin-geolocation
(function () {
  'use strict';

  angular.module('rdelhommer.ionic.services')
    .service('geolocation', Geolocation);

  function Geolocation($q, $ionicPlatform) {
    var platformReadyPromise = $q((resolve, reject) => {
      $ionicPlatform.ready(resolve);
    });

    this.getLocation = getLocation;

    function getLocation() {
      return $q((resolve, reject) => {
        platformReadyPromise.then(() => {
          // NOTE: Return San Diego if testing in browser
          if (ionic.Platform.platforms.indexOf('browser') !== -1) {
            console.log('WARNING: geolocation.getLocation() invoked in browser - Return San Diego lat/lng');
            return resolve({
              lat: 32.743115,
              lng: -117.147415
            });
          } else {
            // Get current location if possible.
            navigator.geolocation.getCurrentPosition((position) => {
              return resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },(err) => {
              console.log('An error occurred when trying to get the current position');
              console.log(JSON.stringify(err));

              return reject(err);
            });
          }
        });
      });
    }
  }
}());
