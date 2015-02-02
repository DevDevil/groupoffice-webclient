'use strict';

GO.module('GO.kitchensink.controllers', []);

// Declare app level module which depends on views, and components
GO.module('GO.kitchensink', ['GO.core', 'GO.kitchensink.controllers']).
		//Register the module
		config(['launcherProvider', function(launcherProvider) {
				launcherProvider.add('kitchensink', 'Kitchen sink');
			}]).

		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
				
				// Now set up the states
				$stateProvider
						.state('kitchensink', {
							url: "/kitchensink",
							templateUrl: "modules/kitchensink/views/main.html"
						})
						.state('kitchensink.form', {
							url: "/kitchensink/form",
							templateUrl: "modules/kitchensink/views/form.html"
						}).state('kitchensink.list', {
							url: "/kitchensink/list",
							controller: "KsListController",
							templateUrl: "modules/kitchensink/views/list.html"
						}).state('kitchensink.alerts', {
							url: "/kitchensink/alerts",
							controller: "KsAlertsController",
							templateUrl: "modules/kitchensink/views/alerts.html"
						});
						

			}]);