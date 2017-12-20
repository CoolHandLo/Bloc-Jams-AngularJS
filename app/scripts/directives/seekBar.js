(function() {
  function seekBar($document) {

    // @function calculatePercent
    // @desc
    // @param
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        // @desc
        // @type
        var seekBar = $(element);

        // @desc
        // @type
        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });

        // @desc
        // @type
        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });

        // @function percentString
        // @desc
        // @param
        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        // @function notifyOnChange
        // @desc
        // @param
        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({value: newValue});
          }
        };

        // @function fillStyle
        // @desc
        // @param
        scope.fillStyle = function() {
          return {width: percentString()};
        };

        // @function onClickSeekBar
        // @desc
        // @param
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        // @function trackThumb
        // @desc
        // @param
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        // @function thumbStyle
        // @desc
        // @param
        scope.thumbStyle = function() {
          return {left: percentString()};
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
