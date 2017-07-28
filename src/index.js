(function () {
  'use strict';

  angular.module('rdelhommer.ionic.directives',[]);
  angular.module('rdelhommer.ionic.providers',['rdelhommer.ng.core']);
  angular.module('rdelhommer.ionic.services',['rdelhommer.ng.core']);
  angular.module('rdelhommer.ionic',['rdelhommer.ionic.directives', 'rdelhommer.ionic.providers', 'rdelhommer.ionic.services']);
}());
