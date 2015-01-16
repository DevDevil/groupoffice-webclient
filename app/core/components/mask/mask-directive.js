'use strict';

/**
 * @ngdoc directive
 * @name GO.core.goMask
 * @element ANY
 *
 * @description
 * Show a mask to make an element disabled.
 *
 * @param {expression} active Expression to make it show or not
 * @example 
 * <go-mask active="showMask"></go-mask> 
 */


angular.module('GO.core')

				.directive('goMask', function() {
					return {
						restrict: 'E',
						transclude: true,
						scope: {
							active: '=active'
						},
						template: '<div class="go-mask" ng-show="active">\
							<div class="go-mask-screen"></div>\
							<div class="go-mask-msg" ng-transclude></div>\
						</div>'
					};
				});


