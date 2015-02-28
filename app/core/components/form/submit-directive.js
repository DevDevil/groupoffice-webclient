

/**
 * @ngdoc directive
 * @name GO.core.form.goSubmit
 * @element input
 *
 * @description
 * Supply the function to execute on form submit. It also takes care of success and failure notifications.
 *
 * @example
 <form name="userForm"  novalidate go-submit="save()">
 */
angular.module('GO.core.form')
				.directive('goSubmit', ['$log', 'Alerts', 'Translate',
					function ($log, Alerts, Translate) {

						return {
							// restrict to an element tag type.
							restrict: 'A',
							// create a copy of the scope, inheriting the data
							scope: {
								goSubmit: '&'
							},
							// require that the element is a child of form
							require: ['form'],
							// executed as the controller for the directive
							controller: function ($scope, $element, $attrs) {

								var formName = $element.attr('name');

								if (!formName)
									throw "form must have a name!";

								var form = $element.controller("form");


								$element.on('submit', function ($event) {

									//Hack for autocomplete event

//							var arr = $element.find('input');						
//							for(var i=0,l=arr.length;i<l;i++){
//								console.log(arr[i]);
//								$log.info("Firing input,change and keydown listeners in im-submit directive to fix autocomplete problem");
//								if(arr[i].autocomplete){
//									arr[i].triggerHandler('input').triggerHandler('change').triggerHandler('keydown');
//								}
//							}



									//ng-submitted was added in angularjs 1.3
									//$submitted too
									//
//							$element.addClass('submitted');
//							form.submitted = true;	

									var handleFailure = function () {

										//otherwise popups don't show in modal windows.
										//$scope.$parent.$digest();

//								console.log(form);

										//find first form element with error and focus it.
										for (var key in form) {
											var el = form[key];
											if (angular.isObject(el) && angular.isDefined(el.$valid) && !el.$valid) {
												document.forms[form.$name].elements[el.$name].focus();
												break;
											}
										}

										//document.forms[$scope.form.$name].elements[$scope.formEl.$name].focus();

										Alerts.addAlert(Translate.t("The form contains errors. Please check your input."), "danger");
									};

									if ($scope.$parent[formName].$valid) {
										
										var promise = $scope.goSubmit();
										
										if(!promise){
											console.error("go-submit handler should return promise");
											return;
										}
										
										promise.then(function () {
											Alerts.addAlert(Translate.t("Saved successfully"), "success");
										}, function(){
											handleFailure();
										});


									} else {
										handleFailure();
									}
								});
							}
						};
					}
				]);