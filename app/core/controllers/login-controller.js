'use strict';


angular.module('GO.core.controllers')

				.controller('LoginController', function($scope, $http, $state, Utils, Translate, Modules) {
			
						$scope.master = $scope.user = {
							username: '',
							password: '',
							remember: false
						};

						$scope.config = {url: Utils.baseUrl || "http://localhost/groupoffice-server/html/"};

						$scope.login = function(user) {

							//We set the base Group-Office URL given from the form.
							Utils.setBaseUrl($scope.config.url);

							var url = Utils.url('auth');

							$http.post(url, user)
											.success(function(data, status, header) {

												if (!data.success) {
													alert(Translate.t('You entered an incorrect username or password'));
//													
//													$scope.loginForm.username.$setValidity('badLogin', false);
											
												} else {
													
													//Returned when remember is enabled. We create an interceptor that adds the token.
//													if(data.authorizationToken){
//														localStorage.authorizationToken = data.authorizationToken;
//														//$http.defaults.headers.common.Authorization = 'Bearer '+data.token;
//													}
													
													//Set the security token returned by Group-Office that must be used in all requests to prevent
													//Cross site scripting attacks
//													Utils.setDefaultParams({
//														securityToken: data.securityToken
//													});

													Modules.getModules().then(function(){
														$state.go("kitchensink");
													});

													//TODO: Get modules from service
													
												}
											});
						};

						$scope.reset = function() {
							$scope.user = angular.copy($scope.master);
						};
					});