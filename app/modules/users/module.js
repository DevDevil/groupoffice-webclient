'use strict';

GO.module('GO.users.controllers', []);

// Declare app level module which depends on views, and components
GO.module('GO.users', ['GO.core', 'GO.users.controllers']).
		//Register the module
		config(['launcherProvider', function (launcherProvider) {
				launcherProvider.add('users.list', 'Users', ['Intermesh\\Modules\\Auth\\AuthModule']);
			}]).
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

//						$urlRouterProvider.when('/users/user/{id}', '/users/user/{id}/detail');

				// Now set up the states
				$stateProvider
						.state('users', {
							templateUrl: 'modules/users/views/main.html',
							controller: 'UserController'
						})
						.state('users.list',{
							controller: 'UserListController',
							url: "/users?role",
							templateUrl: 'modules/users/views/list.html'
						})

						.state('users.list.user', {
							url: "/user/{userId:[0-9]*}",
							templateUrl: 'modules/users/views/user.html'
						})
						.state('users.list.user.detail', {
							url: "/detail",
							templateUrl: 'modules/users/views/user-detail.html',
							controller: 'UserDetailController'
						})
						.state('users.list.user.permission', {
							url: "/permissions",
							templateUrl: 'modules/users/views/user-permission.html',
							controller: 'UserPermissionController'
						})

						.state('users.list.edit', {
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
