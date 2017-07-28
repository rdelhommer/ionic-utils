// Wraps $ionicLoading so that the loader automatically hides when a promise is finished
(function () {
  'use strict';

  angular.module('rdelhommer.ionic.providers')
    .provider('loader', LoaderProvider);

  function LoaderProvider() {
    var _loaderGifSrc;

    this.setLoaderGifSrc = setLoaderGifSrc;
    this.$get = $get;

    function setLoaderGifSrc(loaderGifSrc) {
      _loaderGifSrc = loaderGifSrc;
    }

    function $get($ionicLoading) {
      return new Loader($ionicLoading, _loaderGifSrc)
    }
  }

  function Loader($ionicLoading, loaderGifSrc) {
    this.show = show;

    function show(text, loadingPromise) {
      if (!loadingPromise) {
        return console.error(new Error('No loading promise provided to loader.'));
      }

      var fullTemplate = text;
      if (loaderGifSrc) {
        fullTemplate += '<br>' +
        '<img style="height:10px;margin-top:7px;" src="' + loaderGifSrc + '"></img>';
      }

      $ionicLoading.show({
        template: fullTemplate
      });

      loadingPromise.then(function () {
        $ionicLoading.hide();
      }).catch(function () {
        $ionicLoading.hide();
      });

      return loadingPromise;
    }
  }
}());
