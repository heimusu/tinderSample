'use strict';

angular.module('tinderSampleApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $location, $timeout) {
    //ログイン時の初期化処理
    $scope.init = function(){
        //非同期処理
        $timeout(function(){
            //ログイン情報取得
            $scope.isLoggedIn = Auth.isLoggedIn;
            $scope.getCurrentUser = Auth.getCurrentUser;
            $scope.currentUserId = $scope.getCurrentUser().email;
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
                var idCheckFlg = 0;
                for(var i = 0; i < $scope.likeImages.length; i++){
                    if($scope.likeImages[i].email === $scope.currentUserId){
                        idCheckFlg = 1;
                        $scope.currentUserDbId = $scope.likeImages[i]._id;
                        $scope.currentUserDbNumber = i;
                    }
                }
                if(idCheckFlg === 0 && $scope.isLoggedIn() && $scope.currentUserId != undefined){
                    console.log('add');
                    $http.post('/api/likeImages',{email: $scope.currentUserId, like:[]});
                }
                socket.syncUpdates('likeImages',$scope.likeImages);
            });
        },500);
    };

    //LikeとNopeのカウンター
    $scope.likeCount = 0;
    $scope.nopeCount = 0;

    //angular-swingのカード挙動監視
    $scope.throwoutleft = function (eventName, eventObject, cardData) {
        $scope.likeCount++;
        $scope.currentUserLikeImages = $scope.likeImages[$scope.currentUserDbNumber].like;
        var userLikeImageLength = $scope.currentUserLikeImages.length;
        $scope.currentUserLikeImages[userLikeImageLength] = cardData.id;
        var userData = {email:$scope.currentUserId,like:$scope.currentUserLikeImages};
        $timeout(function(){
            $http.put('/api/likeImages/' + $scope.currentUserDbId,userData);
            socket.syncUpdates('likeImage',$scope.likeImages);
        },1000);
        $scope.$apply();
        $(eventObject.target).remove();
    };

    $scope.throwoutright = function (eventName, eventObject, cardData) {
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
