'use strict';
/**
 * When the application loads this controller checks if the user is logged in.
 * If the user is logged in it will redirect to the dashboard state. If not then
 * it redirects to the login state.
 */
angular.module('GO.core.controllers')
		.controller('BodyController', ['$scope', '$rootScope', 'Launcher', '$http', 'Utils', '$state', function ($scope, $rootScope, Launcher, $http, Utils, $state) {
				
				$rootScope.showMask = true;
				
				$http.get(Utils.url('auth')).success(function(data, status, header){
					$rootScope.loggedIn = data.success;
					
					$rootScope.showMask = false;
					
					if(!$rootScope.loggedIn && !$state.is('login')){
						$state.go('login');
					}
				});
				
				
				$rootScope.loggedIn = false;
				
				$rootScope.$watch('loggedIn', function(newValue, oldValue) {
					if(newValue){
						Launcher.getLaunchers().then(function (launchers) {					
							$scope.launchers = launchers;
						});
					}
				});

				//$scope.modulesService = Modules;

				$scope.logout = function () {
				
					var url = Utils.url('auth');
					
					$http.delete(url)
							.success(function (data, status, header) {
//								$state.go('login');
					
								//make sure page is cleared
								document.location = "";
							});
				};

			}]);