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
				},{
					name: "Horse",
					value: "horse"
				},{
					name: "A very long result indeed. This is crazy long.",
					value: "cow"
				}]);
			
			
			$scope.formModel = {
				autocomplete: null,
				date: new Date(),
				multiselect: [{name: "Cat"}]
			};
			
			$scope.getMultiselectModels = function(input){ 
				return [];// $scope.store.items;
			};
				

			}]);


