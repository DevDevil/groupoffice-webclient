'use strict';

/* Controllers */
angular.module('GO.kitchensink.controllers').
		controller('KsListController', ['$scope', 'Store', function ($scope, Store) {

				$scope.store = new Store(
						'contacts',
						{
							returnAttributes: "id,name"
						});
						
				$scope.store.load();

			}]);


