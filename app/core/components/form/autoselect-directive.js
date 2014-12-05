'use strict';

/**
 * @ngdoc directive
 * @name GO.autofocus
 * @element input
 * @function
 *
 * @description
 * Put autofocus on an input. The standard autofocus attribute doesn't work on
 * firefox
 *
 * @example
    <example module="GO">
     <file name="index.html">
      <input ng-Model="text" autofocus>
		 </file>
		</example>
 */

angular.module('GO.core')
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