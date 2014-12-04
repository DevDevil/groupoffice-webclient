'use strict';

// Declare app level module which depends on views, and components
angular.module('GO').
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
				
				// Now set up the states
				$stateProvider
						.state('kitchensink', {
							url: "/kitchensink",
							templateUrl: "modules/kitchensink/views/main.html"
						});
						

			}]);