'use strict';

/**
 * @ngdoc directive
 * @name GO.core.dropdown
 * @element div, span
 *
 * @description
 * Create a dropdown menu
 *
 * @example
    <div class="dropdown">
		<button class="menu"><i class="menu-dot"></i></button>
		<menu class="popup top-right">
			<li><a ng-click="store.reload()">Refresh</a></li>
			<li><a>Add Contact</a></li>
			<li><a>Export</a></li>
			<li class="divider"></li>
			<li><a>Settings</a></li>
		</menu>
	</div>
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