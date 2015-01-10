'use strict';

angular.module('GO', GO.appModules).//See app/core/global-functions.js for the dependencies

		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
				// For any unmatched url, redirect to /state1

				$urlRouterProvider.when('', '/dashboard');
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


			}]).
		config(function ($animateProvider) {

			//only enable ngAnimate on elements with the "animate" class
			$animateProvider.classNameFilter(/animate/);
		}).
		run(function (Utils) {
			//FastClick.attach(document.body);

			//Special config
			//$rootScope.title = appTitle;

			Utils.setBaseUrl("../../groupoffice-server/html/index.php");

			FastClick.attach(document.body);
		});

