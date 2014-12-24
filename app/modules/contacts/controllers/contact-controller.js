'use strict';

/* Controllers */
GO.module('GO.contacts.controllers').
		controller('ContactController', ['$scope', '$state', 'Translate', 'Store', 'Model', 'Tags', 'CustomFields','Modules', function($scope, $state, Translate, Store, Model, Tags, CustomFields, Modules) {

				$scope.pageTitle = Translate.t('Contacts');

				/* For mobiles, switch list and details on state */
			
//				$scope.panelSwitcher = new PanelSwitcher($scope, 'contacts');

				$scope.store = new Store(
						'contacts',
						{
							returnAttributes: "id,name,photo,company.name"
						});
						
				$scope.store.load();


				//Will be used in child scope. We define it here so we can access
				//the properties if needed in the future.
				//Child scopes automatically inherit properties of the parents but
				//not the other way around.
				$scope.contact = new Model(
						'contacts',
						{
							returnAttributes: "*,photo,emailAddresses,phoneNumbers,dates,addresses[*, formatted],tags,customfields,company,employees[id, name, photoFilePath]"
						});




				/* Select options for detail and edit controller */

				$scope.emailAddressOptions = {
						'work': Translate.t('Work'),
						'home': Translate.t('Home'),
						'billing': Translate.t('Billing'),
						'other': Translate.t('Other')
					};


				$scope.phoneNumberOptions = {
						'work,voice': Translate.t('Phone') + ' ' + Translate.t('Work'),
						'work,cell': Translate.t('Mobile') + ' ' + Translate.t('Work'),			
						'home,voice': Translate.t('Phone') + ' ' + Translate.t('Home'),			
						'home,cell': Translate.t('Mobile') + ' ' + Translate.t('Home')
					};

				$scope.dateOptions = {
						'birthday': Translate.t('Birthday'),
						'anniversary': Translate.t('Anniversary'),
						'other': Translate.t('Other')
					};


		

				/* End select options for detail and edit controller */

				$scope.onSettingsPage = $state.is("settings.contacts.editProfile");


				$scope.save = function() {

					$scope.contact.save()
							.then(function(result) {
								//success
	
								$scope.syncWithStore(true);
								$state.go('contacts.contact.detail', {contactId: $scope.contact.id});
								

							});
				};


				$scope.syncWithStore = function(reloadStore) {
					var index = $scope.store.findIndexByAttribute('id', $scope.contact.id);

					if (index > -1) {
						$scope.store.items[index].attributes = angular.copy($scope.contact.attributes);
					} else if (reloadStore) {
						$scope.store.reload();
					}
				};



				/* filter panel */

				$scope.customFilters = {};
				var defaultFilters = {
					gender: null,
					tags: []
				};

				$scope.filters = angular.copy(defaultFilters);

				$scope.genderFilterOptions = [
					{
						value: null,
						label: Translate.t('Disabled')
					}, {
						value: "M",
						label: Translate.t('Male')
					}, {
						value: "F",
						label: Translate.t('Female')
					}];

				$scope.resetFilters = function() {
					$scope.customFilters = {};
					$scope.filters = angular.copy(defaultFilters);
					
					
					$scope.isFilterActive = false;
				};
				
			
				$scope.closeSidePanelCallback = function() {
				
					var where = CustomFields.filterModelToWhereParameter($scope.customFilters);

					var tags = [];

					var l = $scope.filters.tags.length;

					if (l) {
						for (var i = 0; i < l; i++) {
							tags.push($scope.filters.tags[i].id);
						}

						where.push(['IN', 'tagLink.tagId', tags]);
					}

					if ($scope.filters.gender) {
						where.push({gender: $scope.filters.gender});
					}
					
					
					if($scope.filters.age){
						if($scope.filters.age.lt){		

							var date = new Date();
							date.setYear(date.getFullYear() - $scope.filters.age.lt);
							date.setHours(0);
							date.setMinutes(0);
							date.setSeconds(0);

							where.push(['AND', '>=',{"dates.date": date.toIntermeshApiFormat()}]);
						}

						if($scope.filters.age.gt){	

							var date = new Date();						
							date.setYear(date.getFullYear() - $scope.filters.age.gt);
							date.setHours(0);
							date.setMinutes(0);
							date.setSeconds(0);

							where.push(['AND', '<=',{"dates.date": date.toIntermeshApiFormat()}]);
						}
					}

					$scope.store.loadParams.where = where;

					$scope.isFilterActive = where.length > 0;

					$scope.store.reset();
					$scope.store.load();

				};
				
				
				Modules.getModule('contacts').then(function(module){
					$scope.contactsModule = module;
				});

				
			}]);


