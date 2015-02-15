angular.module('GO').config(function ($httpProvider, $provide) {

			//to allow cookies in CORS XmlHttpRequests
			$httpProvider.defaults.withCredentials = true;
			$httpProvider.defaults.useXDomain = true;


			$provide.factory('myHttpInterceptor', ['$injector', '$q', '$log', '$cookies', '$timeout',   function ($injector, $q, $log, $cookies, $timeout) {
					
				
				//use own getcookie function as $cookies seems to suffer from a small delay tat we realy don't need here.
			//I had to use $timeout(getcookie, 100) here.
			var getCookie = function (cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i=0; i<ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1);
					if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
				}
				return null;
			};

				
					return {
						
					
						response: function (response) {
							
							var XSRFToken = getCookie("XSRFToken");
							
							if(XSRFToken) {
								$httpProvider.defaults.headers.common['X-XSRFToken'] = XSRFToken;
							}
							
//							var contentType = response.headers('Content-Type');
//
//							if (contentType && contentType.indexOf('application/json') > -1) {
//								if (response.data.success === false && response.data.exception) {
//									$injector.get('Alerts').addAlert("<h1>Error: " + response.data.exception.className+"</h1><p>"+response.data.exception.message+"</p>", "danger");
//									
//									$log.error("ERROR: "+response.config.method+": "+response.config.url);
//									$log.error(response.data);
//								}
//								
//								if(response.data.debug){
//
//									$log.info("DEBUG: "+response.config.method+": "+response.config.url);
//
//									for(var key in response.data.debug){
//
//										if(console && console.groupCollapsed){
//											console.groupCollapsed(key);
//										}
//		//										$log.debug(response.data.debug[key]);
//										for(var k2 in response.data.debug[key]){
//											$log.debug(response.data.debug[key][k2]);
//										}
//
//										if(console && console.groupEnd){
//											console.groupEnd();
//										}
//		//										$log.debug(response.data.debug[key]);
//									}
//						}
//							}

							return response;
						},
						responseError: function (response) {
							var status = response.status;

							if (status === 403) {
								$injector.get('$state').go('login');
							} else
							{
								$injector.get('Alerts').addAlert('Oops, a server error occurred', 'Error ' + status);

								var contentType = response.headers('Content-Type');

								if (contentType && contentType.indexOf('application/json') > -1) {

									if (response.data.debug) {

										$log.info("DEBUG: " + response.config.method + ": " + response.config.url);

										for (var key in response.data.debug) {

											if (console && console.groupCollapsed) {
												console.groupCollapsed(key);
											}
//										$log.debug(response.data.debug[key]);
											for (var k2 in response.data.debug[key]) {
												$log.debug(response.data.debug[key][k2]);
											}

											if (console && console.groupEnd) {
												console.groupEnd();
											}
//										$log.debug(response.data.debug[key]);
										}
									}
								}
							}
							// otherwise
							return $q.reject(response);
						}
					};
				}]);

			$httpProvider.interceptors.push('myHttpInterceptor');
		});