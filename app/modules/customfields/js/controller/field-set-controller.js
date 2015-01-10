'use strict';

/* Controllers */
angular.module('GO.customfields.controllers')
		.controller('FieldSetController', ['$scope', '$state', '$stateParams', 'Model', function($scope, $state, $stateParams,Model){
				$scope.fieldset = new Model(
							'CustomFields/fieldsets'
							);

				$scope.fieldset.read($stateParams.fieldSetId);
				
				
				$scope.save = function() {
					$scope.fieldset.save({
						modelName: $stateParams.modelName
					})
					.then(function(result) {	

						$scope.back();

					});
				};
				
				$scope.back = function(){
					$state.go('customfields.model', {modelName: $stateParams.modelName});
				};
				
		}]);