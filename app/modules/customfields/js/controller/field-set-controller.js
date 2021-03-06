'use strict';

/* Controllers */
angular.module('GO.customfields.controllers')
		.controller('FieldSetController', ['$scope', '$state', '$stateParams', 'Model', function($scope, $state, $stateParams,Model){
				$scope.fieldset = new Model(
							'customfields/fieldsets/'+$stateParams.modelName
							);

				$scope.fieldset.read($stateParams.fieldSetId);
				
				
				$scope.save = function() {
					return $scope.fieldset.save({
						modelName: $stateParams.modelName
					})
					.then(function(result) {	
						
						//$scope.back();
		
						$state.go("customfields.model.fields", {modelName: $stateParams.modelName, fieldSetId: $scope.fieldset.id});

					});
				};
				
				$scope.back = function(){
					$state.go('customfields.model', {modelName: $stateParams.modelName});
				};
				
		}]);