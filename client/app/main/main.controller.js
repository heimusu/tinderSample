'use strict';

angular.module('tinderSampleApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
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

    //ライブラリ呼び出し
    $scope.stack = gajus.Swing.Stack();
    /*カード生成
    $scope.cardElement = document.querySelector('.stack li');
    window.card = $scope.stack.createCard($scope.cardElement);
    */
    //カード動的生成
    [].forEach.call(document.querySelectorAll('.stack li'), function(targetElement){
        $scope.stack.createCard(targetElement);
        targetElement.classList.add('in-deck');
    });

    $scope.deleteList = true;
    //デッキから消去
    $scope.stack.on('throwout',function(e){
        console.log(e.target.innerText || e.target.textContent,'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left','direction.');
        e.target.classList.remove('in-deck');
        //$scope.deleteList = false;
        $(e.target).remove();
    });

    //デッキに追加（デッキに戻す)
    $scope.stack.on('throwin',function(e){
        console.log(e.target.innerText || e.target.textContent,'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        e.target.classList.add('in-deck');
    });
  });
