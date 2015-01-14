'use strict';

/* Controllers */
angular.module('GO.customfields.controllers').
		controller('ModelController', ['$scope', '$stateParams', 'Store', 'Model', '$state', function($scope, $stateParams, Store, Model, $state) {

				$scope.modelName = $stateParams.modelName;

//				$scope.$state = $state;	

				$scope.modelName = $stateParams.modelName;

				$scope.fieldSetStore = new Store(
						'customfields/fieldsets/'+encodeURI($stateParams.modelName),
						{
							limit: 0
						}
				);

				$scope.fieldSetStore.load();

				$scope.dragControlListeners = {
					orderChanged: function(event) {						
						var draggedModel = $scope.fieldStore.items[event.dest.index];
						
						var droppedModel = $scope.fieldStore.items[event.dest.index + 1];
						
						draggedModel.sortOrder = droppedModel.sortOrder;
						draggedModel.resort = true;
						draggedModel.save();
					}
				};
				
				
				
		
		
				
				$scope.onDelete = function(result){					
					$state.go("customfields.model", $stateParams);
						
				};

			}]);


