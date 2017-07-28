// Injectable pub/sub service for the app resume event
(function () {
  'use strict';

  angular.module('rdelhommer.ionic.services')
    .service('appResumeMessenger', AppResumeMessenger);

  function AppResumeMessenger($rootScope, $state, $document, eventEmitterFactory) {
    var _eventEmitter = eventEmitterFactory.create();

    this.onResume = onResume;

    _registerEvents();

    function onResume(stateName, callback, registrationScope) {
      _eventEmitter.on('app_reload+' + stateName, callback, registrationScope);
    }

    function _registerEvents() {
      // When the app is resumed, invoke the current state's reload func
      $document[0].addEventListener('resume', () => {
        _eventEmitter.emit('app_reload+' + $state.current.name);
      });
    }
  }
}());
