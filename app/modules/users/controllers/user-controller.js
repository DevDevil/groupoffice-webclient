'use strict';

/* Controllers */
angular.module('GO.users.controllers').
	controller('UserController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules) {

		$scope.pageTitle = Translate.t('Users');

		/* For mobiles, switch list and details on state */

		$scope.store = new Store('users',{returnAttributes: "*"});
		$scope.store.load();

		//Will be used in child scope. We define it here so we can access
		//the properties if needed in the future.
		//Child scopes automatically inherit properties of the parents but
		//not the other way around.
		$scope.user = new Model('users',{returnAttributes: "*"});

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
			var index = $scope.store.findIndexByAttribute('id', $scope.user.id);

			if (index > -1) {
				$scope.store.items[index].attributes = angular.copy($scope.user.attributes);
			} else if (reloadStore) {
				$scope.store.reload();
			}
		};


		Modules.getModule('users').then(function(module){
			$scope.usersModule = module;
		});
}]);
