'use strict';

angular.module('GO.contacts.controllers', []);

// Declare app level module which depends on views, and components
angular.module('GO.contacts', ['GO.core', 'GO.contacts.controllers']).
		//Register the module
		config(['modulesProvider', function(modulesProvider) {
				modulesProvider.addModule('contacts', 'Contacts');
			}]).

		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
				
				// Now set up the states
				$stateProvider
						.state('contacts', {
							url: "/contacts",
							templateUrl: "modules/contacts/views/main.html"
						});
						

			}]);