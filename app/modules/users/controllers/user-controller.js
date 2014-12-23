'use strict';

/* Controllers */
angular.module('GO.users.controllers').
	controller('UserController', ['$scope', '$state', '$stateParams', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', function($scope, $state, $stateParams, Translate, Store, Model, Tags, CustomFields, Modules) {

		$scope.pageTitle = Translate.t('Users');

		/* For mobiles, switch list and details on state */

//		console.log($state.params);
//		console.log($stateParams);

		$scope.userStore = new Store('auth/users',{returnAttributes: "*"});

		if($stateParams.role){
			//$scope.userStore.searchQuery = $stateParams.search;

			var where = [{
				"userRole.roleId": $stateParams.role
			}];
			$scope.userStore.load({where: where});
		} else {
			$scope.userStore.load();
		}



		$scope.roleStore = new Store('auth/roles',{returnAttributes: "*"});
		$scope.roleStore.load();

		//Will be used in child scope. We define it here so we can access
		//the properties if needed in the future.
		//Child scopes automatically inherit properties of the parents but
		//not the other way around.
		$scope.user = new Model('auth/users',{returnAttributes: "*, roles, userRole"});

		/* End select options for detail and edit controller */
		$scope.save = function() {

		$scope.user.save()
				.then(function(result) {
					//success
					$scope.syncWithStore(true);
					$state.go('users.user.detail', {userId: $scope.user.id});
				});
		};

		$scope.syncWithStore = function(reloadStore) {
			var index = $scope.userStore.findIndexByAttribute('id', $scope.user.id);

			if (index > -1) {
				$scope.userStore.items[index].attributes = angular.copy($scope.user.attributes);
			} else if (reloadStore) {
				$scope.userStore.reload();
			}
		};


		Modules.getModule('users').then(function(module){
			$scope.usersModule = module;
		});
}]);
