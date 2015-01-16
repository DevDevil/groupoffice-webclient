
/**
 * @ngdoc filter
 * @name GO.core.filters.nl2br
 *
 * @description
 * Converts plain text to HTML and also trusts the HTML.
 *
 * @param {string} Plain text
 * @returns {string} HTML
 */
angular.module('GO.core.filters')
		.filter('nl2br', ['$sce', function($sce) {
			return function(msg) {
				var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
				return $sce.trustAsHtml(msg);
			};
		}]);