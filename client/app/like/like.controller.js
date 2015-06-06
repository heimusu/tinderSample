'use strict';

angular.module('tinderSampleApp')
  .controller('LikeCtrl', function ($scope,$http,Auth,$timeout,$location) {
    $scope.message = 'Hello';
    //初期化
    $scope.init = function(){
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
                if(idCheckFlg === 0 && $scope.isLoggedIn() && $scope.currentUserId !== undefined){
                    $location.path('/signup');
                }
                var userLikeInformation = $scope.likeImages[$scope.currentUserDbNumber].like;
                $scope.userLikeImages = [];
                for(var j = 0; j < userLikeInformation.length; j++){
                    var userLikeNum = userLikeInformation[j];
                    $scope.userLikeImages[j] = $scope.testImages[userLikeNum].url;
                }
            });
        },500);
    };
  });
