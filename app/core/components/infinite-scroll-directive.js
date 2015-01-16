'use strict';

/**
 * @ngdoc directive
 * @name GO.core.goInfiniteScroll
 * @element ANY
 *
 * @description
 * Scroll an element infinitely
 *
 * @param {function} goInfiniteScroll function that should be called to load more items
 * @param {expression=} goInfiniteScrollDisabled {@link guide/expression Expression} that returns true or false to disable scrolling. Useful for pending AJAX requests.
 * @example View
 <div go-infinite-scroll="loadMore()" style="height:100px;overflow:auto">
	<div ng-repeat="item in items" style="border:1px solid grey;height:20px;">{{item.name}}</div>
 </div>
 
 * @example Controller
 angular.module('myExampleModule', ["GO.infiniteScroll"])
 .controller('ExampleController', ['$scope', function($scope) {
 
 $scope.items=[];
 
 $scope.loadMore = function() {
 for(var i=0;i<10;i++){
 $scope.items.push({name:"Item "+$scope.items.length});
 }
 };
 
 }]);
 </file>
 </example>
 */
angular.module('GO.core').
		directive('goInfiniteScroll', ['$timeout', function ($timeout) {
				return{
					scope: {
						goInfiniteScroll: '&',
						goInfiniteScrollDisabled: '='
//						imInfiniteScrollUseDocumentBody: '@'
					},
					link: function (scope, element, attr) {

						var
								lengthThreshold = attr.scrollThreshold || 50,
								timeThreshold = attr.timeThreshold || 400;

						lengthThreshold = parseInt(lengthThreshold, 10);
						timeThreshold = parseInt(timeThreshold, 10);


						var scrollEnabled = true;

						scope.$watch('goInfiniteScrollDisabled', function (v) {
							scrollEnabled = !v;
						});

						var scrollEl = element[0];

						var checker = function () {

							if (!scrollEnabled) {
								return $timeout(checker, timeThreshold);
							}

							if (scrollEl.scrollTop > 0) {
								var remaining = scrollEl.scrollHeight - (scrollEl.clientHeight + scrollEl.scrollTop);
//	console.log(scrollEl.scrollHeight);
//	console.log(scrollEl.clientHeight);
//	console.log(remaining);

								if (remaining < lengthThreshold) {

//											console.log('infinite scroll triggered');
									scope.goInfiniteScroll();
									$timeout(checker, timeThreshold);
								}
							}
						};

						checker();


//						if (attr["imInfiniteScrollUseDocumentBody"]) {
//							angular.element(window).bind('scroll', checker);
//						} else
//						{
							element.bind('scroll', checker);
//						}
					}

				};
			}]);