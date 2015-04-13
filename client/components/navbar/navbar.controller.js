'use strict';

angular.module('tinderSampleApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
        //ゆくゆくはアイコンにしたい
        {
            'title': 'Home',
            'link': '/'
        },
        {
            'title': 'Like',
            'link': '/like'
        },
        {
            'title': 'Favorite',
            'link':'/favorite'
        },
        {
            'title': 'Search',
            'link': '/search'
        }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
