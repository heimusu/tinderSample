'use strict';

angular.module('tinderSampleApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $location) {
    //ログイン情報取得
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentUserId = $scope.getCurrentUser()._id;
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    //各種DB接続
    $http.get('/api/testImages').success(function(testImages){
        $scope.testImages = testImages;
    });

    $http.get('/api/likeImages').success(function(likeImages){
        $scope.likeImages = likeImages;
        console.log($scope.likeImages);
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


    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
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

});
