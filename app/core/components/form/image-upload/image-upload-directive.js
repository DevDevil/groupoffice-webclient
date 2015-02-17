'use strict';

/**
 * @ngdoc directive
 * @name GO.core.form.goImageUpload
 * 
 * @param {string} onChange Function to call on change. It's called with the server file. {file: 'example.jpg'}.
 * @param {string} ngModel Assignable angular expression to data-bind to.
 * @param {expression} goReadOnly
 * @param {expression} goDeletePermission
 * @param {int} thumbWidth
 * @param {int} thumbHeight
 * 
 * @example
 * 
 * <div class="go-image-upload" go-image-upload ng-model="contact.photo" thumb-width="80" thumb-height="80"></div>
 */

angular.module('GO.core.form')
		.directive('goImageUpload', ['Utils', 'Model', '$timeout', function (Utils, Model, $timeout) {
				return {
					restrict: 'A',
					scope: {
						onChange: '&?',
						goModel: '=ngModel',
						goReadOnly: '=?',
						goDeletePermission: '=?',
						thumbWidth: '@',
						thumbHeight: '@'
					},
					//replace:true,

					controller: function ($scope, $element, $attrs, $transclude, Utils) {
						$scope.flowInit = {
							singleFile: true,
							target: Utils.url('upload'),
							headers: {
								'X-XSRFToken' : Utils.getXSRFToken()
							}
						};
					},
					link: function (scope, element, attrs) {
						
						element.addClass('go-image-upload');
						
						scope.XSRFToken = Utils.getXSRFToken();
			
						scope.uploadSuccess = function ($file, $message) {

							scope.$apply(function () {
								var data = angular.fromJson($message);
								
								scope.tempUrl = Utils.url('upload/thumb/' + data.file, {dummy: "1"}); //dummy param so we can add params in view easily
								
								scope.goModel = data.file;
								
								if (scope.onChange) {
									//					scope.$digest();
									//need to call timeout otherwise the scope model hasn't changed yet !?
									$timeout(function () {

										scope.onChange({file: data.file});

									});
								}
							});

						};
						
						scope.remove = function(){
							scope.goModel = null;
							scope.tempUrl = null;
						};

					},
					templateUrl: 'core/components/form/image-upload/image-upload.html'
				};
			}]);
