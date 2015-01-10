'use strict';

/* Controllers */
angular.module('GO.customfields.controllers')
		.controller('FieldController', ['$scope', 'Model', '$state', '$stateParams', function ($scope, Model, $state, $stateParams) {
	
				$scope.field = new Model(
						'CustomFields/fieldsets/' + encodeURI($stateParams.modelName) + '/fields'
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
					$scope.field.save({
						fieldSetId: $stateParams.fieldSetId
					})
							.success(function (result) {

								$state.go("^");

							});
				};

				$scope.cancel = function () {

					if ($scope.field.id) {
						$scope.field.resetAttributes();
					}

					$state.go("^");
				};
			}]);
