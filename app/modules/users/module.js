'use strict';

GO.module('GO.users.controllers', []);

// Declare app level module which depends on views, and components
GO.module('GO.users', ['GO.core', 'GO.users.controllers']).
		//Register the module
		config(['launcherProvider', function (launcherProvider) {
				launcherProvider.add('users', 'Users');
			}]).
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

//						$urlRouterProvider.when('/users/user/{id}', '/users/user/{id}/detail');

				// Now set up the states
				$stateProvider
						.state('users', {
//							url: "/users?role",
//							'aside': {
//								templateUrl: 'modules/users/views/aside.html',
////								controller: 'AsideController'
////								controller: 'UserController'
//							},
//							'main': {
//								templateUrl: 'modules/users/views/main.html',
//								controller: 'UserController'
//							},

							url: "/users?role",
							templateUrl: 'modules/users/views/main.html',
							controller: 'UserController'
						})

						.state('users.user', {
							url: "/user/{userId:[0-9]*}",
							templateUrl: 'modules/users/views/user.html'
						})
						.state('users.user.detail', {
							url: "/detail",
							templateUrl: 'modules/users/views/user-detail.html',
							controller: 'UserDetailController'
						})
						.state('users.user.permission', {
							url: "/permissions",
							templateUrl: 'modules/users/views/user-permission.html',
							controller: 'UserPermissionController'
						})

						.state('users.edit', {
							url: "/edit/{userId:[0-9]*}",
							templateUrl: 'modules/users/views/user-edit.html',
							controller: 'UserEditController'
						})

						.state("settings.users", {
							url: '/users',
							controller: 'UserController',
							template: '<div ui-view></div>'
						});
			}]);
