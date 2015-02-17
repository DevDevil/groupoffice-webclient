'use strict';
/**
 * @ngdoc service
 * @name GO.core.Utils
 * @description
 * Common utilities
 */
angular.module('GO.core').
		service('Utils', [function () {

				var Utils = function () {
					this.baseUrl = localStorage.baseUrl || "../../groupoffice-server/html/index.php/";

					//Use sessionStorage from browser so it survives browser reloads
					this.defaultParams = angular.fromJson(sessionStorage.defaultParams);
				};
				
				
						//use own getcookie function as $cookies seems to suffer from a small delay tat we realy don't need here.
				//I had to use $timeout(getcookie, 100) here.
				Utils.prototype.getCookie = function (cname) {
					var name = cname + "=";
					var ca = document.cookie.split(';');
					for(var i=0; i<ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0)==' ') c = c.substring(1);
						if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
					}
					return null;
				};
				
				Utils.prototype.getXSRFToken = function() {
					return this.getCookie('XSRFToken');
				};
				
//				Utils.prototype.setAccessToken = function(accessToken, remember) {
//					
//					if(accessToken) {
//						$http.defaults.headers.common.Authorization = 'Bearer '+accessToken;		
//					}else
//					{
//						delete $http.defaults.headers.common.Authorization;
//					}
//					
//					$rootScope.oauth2AccessToken = sessionStorage.accessToken = accessToken;
//
//					if(remember) {
//						localStorage.accessToken = data.access_token;
//					}else
//					{
//						delete localStorage.accessToken;
//					}
//				};
//				
//				Utils.prototype.getAccessToken = function(){					
//					
//					if(sessionStorage.accessToken) {
//						return sessionStorage.accessToken;
//					}
//					
//					if(localStorage.accessToken) {
//						return localStorage.accessToken;
//					}
//					
//					return null;
//				};

				/**
				 * @ngdoc method
				 * @name GO.core.Utils#setBaseUrl
				 * @description
				 * 
				 * Set the base URL for the url function
				 * 
				 * @param {string} url				 
				 */
				Utils.prototype.setBaseUrl = function (url) {

					//Use localStorage to remember it for the user
					this.baseUrl = localStorage.baseUrl = url.replace(/^\s+|[\s\/]+$/g, '') + '/';
				};

				/**
				 * @ngdoc method
				 * @name GO.core.Utils#setDefaultParams
				 * @description
				 * 
				 * Set's default parameters for all URL's generated with the Utils.url funciton
				 * 
				 * @param {object} defaultParams				 
				 */
				Utils.prototype.setDefaultParams = function (defaultParams) {
					this.defaultParams = defaultParams;

					sessionStorage.defaultParams = angular.toJson(defaultParams);
				};

				/**
				 * @ngdoc method
				 * @name GO.core.Utils#url
				 * @description
				 * Create a URL to the API server
				 *
				 * @param {string} route The controller route. Eg. intermesh/auth/auth/login
				 * @param {object=} Key value pair with GET parameters. If the value is not a string it will be converted to JSON.
				 * @returns {string} URL The Full url
				 */
				Utils.prototype.url = function (route, params) {
					
					if (!route && !params)
						return this.baseUrl;

					var url = this.baseUrl + route;

					params = params || {};

					angular.extend(params, this.defaultParams);

					var amp = false;

					if (params) {
						for (var name in params) {
							if (typeof params[name] !== 'string') {
								params[name] = angular.toJson(params[name]);
							}

							if (amp) {
								url += '&';
							} else {
								url += '?';
								amp = true;
							}

							url += name + "=" + encodeURIComponent(params[name]);
						}
					}
					return url;
				};

				return new Utils;
			}]);