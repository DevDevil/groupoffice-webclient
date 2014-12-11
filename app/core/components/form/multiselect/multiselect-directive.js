'use strict';

angular.module('GO.core')

		.directive('goMultiselect', ['$compile', '$http', 'Utils',function($compile, $http, Utils) {

	

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

						
						if(!isSelected($item)){
							scope.multiselectValues.push($item);						
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
									scope.multiselectValues[scope.multiselectValues.length-1].markDeleted = true;
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