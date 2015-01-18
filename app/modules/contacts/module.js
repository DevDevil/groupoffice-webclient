'use strict';

GO.module('GO.contacts.controllers', []);


// Declare app level module which depends on views, and components
GO.module('GO.contacts', ['GO.core', 'GO.contacts.controllers']).
		//Register the module
		config(['launcherProvider', function (launcherProvider) {
								
				launcherProvider.add('contacts', 'Contacts', ['Intermesh\Modules\Contacts\ContactsModule']);
			}]).
		config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

//						$urlRouterProvider.when('/contacts/contact/{id}', '/contacts/contact/{id}/detail');

				// Now set up the states
				$stateProvider
						.state('contacts', {
							url: "/contacts?gender&age",
							templateUrl: 'modules/contacts/views/main.html',
							controller: 'ContactController'
						})
                                                


						.state('contacts.contact', {
							url: "/contact/{contactId:[0-9]*}",
							templateUrl: 'modules/contacts/views/contact.html'
						})
						.state('contacts.contact.detail', {
							url: "/detail",
							templateUrl: 'modules/contacts/views/contact-detail.html',
							controller: 'ContactDetailController'
						})

						.state('contacts.edit', {
							url: "/edit/{contactId:[0-9]*}",
							templateUrl: 'modules/contacts/views/contact-edit.html',
							controller: 'ContactEditController'
						})
						.state('contacts.createCompany', {
							url: "/createCompany",
							templateUrl: 'modules/contacts/views/contact-edit.html',
							controller: 'ContactEditController'
						})

						.state('contacts.contact.files', {
							url: "/files",
							templateUrl: 'modules/contacts/views/contact-files.html',
							controller: 'ContactFilesController'
						})

						.state('contacts.contact.timeline', {
							url: "/comments",
							templateUrl: 'modules/contacts/views/contact-timeline.html',
							controller: 'ContactTimelinesController'
						})
						.state('contacts.contact.timeline.edit', {
							url: "/edit/{timelineItemId:[0-9]*}",
							controller: "ContactTimelineController",
							template: '<div ng-init="openModal()"></div>'
						})
						.state('contacts.contact.timeline.message', {
							url: "/message/{messageId:[0-9]*}",
							controller: 'MessageController',
							template: '<div ng-init="openModal()"></div>'
						})

						.state("settings.contacts", {
							url: '/contacts',
							controller: 'ContactController',
							template: '<div ui-view></div>'
						})

						.state("settings.contacts.editProfile", {
							url: '/{contactId:[0-9a-z]*}',
							templateUrl: 'modules/contacts/views/contact-edit.html',
							controller: 'ContactEditController'
						});
			}]);