'use strict';

/* Controllers */
angular.module('GO.email.controllers').
		controller('ThreadsController', ['$scope', '$stateParams', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', '$sce','$http','Utils','$timeout', function($scope, $stateParams, Translate, Store, Model, Tags, CustomFields, Modules,  $sce, $http, Utils, $timeout) {

					
				
				

				$scope.store = new Store(
						'email/accounts/'+$stateParams.accountId+'/folders/'+$stateParams.folderId+'/threads',{
							limit: 10
						}
						);
				
				$scope.store.modelName = "Thread";
				
//				$scope.store.loadData = function(data){
					
					//for debug
//					for(var i=0,c=data.length;i<c;i++){
//						data[i].attributes.excerpt = null;
//					}
					
//					Store.prototype.loadData.call(this, data);
//					
//					for(var i = 0, c = this.items.length; i < c; i++){
//						if(this.items[i].excerpt === null){
//							this.items[i].$controllerRoute = 'email/accounts/1/folders/4/messages';
//							this.items[i].read(this.items[i].id,{returnAttributes:'threadId,body,excerpt'}, true).then(function(data){
//
//							}.bind(this));
//						}
//					}
					
//					
//				}.bind($scope.store);
				
				$scope.store.load();
			}]);