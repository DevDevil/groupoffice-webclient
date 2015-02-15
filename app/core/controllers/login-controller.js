'use strict';


angular.module('GO.core.controllers')

		.controller('LoginController', function ($scope, $rootScope, $http, $state, Utils, Translate, Alerts) {

			$scope.master = $scope.user = {
				username: '',
				password: '',
				remember: false
			};

			$scope.config = {url: Utils.baseUrl || "http://localhost/groupoffice-server/html/"};
			
			
			
			$scope.login = function (user) {

				//We set the base Group-Office URL given from the form.
				Utils.setBaseUrl($scope.config.url);

				var url = Utils.url('auth');
				
				$http.post(url, user)
						.success(function (data, status, header) {
								
								$rootScope.loggedIn = true;
								$state.go("dashboard");
						})
						.error(function(data, status, header){
							
							//$scope.loginForm.username.$setValidity(Translate.t('You entered an incorrect username or password'), false);
					
							Alerts.addAlert(Translate.t('You entered an incorrect username or password'), 'warning');
						});
			};

			$scope.reset = function () {
				$scope.user = angular.copy($scope.master);
			};
		});