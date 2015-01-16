'use strict';

/**
 * @ngdoc directive
 * @name GO.core.form.goMultiselect
 * @element input
 * 
 * @description
 * An input field with where you can enter multiple model values. For example a tag or e-mail composer to field.
 * 
 * @param {string} onMultiselect Function that's called with the user input that must respind with models.
 * @param {string} ngModel Assignable angular expression to data-bind to.
 * @param {string} displayAttribute The attribute of the model to display.
 * @param {expression} ngRequired
 * @param {string} placeholder
 * 
 * @example
 * 
 * <div class="row">
 *  <label for="multiselect">
 *	 Multiselect
 *	</label>
 *	<input id="multiselect" name="multiselect" display-attribute="name" ng-model="formModel.multiselect" go-multiselect="getMultiselectModels(input)" auto-create="true" placeholder="Enter animals..." />
 * </div>
 */
angular.module('GO.core.form')

		.directive('goMultiselect', [function() {
			return {
				restrict: 'A',
				require: 'ngModel',
				replace: true,
				scope: {
					goMultiselect: '&',
					displayAttribute: '@',
					multiselectValues: '=ngModel',
					ngRequired: '=',
					placeholder: '@'
				},
				link: function(scope, element, attrs, modelCtrl) {
					
					scope.inputId = 'go-multiselect-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
					scope.input = "";
					scope.loading=false;
					
					scope.focusInput = function(){
						document.getElementById(scope.inputId).focus();
					};
					
					scope.addModel = function($item) {

						var selectedItem = isSelected($item);

						if(!selectedItem){
							scope.multiselectValues.push($item);
						}else
						{
							selectedItem.markDeleted = false;
						}				
						
						scope.input="";
					};
					
					var isSelected = function(item){
						for(var i = 0, l = scope.multiselectValues.length; i < l; i++){
							if(scope.multiselectValues[i][scope.displayAttribute] === item[scope.displayAttribute]){
								return scope.multiselectValues[i];
							}
						}
						
						return false;
						
					};
					
					scope.keypress = function ($event){
						
						
						switch($event.keyCode){
							case 13:
								addNewModel($event);
								break;
								
							case 8:
								if(scope.input === ""){
									//remove last entry without markDeleted=true
									var lastIndex = -1;
									for(var i=scope.multiselectValues.length-1;i>=0;i--){					
										if(!scope.multiselectValues[i].markDeleted){
											
											lastIndex = i;
											
											break;
										}
									}
									if(lastIndex>-1){
										scope.multiselectValues[lastIndex].markDeleted = true;
									}
								}
								break;
						}
					};

					var addNewModel = function($event) {
						
						$event.preventDefault();
						
						if(attrs.autoCreate === "true"){
							var value = scope.input.trim();
							if(value !== ""){							
								var newItem = {};
								newItem[scope.displayAttribute] = value;								
								var selectedItem = isSelected(newItem);
								
							
								if(!selectedItem){
									
									
									scope.multiselectValues.push(newItem);
								}else
								{
									selectedItem.markDeleted = false;
								}
							}
						}

						scope.input = "";
					};

				},
				templateUrl: 'core/components/form/multiselect/multiselect.html'
			};
		}]);