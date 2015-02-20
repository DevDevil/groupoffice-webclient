'use strict';

/**
 * @ngdoc directive
 * @name GO.core.goProgress
 * @element div
 *
 * @description
 * Linear progress bar
 * 
 * <code>
 * 
 * <go-progress value="75" max="100"></go-progress>
 * 
 * </code>
 *
 * @param {int} value The value of the bar.
 * @param {int=} max = Maximum value. Defaults to 100
 * @example 
 * <go-progress max="100" value="progressVariable"></go-progress>
 */
angular.module('GO.core')
		.directive('goProgress', function () {
			return {
				restrict: 'EA',
				replace: true,
				scope:{
					max: '@',
					value: '='
				},
				link: function(scope, element, attrs){					
					var max = parseInt(scope.max);
					if(!max) {
						max = 100;
					}
					scope.getPercentage = function(){
						return Math.ceil((max / parseInt(scope.value)) * 100);
					};
					
				},
				templateUrl: 'core/components/progress/progress.html'
			};
		}); 