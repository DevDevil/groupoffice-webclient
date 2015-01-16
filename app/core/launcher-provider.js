angular.module('GO.core')

		/**
		 * @ngdoc service
		 * @name GO.core.Launcher
		 * @description
		 * Service to get launchers
		 */

		.service('Launcher', function (launcher, Modules, $q) {
			var Launcher = function () {};


			/**
			 * @ngdoc method
			 * @name GO.core.Launcher#getLaunchers
			 * @desciption Get's all launchers and checks if the required server API modules are available
			 * @todo check server modules
			 * @returns {Promise}
			 */
			Launcher.prototype.getLaunchers = function () {

				if (this.promise) {
					return this.promise;
				} else
				{

					var deferred = $q.defer();
					this.promise = deferred.promise;

					var promise = Modules.getModules();

					promise.then(function (data) {

						
						//TODO check server modules
						deferred.resolve(launcher);



					}.bind(this),
							function (data) {
								this.promise = false;
							}.bind(this));

					return deferred.promise;
				}
			};

			return new Launcher();
		})
		
		/**
		 * @ngdoc service
		 * @name GO.core.LauncherProvider
		 * @description
		 * Provider to add launcher links to GroupOffice
		 * 
		 * @example
		 * GO.module('GO.kitchensink.controllers', []);
		 * 
		 * // Declare app level module which depends on views, and components
		 * GO.module('GO.kitchensink', ['GO.core', 'GO.kitchensink.controllers']).
		 * 
		 * //Register the module
		 * config(['launcherProvider', function(launcherProvider) {
		 * 		launcherProvider.add('kitchensink', 'Kitchen sink');
		 * 	}]);
		 */
		
		.provider('launcher', [function LauncherProvider() {

				var launchers = [];

				/**
				 * @ngdoc method
				 * @name GO.core.LauncherProvider#add
				 * @methodOf GO.core.LauncherProvider
				 * @description
				 *
				 * Add a launcher
				 *
				 * @param {string} state UI Router State that this launcher should go to
				 * @param {string} title The title of the launcher in English
				 * @param {array} Module dependencies. Eg. ['GO\Modules\Contacts\ContactsModule']
				 */
				this.add = function (state, title, serverModuleDependencies) {
					var launcher = {state: state, title: title, serverModuleDependencies: serverModuleDependencies};

					launchers.push(launcher);
				};

				this.$get = ["Modules", "$q", function (Modules, $q) {

						return launchers;
					}];
			}]);