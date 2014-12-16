angular.module('GO.core')
		.directive('goProgress', function ($filter, $locale) {
			return {
				restrict: 'EA',
				replace: true,
				scope:{
					max: '@',
					value: '='
				},
				link: function(scope, element, attrs){					
					var max = parseInt(scope.max);
					scope.getPercentage = function(){
						return Math.ceil((max / parseInt(scope.value)) * 100);
					};
					
				},
				templateUrl: 'core/components/progress/progress.html'
			};
		}); 