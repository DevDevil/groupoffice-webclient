angular.module('GO.core')

		.directive('tabView', [function () {


				return {
					restrict: 'A',
					require: "^goTabPanel",
					link: function (scope, element, attrs, goTabPanel) {						
						//when tabs are switched this element is the entering view.
						var cls = goTabPanel.left ? 'left' : 'right';						
						element.addClass('go-tab-view animate '+cls);						
						
						//register this view element as the leaving view for when the user clicks on the next tab link
						goTabPanel.leavingView = element;
					}
				};
			}]);