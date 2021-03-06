

/**
 * @ngdoc filter
 * @name GO.core.filters.bytes
 *
 * @description
 * Outputs a number of bytes user friendly. Like 1MB.
 *
 * @param {int} bytes Number of butes
 * @returns {string} Human readble output like 1MB
 */
angular.module('GO.core.filters').filter('bytes', function() {
	return function(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
			return '-';
		if (typeof precision === 'undefined')
			precision = 1;
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
						number = Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
	};
});