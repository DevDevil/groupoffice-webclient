'use strict';

/**
 * @ngdoc directive
 * @name GO.core.form.goAutofocus
 * @element input
 *
 * @description
 * Put autofocus on an input. The standard autofocus attribute doesn't work on
 * firefox
 *
 * @example
     <input ng-model="text" go-autofocus="{expersion}">
	
 */

angular.module('GO.core.form')
				.directive('goAutofocus', ['$timeout',function($timeout) {
					return {
						scope: {
						    goAutofocus: '='            
						},
						link: function(scope, element) {
						
							scope.$watch('goAutofocus', function(value) {
								if(value || angular.isUndefined(value)){								
									$timeout(function() {
										element[0].focus();
									}, 500); //Delay to allow transition. Wierd stuff happens when you use transition (at least with transform: translateX and autofocus at the same time.
								}
							});

						}
					};
				}]);