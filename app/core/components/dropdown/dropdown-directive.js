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
				.directive('dropdown', [function() {
					return {
						restrict: 'C',
						link: function(scope, element) {
							//console.log('t');
							//var btn = element.find('button')[0];
							
							var children = element.children();
							var btn;
							
							angular.forEach(children, function(c){
		
								if(c.tagName == 'A' || c.tagName == 'BUTTON') {
									btn = c;									
								}
							});
							
							if(btn) {
							//mac os x doesn't put focus
								angular.element(btn).on('click', function(e){						
									btn.focus();
								});
							}

						}
					};
				}]);