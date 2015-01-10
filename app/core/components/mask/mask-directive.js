'use strict';

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


