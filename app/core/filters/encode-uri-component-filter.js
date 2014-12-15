angular.module('GO.core').filter('encodeURIComponent',['$window',function($window) {
  
		return $window.encodeURIComponent;
  }]);