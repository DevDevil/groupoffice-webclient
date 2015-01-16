'use strict';

/**
 * @ngdoc directive
 * @name GO.core.goTabPanel
 * @description
 * Create a tab panel. Tabs are views for ui.router so they are loaded when you go to the route.
 * 
 * @example
 * <go-tab-panel>		
 * 		<tab ui-sref="contacts.contact.detail({contactId: contact.id})" title="Info"></tab>
 *	 	<tab ui-sref="contacts.contact.files({contactId: contact.id})" title="Files"></tab>
 *		<tab ui-sref="contacts.contact.timeline({contactId: contact.id})" title="Timeline"></tab>
 * </go-tab-panel>
 */
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