'use strict';
/**
 * Common utilities
 */
angular.module('GO.core').
				service('Utils', [function() {

						var Utils = function() {
							this.baseUrl = localStorage.baseUrl || "../../groupoffice-server/html/index.php/";

							//Use sessionStorage from browser so it survives browser reloads
							this.defaultParams = angular.fromJson(sessionStorage.defaultParams);
						};


						Utils.prototype.setBaseUrl = function(url) {

							//Use localStorage to remember it for the user
							this.baseUrl = localStorage.baseUrl = url.replace(/^\s+|[\s\/]+$/g, '') + '/';
						};


						Utils.prototype.setDefaultParams = function(defaultParams) {
							this.defaultParams=defaultParams;

							sessionStorage.defaultParams=angular.toJson(defaultParams);
						};

						/**
							* Create a URL to the API server
							*
							* @param {string} route The controller route. Eg. intermesh/auth/auth/login
							* @param {object=} Key value pair with GET parameters. If the value is not a string it will be converted to JSON.
							* @returns {string} URL The Full url
							*/
						Utils.prototype.url = function(route, params) {
							if (!route && !params)
								return this.baseUrl;
							
							var url = this.baseUrl+route;

							params = params || {};

							angular.extend(params, this.defaultParams);
							
							var amp = false;

							if (params) {
								for (var name in params) {
									if(typeof params[name] !== 'string') {								
										params[name]=angular.toJson(params[name]);							
									}
									
									if(amp){
										url += '&';
									}else{
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