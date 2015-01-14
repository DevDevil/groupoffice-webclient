'use strict';

/* Controllers */
angular.module('GO.customfields.controllers').
		controller('FieldsController', ['$scope', '$stateParams', 'Store', 'Model', function ($scope, $stateParams, Store, Model) {


				$scope.fieldSetId = $stateParams.fieldSetId;

				$scope.fieldStore = new Store(
						'customfields/fieldsets/' + encodeURI($stateParams.modelName) + '/'+$stateParams.fieldSetId+'/fields',
						{
							limit: 0
						}
				);

				$scope.fieldStore.reset();
				$scope.fieldStore.load();
//
//
//				$scope.dragControlListeners = {
//					orderChanged: function(event) {						
//						
//						var draggedModel = $scope.fieldStore.items[event.dest.index];
//						
//						var droppedModel = $scope.fieldStore.items[event.dest.index + 1];
//						
//						draggedModel.sortOrder = droppedModel.sortOrder;
//						draggedModel.resort = true;
//						draggedModel.save();
//						
//
//					}
//				};

			}]);
