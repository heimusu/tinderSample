'use strict';

angular.module('tinderSampleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('favorite', {
        url: '/favorite',
        templateUrl: 'app/favorite/favorite.html',
        controller: 'FavoriteCtrl'
      });
  });