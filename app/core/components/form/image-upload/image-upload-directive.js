/**
 * Image placeholder directive.
 * 
 * Use like this: <go-goage-upload-placeholder go-goage="goage" go-delete-permission="note.permissions.editAccess" go-thumb-url="'IPE/keepNotes/noteImage/thumb'"></go-goage-upload-placeholder>
 * 
 *
 */


'use strict';

angular.module('GO.core')

		.directive('goImageUpload', ['$templateCache', '$http', 'Utils', 'Model', '$timeout', function ($templateCache, $http, Utils, Model, $timeout) {


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
							target: Utils.url('upload')
						};
					},
					link: function (scope, element, attrs) {
						
						element.addClass('go-image-upload');


			
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
