'use strict';

/* Controllers */
angular.module('GO.kitchensink.controllers').
		controller('KsAlertsController', ['$scope', 'Alerts', function ($scope, Alerts) {

				
				
				$scope.addAlert = Alerts.addAlert;

			}]);


