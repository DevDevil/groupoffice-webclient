'use strict';

/* Controllers */
angular.module('GO.email.controllers').
		controller('EmailController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', '$sce','$http','Utils','$timeout', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules,  $sce, $http, Utils, $timeout) {

				
				
				$scope.listActive = true;						
				$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
						$scope.listActive = toState.name === 'email';
					});
					
				$scope.setListActive = function(active){
					$scope.listActive = active;
				};
				
				
				
				$scope.accountStore = new Store('email/accounts',{
					returnAttributes: '*,folders'
				});
				$scope.accountStore.load().then(function(){
					
					var firstFolder = $scope.accountStore.items[0].folders[0];
					
					$state.go('email.threads', {accountId: firstFolder.accountId, folderId: firstFolder.id});
				});
				
				
				
				
				//Todo put in service
				$scope.sync = {
					text: "Waiting...",
					percentage:100,
					active: true
				};
				
				var fetcher = function(){
					
					$scope.sync.active = true;
					
					$http.get(Utils.url('email/accounts/1/sync'))
							.success(function(result) {					
								
								$scope.sync.text = result.dbCount+"/"+result.imapCount;
								$scope.sync.percentage = parseInt((result.dbCount / result.imapCount) * 100);
						
								if(result.dbCount < result.imapCount){
									fetcher();
								}else
								{
									$scope.sync.active = false;
									$scope.sync.text = "Waiting...";
									
									$timeout(function(){
										fetcher();
									}.bind(this), 10000);
								}
								

							}.bind(this));
					
				};
				
				fetcher();
				


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
//				$scope.message = new Model(
//						'email/accounts/1/mailbox/INBOX/messages'
//						);


				
			}]);


