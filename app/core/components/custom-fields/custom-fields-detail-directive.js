'use strict';

angular.module('GO.core.customFields')		
		.directive('goCustomFieldsDetail', ['$templateCache', function($templateCache) {

				$templateCache.put('customfield-text-detail.html',
							'<div>\
								<strong>{{goModel[field.databaseName]}}</strong><br />\
								<small>{{field.name}}</small>\
							</div>');

				$templateCache.put('customfield-textarea-detail.html',
						'<div>\
							<strong>{{goModel[field.databaseName]}}</strong><br />\
							<small>{{field.name}}</small>\
						</div>');
				
				$templateCache.put('customfield-select-detail.html',
						'<div>\
							<strong>{{goModel[field.databaseName]}}</strong><br />\
							<small>{{field.name}}</small>\
						</div>');
						
				$templateCache.put('customfield-checkbox-detail.html',
						'<div>\
							<strong><i ng-class="{\'checkbox-off\': !goModel[field.databaseName],\'checkbox-on\': goModel[field.databaseName]}"></i> {{field.name}}</strong><br />\
						</div>');
						
				$templateCache.put('customfield-date-detail.html',
						'<div>\
							<strong>{{goModel[field.databaseName] | date:\'longDate\'}}</strong><br />\
							<small>{{field.name}}</small>\
						</div>');
						
				$templateCache.put('customfield-datetime.html',
						'TODO!');
						
						
				$templateCache.put('customfield-number-detail.html',
						'<div>\
							<strong>{{goModel[field.databaseName] | number}}</strong><br />\
							<small>{{field.name}}</small>\
						</div>');

				return {
					restrict: 'E',
					replace: true,
					scope: {
						goModel: '=ngModel',
						serverModel: '@'
					},
					controller: ['$scope','$element','$attrs','$transclude', 'CustomFields', function($scope, $element, $attrs, $transclude, CustomFields) {

						$scope.customFieldSetStore = CustomFields.getFieldSetStore($attrs.serverModel);						

						$scope.fieldSetIf = function(fieldSet){
							
							if(!$scope.goModel){
								return false;								
							}
							
							for(var i = 0, l = fieldSet.fields.length; i < l; i++) {
								if(!GO.isEmpty($scope.goModel[fieldSet.fields[i].databaseName])) {
									return true;
								}
							}
							
							return false;
						};
					}],
						template: '<ul class="properties" >\
							<!--<h1>{{fieldSet.name}}</h1>-->\
								<li ng-if="fieldSetIf(fieldSet);" ng-repeat-start="fieldSet in customFieldSetStore.items" class="index"><i class="star"></i></li>\
								<li ng-repeat-end ng-if="!$root.GO.isEmpty(goModel[field.databaseName])" ng-repeat="field in fieldSet.fields" ng-include="\'customfield-\'+field.type+\'-detail.html\'"></li>\
							</ul>'
				};
			}]);

	