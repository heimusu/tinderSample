'use strict';

angular.module('tinderSampleApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/testImages').success(function(testImages){
        $scope.testImages = testImages;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });


    //LikeとNopeのカウンター
    $scope.likeCount = 0;
    $scope.nopeCount = 0;

    //angular-swingのカード挙動監視
    $scope.throwoutleft = function (eventName, eventObject) {
        $scope.likeCount++;
        $scope.$apply();
        $(eventObject.target).remove();
    };

    $scope.throwoutright = function (eventName, eventObject) {
        $scope.nopeCount++;
        $scope.$apply();
        $(eventObject.target).remove();
    };

  });
