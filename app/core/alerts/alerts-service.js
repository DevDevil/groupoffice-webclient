'use strict';
/**
 * @ngdoc service
 * @name GO.core.Alerts
 *
 * @description
 * Common utilities
 */
angular.module('GO.core').
		service('Alerts', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
				var Alerts = function () {


				};

				$rootScope.alerts = [];

				/**
				 * 
				 * @param {type} msg
				 * @param {type} type danger, success, warning, info
				 * @param {type} timeout
				 * @returns {undefined}
				 */
				Alerts.prototype.addAlert = function (msg, type, timeout) {
					
					if(!timeout){
						timeout = 2000;
					}
					
					if(!type){
						type='danger';
					}
					
					
					var index = $rootScope.alerts.length;
					
					
//					$rootScope.$apply(function(){
						$rootScope.alerts.push({msg: msg, type: type});
//					});
					
					$timeout(function(){
						$rootScope.alerts.splice($rootScope.alerts.length-1, 1);
					}.bind(this), timeout);
				};

				

				Alerts.prototype.closeAlert = function (index) {
					
				};


				return new Alerts;
			}]);
		