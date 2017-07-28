# ionic-utils
Common services, directives, factories, etc. for apps built with the Ionic Framework

THIS NEEDS TO BE TESTED.  PLEASE DONT USE IT... please...

## Installation
### NPM or Yarn
```
npm install @rdelhommer/ionic-utils --save
```
or
```
yarn add @rdelhommer/ionic-utils
```

### Include
```
<script src="node_modules/@rdelhommer/ng-core/dist/ng-core.js"></script>
<script src="node_modules/@rdelhommer/ionic-utils/dist/ionic-utils.js"></script>
```

### Inject
```
angular.module('myRockinApp', ['rdelhommer.ionic'];
```

## Components

### Directives

#### image-preview
Creates a small image that when tapped opens a modal whose content is the zoomable, full-screen image

### Providers

#### fcmWrapperProvider
Wraps the cordova-plugin-fcm plugin
* Injectable pub/sub functionality for consumption in controllers, services, etc.
* onTokenRefreshed
* onNotfication

#### loaderProvider
Wraps the $ionicLoading Service
* Show the loader and provide a promise to automatically hide it afterwards

### Services

#### appResumeMessenger
Wraps the app resume event
* Injectable pub/sub functionality for consumption in controllers, services, etc.
* onResume

#### geolocation
Wraps the cordova-plugin-geolocation getLocation() function in a promise
* Returns hardcoded lat/lng for browser testing
* Ensures $ionicPlatform is ready before requesting location

### TODO
* TEST
* Minification
* Improve documentation for each component
