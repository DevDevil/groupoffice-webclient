/**
 * @ngdoc filter
 * @name GO.core.translate.goT
 *
 * @description
 * Translates a string into the configured language
 *
 * @param {string} text Text to translate
 * @returns {string} Translated text.
 *
 *
 * @example
 * {{"Save" | goT}}
 */

angular.module('GO.core.translate')
				.filter('goT', ['Translate',function(Translate) {
						return function(key) {
							return Translate.t(key);
						};
					}]);

