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


    //ライブラリ呼び出し
    //$scope.stack = gajus.Swing.Stack();

    /*
    //カード生成
    $scope.cardElement = document.querySelector('.stack li');
    window.card = $scope.stack.createCard($scope.cardElement);
    */

    /*
    //カード動的生成
    [].forEach.call(document.querySelectorAll('.stack li'), function(targetElement){
    //[].forEach.call(document.querySelectorAll('.stack li'), function(targetElement){
        $scope.stack.createCard(targetElement);
        targetElement.classList.add('in-deck');
    });
    */

    $scope.likeCount = 0;
    $scope.nopeCount = 0;

    /*
    //デッキから消去
    $scope.stack.on('throwout',function(e){
        //console.log(e.target.innerText || e.target.textContent,'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left','direction.');
        //nopeの時
        if(e.throwDirection == 1){
            console.log("nope");
            $scope.nopeCount++;
            console.log($scope.nopeCount);
        }
        //likeの時
        else if(e.throwDirection != 1){
            console.log("like");
            $scope.likeCount++;
            console.log($scope.likeCount);
        }
        //カウントしてるDOMを更新
        $scope.$apply();
        e.target.classList.remove('in-deck');
        $(e.target).remove();
    });

    //デッキに追加（デッキに戻す)
    $scope.stack.on('throwin',function(e){
        console.log(e.target.innerText || e.target.textContent,'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        e.target.classList.add('in-deck');
    });
    */

    //test
    $scope.throwout = function(eventName, eventObject) {
        console.log('throwout', eventObject);
    };
    $scope.throwoutleft = function (eventName, eventObject) {
        console.log('throwoutleft', eventObject);
    };

    $scope.throwoutright = function (eventName, eventObject) {
        console.log('throwoutright', eventObject);
    };

    $scope.throwin = function (eventName, eventObject) {
        console.log('throwin', eventObject);
    };

    $scope.dragstart = function (eventName, eventObject) {
        console.log('dragstart', eventObject);
    };

    $scope.dragmove = function (eventName, eventObject) {
        console.log('dragmove', eventObject);
    };

    $scope.dragend = function (eventName, eventObject) {
        console.log('dragend', eventObject);
    };
  });
