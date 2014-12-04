'use strict';

// Declare app level module which depends on views, and components
angular.module('GO', [
  'ngMaterial',
  'ui.router'
]).
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
				// For any unmatched url, redirect to /state1
				$urlRouterProvider.otherwise("/404");

				// Now set up the states
				$stateProvider
						.state('404', {
							url: "/404",
							templateUrl: "views/404.html"
						})
						.state('login', {
							url: "/login",
							templateUrl: "views/login.html"
//							controller: 'LoginController'
						});
						

			}]);