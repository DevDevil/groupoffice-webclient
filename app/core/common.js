'use strict';


/**
 * @ngdoc module
 * @name GO.core.filters
 * 
 * @description
 * Some common used filters
 */
angular.module('GO.core.filters',[]);

/**
 * @ngdoc module
 * @name GO.core.translate
 * 
 * @description
 * Translation utilities
 */
angular.module('GO.core.translate',[]);


/**
 * @ngdoc module
 * @name GO.core.form
 * 
 * @description
 * Form utilities
 */
angular.module('GO.core.form',[]);


/**
 * @ngdoc module
 * @name GO.core.data
 * 
 * @description
 * Data handling 
 */
angular.module('GO.core.data',[]);


/**
 * @ngdoc module
 * @name GO.core
 * 
 * @description
 * All core functionality of the Group-Office AngularJS Framework 
 */
angular.module('GO.core', 
	[
		'GO.core.filters', 
		'GO.core.translate', 
		'GO.core.form',
		'GO.core.data'
	]);