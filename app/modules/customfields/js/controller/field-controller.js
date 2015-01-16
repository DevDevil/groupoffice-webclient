'use strict';

/* Controllers */
angular.module('GO.customfields.controllers')
		.controller('FieldController', ['$scope', 'Model', '$state', '$stateParams', function ($scope, Model, $state, $stateParams) {
	
				$scope.field = new Model(
						'customfields/fieldsets/' + encodeURI($stateParams.modelName) + '/'+$stateParams.fieldSetId+'/fields'
						);



				$scope.field.read($stateParams.fieldId).then(function () {

					if (!$scope.field.data) {
						$scope.field.data = {};
					}

					if (!$scope.field.data.options) {
						$scope.field.data.options = [];
					}
				});



				$scope.customFieldTypes = [
					{
						value: 'text',
						label: 'Text field'
					}, {
						value: 'textarea',
						label: 'Text area'
					}, {
						value: 'select',
						label: 'Select'
					}, {
						value: 'checkbox',
						label: 'Check box'
					}, {
						value: 'date',
						label: 'Date'
					}, {
						value: 'datetime',
						label: 'Date & time'
					}, {
						value: 'number',
						label: 'Number'
					}
				];

				$scope.save = function () {
					$scope.field.save()
							.then(function (result) {

								$scope.back();

							});
				};

				$scope.back = function () {

					if ($scope.field.id) {
						$scope.field.resetAttributes();
					}

					$state.go("customfields.model.fields", {fieldSetId: $stateParams.fieldSetId});
				};
			}]);
