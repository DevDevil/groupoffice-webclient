'use strict';

angular.module('GO.core')

		.directive('tab', function ($compile) {
				return {
					restrict: 'E',
//			priority: 0,
					require: "^goTabPanel",
					scope: true,
					replace: true,
					link: function (scope, element, attrs, goTabPanel) {
						var tabIndex = goTabPanel.getNextTabIndex();
								
						scope.tabSwitch = function(tabIndex){
							goTabPanel.tabSwitch(tabIndex);
						};
						
						var tpl ='<a ui-sref="'+attrs.uiSref+'" ng-click="tabSwitch('+tabIndex+')" ui-sref-active="active">{{"'+attrs.title+'"| goT}}</a>';
						var content = $compile(tpl)(scope);
						element.replaceWith(content);
						
						
					}
				};
			});