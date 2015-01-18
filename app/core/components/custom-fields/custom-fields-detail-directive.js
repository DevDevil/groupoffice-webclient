'use strict';

angular.module('GO.core')		
		.directive('goCustomFieldsDetail', ['$templateCache', function($templateCache) {

				$templateCache.put('customfield-text-detail.html',
						'<dl ng-if="!$root.isEmpty(goModel[field.databaseName])">\
							<dt>{{field.name}}</dt>\
							<dd>{{goModel[field.databaseName]}}</dd>\
						</dl>');

				$templateCache.put('customfield-textarea-detail.html',
						'<dl ng-if="!$root.isEmpty(goModel[field.databaseName])">\
							<dt>{{field.name}}</dt>\
							<dd><pre>{{goModel[field.databaseName]}}</pre></dd>\
						</dl>');
				
				$templateCache.put('customfield-select-detail.html',
						'<dl ng-if="!$root.isEmpty(goModel[field.databaseName])">\
							<dt>{{field.name}}</dt>\
							<dd>{{goModel[field.databaseName]}}</dd>\
						</dl>');
						
				$templateCache.put('customfield-checkbox-detail.html',
						'<dl>\
							<dt>&nbsp;</dt><dd><i class="fa" ng-class="{\'fa-square-o\': !goModel[field.databaseName],\'fa-check-square-o\': goModel[field.databaseName]}"></i> {{field.name}}</dd>\
						</dl>');
						
				$templateCache.put('customfield-date-detail.html',
						'<dl ng-if="!$root.isEmpty(goModel[field.databaseName])">\
							<dt>{{field.name}}</dt>\
							<dd>{{goModel[field.databaseName] | date:\'longDate\'}}</dd>\
						</dl>');
						
				$templateCache.put('customfield-datetime.html',
						'TODO!');
						
						
				$templateCache.put('customfield-number-detail.html',
						'<dl ng-if="!$root.isEmpty(goModel[field.databaseName])">\
							<dt>{{field.name}}</dt>\
							<dd>{{goModel[field.databaseName] | number}}</dd>\
						</dl>');

				return {
					restrict: 'E',
					scope: {
						goModel: '=ngModel',
						serverModel: '@'
					},
					controller: ['$scope','$element','$attrs','$transclude', 'CustomFields', function($scope, $element, $attrs, $transclude, CustomFields) {

						$scope.customFieldSetStore = CustomFields.getFieldSetStore($attrs.serverModel);						

					}],
						template: '<ul class="properties" ng-repeat="fieldSet in customFieldSetStore.items">\
							<h1>{{fieldSet.name}}</h1>\
								<ng-include ng-repeat="field in fieldSet.fields" src="\'customfield-\'+field.type+\'-detail.html\'"></ng-include>\
							</div>'
				};
			}]);

	