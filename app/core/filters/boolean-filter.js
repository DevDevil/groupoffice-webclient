/**
 * @ngdoc filter
 * @name GO.core.filters.boolean
 *
 * @description
 * Translates a boolean into "Yes" or "No"
 *
 * @param {boolean} boolean Boolean to filter
 * @returns {string} Translated text "Yes" or "No".
 */
angular.module('GO.core.filters')
		.filter('boolean', ['Translate', function(Translate) {
			return function(boolean) {
						return boolean ? Translate.t('Yes') : Translate.t('No');
			};
		}]);
