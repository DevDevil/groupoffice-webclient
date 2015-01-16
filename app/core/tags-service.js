'use strict';
/**
 * @ngdoc service
 * @name GO.core.Tags
 *
 * @description
 * Service to fetch tags from the server
 */
angular.module('GO.core').
		service('Tags', ['Store', 'Model', function(Store, Model) {
				
				var tagStore = false;

				var Tags = function() {

				
				};

				Tags.prototype.getTagStore = function() {					
				
					if(!tagStore){
						
						tagStore = new Store(
							'tags',							
							{						
								limit: 0
							});
							
						//tagStore.load();
					}
					
					return tagStore;
					
					
				};

				return new Tags;
			}]);