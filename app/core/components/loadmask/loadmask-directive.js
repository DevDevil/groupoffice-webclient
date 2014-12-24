'use strict';

angular.module('GO.core')

				.directive('goLoadmask', function() {
					return {
						restrict: 'E',
						scope: {
							active: '=active'
						},
						template: '<div class="go-loadmask" ng-show="active">\
							<div class="go-loadmask-screen"></div>\
							<div class="go-loadmask-msg"><i class="reload go-rotate"></i> {{"Please wait" | goT}}...</div>\
						</div>'
					};
				});


