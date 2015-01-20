'use strict';

angular.module('GO.core')		
		.directive('goCustomFieldsDetail', ['$templateCache', function($templateCache) {

				$templateCache.put('customfield-text-detail.html',
							'<div>\
								<strong>{{goModel[field.databaseName]}}</strong><br />\
								<small>{{field.name}}</small>\
							</div>');

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

	