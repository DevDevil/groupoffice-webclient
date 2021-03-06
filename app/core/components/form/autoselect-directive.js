'use strict';

/**
 * @ngdoc directive
 * @name GO.core.form.goAutoselect
 * @element input
 *
 * @description
 * Put autofocus on an input. The standard autofocus attribute doesn't work on
 * firefox
 *
 * @example
      <input ng-Model="text" go-autoselect="{expression}" />
	
 */

angular.module('GO.core.form')
				.directive('autoselect', ['$timeout',function($timeout) {
					return {
						scope: {
							trigger: '@focus',			
						    autoselect: '='            
						},
						link: function(scope, element) {							
							
							if(scope.autofocus!==false){							
								scope.$watch('trigger', function(value) {
										$timeout(function() {
											element[0].select();
										});
								});
							}
						}
					};
				}]);