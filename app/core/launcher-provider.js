angular.module('GO.core')

		.service('Launcher', function (launcher, Modules, $q) {
			var Launcher = function () {

			};

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
		.provider('launcher', [function LauncherProvider() {

				var launchers = [];

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
				 */
				this.add = function (state, title, serverModuleDependencies) {
					var launcher = {state: state, title: title, serverModuleDependencies: serverModuleDependencies};

					launchers.push(launcher);
				};

				this.$get = ["Modules", "$q", function (Modules, $q) {

						return launchers;
					}];
			}]);