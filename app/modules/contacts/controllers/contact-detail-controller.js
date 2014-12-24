'use strict';

GO.module('GO.contacts.controllers').
		controller('ContactDetailController', ['$scope', '$stateParams', 'Utils',function($scope, $stateParams, Utils) {

				//Sharing dialog
//				$scope.shareModal = new ShareModal(
//						[{
//							name:'readAccess',
//							label: 'Read'
//						},{
//							name:'uploadAccess',
//							label: 'Upload files'
//						},{
//							name:'editAccess',
//							label: 'Edit'
//						},{
//							name:'deleteAccess',
//							label: 'Delete'
//						}],
//						'\\Intermesh\\Modules\\Contacts\\Model\\Contact'
//					);
			
							
				//Contact model is defined in the parent scope of ContactsController			
				$scope.contact.read($stateParams.contactId).then(function() {

				});
				
	
			}]);