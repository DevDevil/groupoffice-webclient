'use strict';

// Declare app level module which depends on views, and components
angular.module('GO', [
  'ui.router',
  
  'GO.core',
  'GO.core.controllers'
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
							templateUrl: "views/login.html",
							controller: 'LoginController'
						});
						

			}])
			.run(function (Utils) {
				//FastClick.attach(document.body);

				//Special config
				//$rootScope.title = appTitle;
				
				Utils.setBaseUrl("../../groupoffice-server/html/index.php");
			});
		
		