/**
 * 
 * @ngdoc service
 * @name GO
 * @description
 * Global singleton object with some common used funcions
 * 
 * This singleton is also added to the $rootScope. So $rootScope.GO.isEmpty will work.
 */



GOUtils = function () {
	this.appModules = [
		'ngAnimate',
		'ui.router',
		'monospaced.elastic',
		'flow', // https://github.com/flowjs/ng-flow

		'GO.core',
		'GO.core.controllers'
	];
};

/**
 * @ngdoc method
 * @methodOf GO
 * @name GO.isEmpty
 * @description
 * Check if a variable is false, null, undefined, 0, empty string or empty array
 * 
 * @param {mixed} v
 * @returns {Boolean}
 */

GOUtils.prototype.isEmpty = function (v) {
	return v === "" ||
			v === 0 ||
			v === null ||
			angular.isUndefined(v) ||
			angular.isArray(v) && v.length === 0;
};

/**
 * @ngdoc method
 * @methodOf GO
 * @name GO.module
 * @description
 * Register a new angular module. See angular.module and also put it into the 
 * main app dependencies.
 * 
 * @param {!string} name The name of the module to create or retrieve.
 * @param {!Array=} requires If specified then new module is being created. If
 * unspecified then the module is being retrieved for further configuration.
 * @param {Function=} configFn Optional configuration function for the module. Same as
 * {@link angular.Module#config Module#config()}.
 * @returns {module} new module with the {@link angular.Module} api.
 */
GOUtils.prototype.module = function (name, moduleDependencies, configFn) {

	if (typeof (moduleDependencies) !== 'undefined') {
		this.appModules.push(name);
	}

	return angular.module(name, moduleDependencies, configFn);

};


var GO = new GOUtils();


	