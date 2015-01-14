'use strict';

/* Controllers */
angular.module('GO.customfields.controllers').

				controller('CustomFieldsController', ['$scope', '$state', '$http', 'Translate', 'Utils', function($scope,$state, $http, Translate, Utils) {

						$scope.models = [];
						
						$scope.$state = $state;
						
						$http.get(Utils.url("customfields/models")).then(function(response){
							
		
							$scope.models = response.data.results;
						});

					
					}]);


