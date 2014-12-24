'use strict';

angular.module('GO.core.controllers')
		.controller('HeaderController', ['$scope', 'Launcher', '$http', 'Utils', function ($scope, Launcher, $http, Utils) {
				
				
				Launcher.getLaunchers().then(function (launchers) {
					
					$scope.launchers = launchers;
				});

				//$scope.modulesService = Modules;

				$scope.logout = function () {
					//for "remember my login"
					delete localStorage.authorizationToken;

					var url = Utils.url('auth');

					$http.delete(url)
							.success(function (data, status, header) {
//								$state.go('login');

								//make sure page is cleared
								document.location = "";
							});
				};

			}]);