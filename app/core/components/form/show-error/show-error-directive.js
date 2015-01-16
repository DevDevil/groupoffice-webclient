
/**
 * @ngdoc directive
 * @name GO.core.form.goShowError
 * 
 * @description
 * Shows an error baloon on form input validation errors
 * 
 * @example
 * 
 * <div class="row">
 *	<label for="number">
 *  	Number
 *	</label>
 *	<input id="number" name="number" ng-model="formModel.number" go-number required />
 *	<go-show-error for="number"></go-show-error>
 * </div>
 */
angular.module('GO.core.form')
		.directive('goShowError', ['Translate', '$parse', '$sce', '$timeout',
			function (Translate, $parse, $sce, $timeout) {

				return {
					// restrict to an element tag type.
					restrict: 'E',
					// create a copy of the scope, inheriting the data
					scope: {
						'for': '@',
						'attributeName': '@?',
						goModel: '=?'
					},
					// require that the element is a child of form
					require: '^form',
					templateUrl: 'core/components/form/show-error/show-error.html',
					// executed as the controller for the directive
					controller: function ($scope, $element, $attrs) {
						$scope.form = $element.controller("form");

						$attrs.$observe('for', function (newValue) {

							//obser for so we can user for="number_{{$index}}" when using ng-repeat for example.
							$scope.for = newValue;
	
							if (!$scope.attributeName) {
								$scope.attributeName = $attrs.for;
							}

							$scope.formEl = $scope.form[$scope.for];


							if (!$scope.formEl) {
								throw $scope.for + ' form element not found!';
							}


							if ($scope.goModel) {

								$scope.$watch('goModel.validationErrors["' + $scope.attributeName + '"]', function (newValue, oldValue) {


									if (newValue) {
										serverError = newValue;

										var currentValue = $scope.goModel[$scope.attributeName];

										$scope.formEl.$setValidity('server', false);

										var unregister = $scope.$watch('goModel["' + $scope.attributeName + '"]', function (newValue, oldValue) {

											if (currentValue !== newValue) {

												//clear server error when user inputs a new value


												$timeout(function () {
													$scope.formEl.$setValidity('server', true);
													serverError = null;
													delete $scope.goModel.validationErrors[$scope.attributeName];


													unregister();
												});
											}
										});

									}
								});
							}

						});






						var serverError = null;
						var messages = {};

						if ($attrs.goMessages) {
							var messagesGetter = $parse($attrs.goMessages);

							messages = messagesGetter();
						}

//						console.log($scope.form);

						$scope.hasErrors = function () {
							
							var hasErrors = $scope.formEl && !$scope.formEl.$valid && ($scope.formEl.$dirty || $scope.form.$submitted);
							
							return hasErrors;
						};



						var getServerError = function () {

							if (messages[serverError.code]) {
								return messages[serverError.code];
							}

							switch (serverError.code) {
								case 'unique':
									return Translate.t('This name is already taken'); //TODO Custom error messages

								case 'required':
									return Translate.t('This field is required');
									
								case 'wrongPassword':
									return Translate.t('You entered an incorrect password');

								case 'weakPassword':
									//	{"code":"weakPassword","info":[{"minLength":6},{"requireUpperCase":true},["requireNumber"],["requireSpecialChars"]]}	
									var msg = Translate.t('The password is not strong enough.');

									msg += "<ul>";
									if (serverError.info.minLength) {
										msg += '<li>' + Translate.t("It must be at least {minLength} characters long.").replace(
												'{minLength}', serverError.info.minLength) + '</li>';
									}

									if (serverError.info.minUniqueChars) {
										msg += '<li>' + Translate.t("It must be at least {minUniqueChars} unique characters.").replace(
												'{minUniqueChars}', serverError.info.minUniqueChars) + '</li>';
									}

									if (serverError.info.requireUpperCase) {
										msg += '<li>' + Translate.t("It must have an uppercase character.") + '</li>';
									}

									if (serverError.info.requireLowerCase) {
										msg += '<li>' + Translate.t("It must have a lowercase character.") + '</li>';
									}

									if (serverError.info.requireSpecialChars) {
										msg += '<li>' + Translate.t("It must have a special character like '!@#$%^&*()'.") + '</li>';
									}

									if (serverError.info.requireNumber) {
										msg += '<li>' + Translate.t("It must have a number in it.") + '</li>';
									}

									msg += "</ul>";


									return $sce.trustAsHtml(msg);


								default:
									return angular.toJson(serverError);
							}

						};

						$scope.showError = function (errorKey) {

							if (messages[errorKey]) {
								return messages[errorKey];
							}

							switch (errorKey) {
								case 'required':
									return Translate.t('This field is required');

								case 'goMatch':
									return Translate.t('The values don\'t match');

								case 'email':
									return Translate.t('The e-mail address is invalid');

								case 'server':

									return getServerError();

									break;

								default:
									return errorKey;
							}

						};

					}
				};
			}
		]);