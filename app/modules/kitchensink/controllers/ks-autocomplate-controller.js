'use strict';

/* Controllers */
angular.module('GO.kitchensink.controllers').
		controller('KsAutocompleteController', ['$scope', 'Store', function ($scope, Store) {

				$scope.store = new Store('test');
				
				$scope.store.loadData([{
					name: "Cat",
					value: "cat"
				},{
					name: "Dog",
					value: "dog"
				}]);
				

			}]);


