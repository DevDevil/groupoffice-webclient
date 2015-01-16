
/**
 * @ngdoc filter
 * @name GO.core.filters.encodeURIComponent
 *
 * @description
 * Encodes an URI component
 *
 * @param {string} URI component
 * @returns {string} Encoded URI component
 */
angular.module('GO.core.filters').filter('encodeURIComponent',['$window',function($window) {  
		return $window.encodeURIComponent;
  }]);