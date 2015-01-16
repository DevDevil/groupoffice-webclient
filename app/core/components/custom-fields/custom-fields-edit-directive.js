'use strict';

/**
 * @ngdoc directive
 * @name GO.core.customfields.goCustomFieldsEdit
 * 
 * @description
 * Prints custom fields form fieldsets.
 * 
 * 
 * @param {string} ngModel The customfields model property of the model the customfields belong to
 * @param {string} serverModel The custom fields server model.
 * 
 * @example
 * <go-custom-fields-edit ng-model="contact.customfields" server-model="GO\Modules\Contacts\Model\ContactCustomFields"></go-custom-fields-edit>				
 */
angular.module('GO.core')
		.directive('goCustomFieldsEdit', ['$templateCache', '$compile','CustomFields', function($templateCache, $compile, CustomFields) {


				var buildTemplate = function(customFieldSetStore){
					var tpl = '';
					for(var i = 0, l = customFieldSetStore.items.length; i < l; i++){
						
						var fieldSet = customFieldSetStore.items[i];
						
						tpl +=  '<fieldset><legend>'+fieldSet.name+'</legend>';
				
						for(var n = 0, cl = fieldSet.fields.length; n < cl; n++){
							var field = fieldSet.fields[n];
							tpl += buildFunctions[field.type](field);
						}
								
						tpl += '</fieldset>';
						
					}
					
					return tpl;
							
							
				};
				
				var buildFunctions = {
					text: function(field){
						return '<div class="row">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<input id="'+field.databaseName+'" name="'+field.databaseName+'" type="text" maxlength="'+field.data.maxLength+'" ng-model="goModel[\''+field.databaseName+'\']" placeholder="'+field.placeholder+'" ng-required="'+(field.required ? 'true' : 'false')+'" class="form-control" />\
								<go-show-error for="'+field.databaseName+'" go-model="goModel"></go-show-error>\
						</div>';
					},
					
					textarea: function(field){
						return '<div class="row">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<textarea id="'+field.databaseName+'" name="'+field.databaseName+'" maxlength="'+field.data.maxLength+'" ng-model="goModel[\''+field.databaseName+'\']" placeholder="'+field.placeholder+'" ng=required="'+(field.required ? 'true' : 'false')+'" class="form-control" msd-elastic="\n"></textarea>\
								<go-show-error for="'+field.databaseName+'" go-model="goModel"></go-show-error>\
						</div>';
					},
					
					select: function(field){
						var tpl = '<div class="row">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<select id="'+field.databaseName+'" name="'+field.databaseName+'" ng-model="goModel[\''+field.databaseName+'\']">';
						
							for(var i = 0, l = field.data.options.length; i < l; i++) {
								tpl += '<option value="'+field.data.options[i].value+'">'+field.data.options[i].value+'</option>';
							}
							
								tpl += '</select>';
						
							tpl += '<go-show-error for="'+field.databaseName+'" go-model="goModel"></go-show-error>\
						</div>';
						
						return tpl;
					},
					
					checkbox: function(field){
						return '<div class="row"><div class="checkbox">\
							<label>\
								<input id="cf_{{field.id}}" type="checkbox" ng-model="goModel[\''+field.databaseName+'\']" /> '+field.name+'\
							</label>\
						</div></div>';
					},
					
					date: function(field){
						return '<div class="row">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
							<div class="input-group" style="width:300px">\
								<input name="'+field.databaseName+'" id="cf_{{field.id}}" type="text" class="form-control"  ng-model="goModel[\''+field.databaseName+'\']" datepicker-popup />\
							<go-show-error for="'+field.databaseName+'" go-model="goModel"></go-show-error></div>\
						</div>';
					},
					number: function(field){
						return '<div class="row">\
							<label for="'+field.databaseName+'">'+field.name+'</label>\
								<input go-number id="cf_{{field.id}}" name="'+field.databaseName+'" type="text" ng-model="goModel[\''+field.databaseName+'\']" placeholder="{{field.placeholder}}" ng-required="field.required" class="form-control" />\
								<go-show-error for="'+field.databaseName+'" go-model="goModel"></go-show-error>\
						</div>';
					}
				};

				return {
					restrict: 'E',
					scope: {
						goModel: '=ngModel',
						serverModel: '@'
					},
					link: function(scope, element, attrs){

						var customFieldSetStore = CustomFields.getFieldSetStore(attrs.serverModel);
						//TODO load is called twice now
						customFieldSetStore.promise.then(function(){
						
							var tpl  = buildTemplate(customFieldSetStore);

							element.html(tpl);
							$compile(element.contents())(scope);
						});
					}					
				};		
			}]);