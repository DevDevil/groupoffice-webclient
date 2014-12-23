'use strict';

/**
 * @ngdoc service
 * @name GO.modules
 *
 * @description
 * Get's module from the server
 */
angular.module('GO.core')
		.service('Modules', ["Store", "$q", function(Store, $q) {

				var Modules = function() {
					this.store = new Store(
							'modules',
							 {
							limit: 0
						}
					);
	
				};
				
				Modules.prototype.getModule = function(moduleName){
					
					
					var deferred = $q.defer();
					
					var modulesPromise = this.getModules();
					
					modulesPromise.then(function(modules){
						for(var i = 0, l = modules.length;i < l; i++){

							if(modules[i].name === moduleName){
								deferred.resolve(modules[i]);
								return;
							}
						}
						
						deferred.resolve(false);
					});
					
					return  deferred.promise;
					
				};

				Modules.prototype.getModules = function(){					
					
					
					if(this.promise){
						return this.promise;
					}else
					{
						
						var deferred = $q.defer();
						this.promise = deferred.promise;
						
						var promise = this.store.load();
						
						promise.then(function(data){	
							this.modules = this.store.items;
							
							deferred.resolve(this.modules);
							
							
							
						}.bind(this),
						function(data){
							this.promise = false;
						}.bind(this));
						
						return deferred.promise;
					}
				};
				
				return new Modules;
				
			}]);
		
		
		
angular.module('GO.core')
		.provider('settings', [function SettingsProvider() {

				var pages = [];

				/**
				 * @ngdoc method
				 * @name GO.modules#addModule
				 * @methodOf GO.modules
				 * @description
				 *
				 * Add an app to the program
				 *
				 * @param {string} id The id of the module. Note that there must be a ui.router state for this id as well.
				 * @param {string} title The title of the module in English.
				 * @param {string} iconCls The class for the icon of FontAwesome. eg. "fa-user" {@link http://fortawesome.github.io/Font-Awesome/}
				 */
				this.addPage = function(config) {
					
					pages.push(config);
				};

				this.$get = [function SettingsFactory() {


						// let's assume that the UnicornLauncher constructor was also changed to
						// accept and use the useTinfoilShielding argument
						return pages;
					}];
			}]);