'use strict';

angular.module('GO.customfields.controllers', []);

GO.module('GO.customfields', ['GO.customfields.controllers']).
		//Register the app
		config(['launcherProvider', function (launcherProvider) {
								
				launcherProvider.add('customfields', 'Custom fields', ['Intermesh\Modules\CustomFields\CustomFieldsModule']);
			}]).
		config(['$stateProvider', function($stateProvider) {

				// Now set up the states
				$stateProvider
						.state('customfields', {
							url: "/customfields",
							templateUrl: 'modules/customfields/views/main.html',
							controller: 'CustomFieldsController'
						})
						.state('customfields.model', {
							url: "/model/{modelName:[^/]*}",
							templateUrl: 'modules/customfields/views/model.html',
							controller: 'ModelController'
						})
						.state('customfields.fieldset', {
							url: "/fieldSet/{modelName:[^/]*}/{fieldSetId:[0-9]*}",
							controller: "FieldSetController",
							templateUrl: 'modules/customfields/views/field-set.html'
						})
						.state('customfields.model.fields', {
							url: "/fields/{fieldSetId:[0-9]*}",
							templateUrl: 'modules/customfields/views/fields.html',
							controller: 'FieldsController'
						})
						.state('customfields.model.fields.field', {
							url: "/field/{fieldId:[0-9]*}",
							//controller: "FieldController",
							//templateUrl: 'modules/customfields/views/field.html'
						});
			}]);		