'use strict';

angular.module('GO.core.controllers')
		.controller('HeaderController', ['$scope', 'Modules', '$http', 'Utils', function ($scope, Modules, $http, Utils) {
				Modules.getModules().then(function (modules) {
					$scope.modules = modules;
				});

				$scope.modulesService = Modules;

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