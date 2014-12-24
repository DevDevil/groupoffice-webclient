'use strict';

GO.module('GO.contacts.controllers').
		controller('ContactTimelinesController', ['Model', '$scope', '$stateParams', 'Utils','Store', '$state', function(Model, $scope, $stateParams, Utils, Store, $state) {
		
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.readIf($stateParams.contactId).then(function() {
					
				});
				
				$scope.timelineStore =  new Store(
						'contacts/'+$stateParams.contactId+'/timeline',
						{
							limit: 5,
							returnAttributes: '*, authorThumbUrl, owner.username'
						});
						
				$scope.timelineStore.load();
			
			}]);
		