'use strict';

angular.module('GO.core')

		.directive('goTabPanel', [function () {


				return {
					restrict: ['E','A'],
					transclude: true,					
					templateUrl: 'core/components/tab-panel/tab-panel.html',
					controller: function () {
						
						this.left = true;
						this.tabIndex = 0;

						this.tabSwitch = function (tabIndex) {
							
							
							
							this.left = this.tabIndex < tabIndex;
							this.tabIndex = tabIndex;
							
							
							if(this.left){
								this.leavingView.addClass('left');
								this.leavingView.removeClass('right');
							}else
							{
								this.leavingView.removeClass('left');
								this.leavingView.addClass('right');
							}
				
						};
						
						var tabIndex = 0;
						
						this.getNextTabIndex = function(){
							return tabIndex++;
						};

					}
				};
			}]);