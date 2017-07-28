// Creates a small image that when tapped opens a modal whose content is the zoomable, full-screen image
(function () {
  'use strict';

  angular.module('rdelhommer.ionic.directives')
    .directive('imagePreview', imagePreview);

  function imagePreview() {
    return {
      restrict: 'E',
      scope: {
        imageData: '@'
      },
      controller: controller,
      templateUrl: 'templates/image-preview.directive.html'
    };

    function controller($scope, $timeout, $element, $ionicModal) {
      $scope.showExpanded = showExpanded;
      $scope.hideExpanded = hideExpanded;

      $scope.$watch('imageData', () => {
        var img = new Image();

        img.onload = function() {
          $timeout(setImageDimensions(this.height, this.width));
        };

        img.src = 'data:image/jpeg;base64,' + $scope.imageData; 
      });

      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        if (!$scope.modal) return;

        $scope.modal.remove();
      });

      // Create the modal
      var template =
        '<ion-modal-view>' +
          $element.find('ion-modal-view').html() +
        '</ion-modal-view>';

      $scope.modal = $ionicModal.fromTemplate(template, {
        scope: $scope,
        animation: 'slide-in-up'
      });

      function showExpanded($event) {
        $scope.modal.show();
        $event.stopPropagation();
      }

      function hideExpanded() {
        $scope.modal.hide();
      }

      function setImageDimensions(height, width) {
        var imageHeight;
        var imageWidth;
        var imageExpandedHeight;
        var imageExpandedWidth;

        if (width > height) {
          var ratio = width / height;
          imageHeight = 100;
          imageWidth = imageHeight * ratio;
          imageExpandedWidth = window.innerWidth;
          imageExpandedHeight = window.innerWidth / ratio;

          if (imageExpandedHeight > window.innerHeight) {
            var difference = imageExpandedHeight - window.innerHeight;
            imageExpandedHeight -= difference;
            imageExpandedWidth -= (difference * ratio);
          }
        } else {
          var ratio = height / width;
          imageWidth = 100;
          imageHeight = imageWidth * ratio;
          imageExpandedHeight = window.innerHeight;
          imageExpandedWidth = window.innerHeight / ratio;

          if (imageExpandedWidth > window.innerWidth) {
            var difference = imageExpandedWidth - window.innerWidth;
            imageExpandedWidth -= difference;
            imageExpandedHeight -= (difference * ratio);
          }
        }

        $scope.normalImageStyle = {
          width: imageWidth + 'px',
          height: imageHeight + 'px'
        };

        $scope.expandedImageStyle = {
          width: imageExpandedWidth + 'px',
          height: imageExpandedHeight + 'px',
          position: 'absolute'
        };
      }
    }
  }
}());
