'use strict';
/**
 * @ngdoc service 
 * @name GO.core.Alerts
 * 
 * @description
 * Alerts service to show an alert message
 */
angular.module('GO.core').
		service('Alerts', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
				var Alerts = function () {
				};

				$rootScope.alerts = [];

				/**
				 * @ngdoc method
				 * @name GO.core.Alerts#addAlert
				 * 
				 * @param {string} msg
				 * @param {string} type danger, success, warning, info
				 * @param {int} timeout
				 */
				Alerts.prototype.addAlert = function (msg, type, timeout) {
					
					if(!timeout){
						timeout = 4000;
					}
					
					if(!type){
						type='danger';
					}
					
					
					var index = $rootScope.alerts.length;
					
					
//					$rootScope.$apply(function(){
						$rootScope.alerts.push({msg: msg, type: type});
//					});
					
					$timeout(function(){
						$rootScope.alerts.splice(0, 1);
					}.bind(this), timeout);
				};

				
//
//				Alerts.prototype.closeAlert = function (index) {
//					
//				};


				return new Alerts;
			}]);
		