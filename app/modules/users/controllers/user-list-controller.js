'use strict';

/* Controllers */
GO.module('GO.users.controllers').
		controller('UserListController', ['$scope', '$state', '$stateParams', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields', 'Modules', function ($scope, $state, $stateParams, Translate, Store, Model, Tags, CustomFields, Modules) {



				$scope.userStore = new Store('auth/users', {returnAttributes: "*"});

				if ($stateParams.role) {
					//$scope.userStore.searchQuery = $stateParams.search;

					var where = [{
							"userRole.roleId": $stateParams.role
						}];

					//console.log(where);
					$scope.userStore.load({where: where});
				} else {
					$scope.userStore.load();
				}
			}]);