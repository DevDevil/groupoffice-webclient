'use strict';

GO.module('GO.email.controllers', []);
GO.module('GO.email.models', []);


// Declare app level module which depends on views, and components
GO.module('GO.email', ['GO.core', 'GO.email.controllers']).
		//Register the module
		config(['launcherProvider', function (launcherProvider) {

				launcherProvider.add('email', 'E-mail', ['Intermesh\Modules\Email\EmailModule']);
			}]).
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
				// Now set up the states
				$stateProvider
						.state('email', {
							url: "/email",
							templateUrl: 'modules/email/views/main.html',
							controller: 'EmailController'
						})
						.state('email.threads', {
							url: "/email/threads/{folderId:[0-9]*}",
							templateUrl: 'modules/email/views/threads.html',
							controller: 'ThreadsController'
						})
						.state('email.threads.thread', {
							url: "/thread/{threadId:[0-9,]*}",
							templateUrl: 'modules/email/views/thread.html',
							controller: 'ThreadController'
						});

			}]);