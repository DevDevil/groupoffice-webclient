'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.dashboard', []).
		//Register the module
		config(['launcherProvider', function (launcherProvider) {
								
				launcherProvider.add('dashboard', 'Dashboard', []);
			}]).
		config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('dashboard', {
							url: "/dashboard",
							templateUrl: 'modules/dashboard/views/main.html'
						});
			}]);