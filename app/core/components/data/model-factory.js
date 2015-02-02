'use strict';

/**
 * @ngdoc service
 * @name GO.core.data.Model
 *
 * @description
 * A model is an item that can be saved and loaded from the server. A user for example.
 * 
 * All properties that do no start with a _ or $ char are sent as model attributes to the server.
 *
 * @param {string} controllerRoute The server route to the RESTfull API. eg. '/contacts'
 * @param {object=} baseParams GET parameters for each request
 */
angular.module('GO.core.data')
		.factory('Model', ['$http', '$q', '$timeout', 'Utils', function($http, $q, $timeout, Utils) {

				var Model = function(controllerRoute,  baseParams) {
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Model#$controllerRoute
					 * @propertyOf GO.core.data.Model
					 * @type string
					 * @description The API route to the server. eg. /contacts
					 */
					this.$controllerRoute = controllerRoute;
					this._oldAttributes = {};
					
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Model#$idProperty
					 * @propertyOf GO.core.data.Model
					 * @type string
					 * @description The ID attribute
					 */
					this.$idAttribute = 'id';

					/**
					 * @ngdoc property
					 * @name GO.core.data.Model#$baseParams
					 * @propertyOf GO.core.data.Model
					 * @type object
					 * @description Key value pair of GET parameters to pass on load.
					 */
					this.$baseParams = baseParams || {};
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Model#$busy
					 * @propertyOf GO.core.data.Model
					 * @type boolean
					 * @description Set to true when the model is loading or saving.
					 */
					this.$busy = false;
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Model#$showMask
					 * @propertyOf GO.core.data.Model
					 * @type boolean
					 * @description Set to true when a mask can be shown in the view. It has a 300ms delay on $busy.
					 */
					this.$showMask = false;
					

					this.init();
				};

				Model.prototype.init = function() {
				};				

				Model.prototype._getBaseParams = function() {
					var params = angular.copy(this.$baseParams);

					if (this[this.$idAttribute]) {
						params[this.$idAttribute] = this[this.$idAttribute];
					}

					return params;
				};
				
				Model.prototype._setBusy =  function(busy){
					
					//delay 200ms for the loadmask.
					this.$busy = busy;
					
					if(busy === true){
						$timeout(function(){
							if(this.busy){
								this.showMask = true;
							}
						}.bind(this), 200);
					}else
					{
						this.$showMask = false;						
					}
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#delete
				 * @methodOf GO.core.data.Model
				 * @description
				 * Delete the model on the server
				 
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.delete = function() {

					var deferred = $q.defer();

//					Utils.promiseSuccessDecorator(deferred.promise);
					
					
					this._setBusy(true);

					var url = Utils.url(this.$controllerRoute+'/'+this[this.$idAttribute], this._getBaseParams());
					$http.delete(url)
							.success(function(result) {
								
								this._setBusy(false);

								if (result.success) {
									var data = result.data;

									if (data.validationErrors.length) {
										
//										this.validationErrors = data.validationErrors;
										
										deferred.reject({model: this, result: result});
									} else {
										
										//SoftDeleteTrait has a 'deleted' attribute.
										if(typeof(this.deleted) !== 'undefined'){
											this.deleted = true;
											this._oldAttributes.deleted = true;
										}
										
										deferred.resolve({model: this, result: result});
									}
								} else
								{
									deferred.reject({model: this, result: result, modelData: data});
								}

							}.bind(this));
						

					return deferred.promise;
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#undelete
				 * @methodOf GO.core.data.Model
				 * @description
				 * Undeletes the model on the server if it implements soft deletion
				 
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.unDelete = function(){
					this.resetAttributes();
					this.deleted = false;
					return this.save();
				};

				/**
		
				 * When posting dates to the server API it requires them in ISO8060 standard.
				 * eg. 2014-07-28T13:00+2000. The problem with dates with times is that javascript converts them to UTC when converting to JSON.
				 * This will change the date and the server doesn't know which timezone it's in. We just want to post 2014-07-28 when it's about a date.
				 * This function will check for dates without time and changes it into a string.
				 *
				 * @returns {string}
				 */
				Model.prototype._convertDateToString = function(attributes) {

					var attr = {};

					for (var attrName in attributes) {
						if (attributes[attrName] instanceof Date) {
							attr[attrName] = attributes[attrName].toIntermeshApiFormat();							
						} else if(angular.isObject(attributes[attrName]) && attributes[attrName].className){ //All models return className from API						
							attr[attrName] = this._convertDateToString(attributes[attrName]);	
						}else if(angular.isArray(attributes[attrName])){
							var l = attributes[attrName].length;
							
							if(l){
								attr[attrName] = [];
								for(var i = 0, l; i < l; i++){							
//									var fixed = this.convertDateToString(attributes[attrName][i]);							
									attr[attrName].push(this._convertDateToString(attributes[attrName][i]));
								}
							}
							
						}else
						{
							attr[attrName] = attributes[attrName];
						}
					}

					return attr;
				};
				
			
				
				Model.prototype._convertDateStringsToDates = function (input) {

					for (var key in input) {
//						if (!input.hasOwnProperty(key))
//							continue;
						
						// Check for string properties which look like dates.
						if (typeof input[key] === "string") {		
							
							var value = Date.fromIntermeshApiFormat(input[key]);
							if(value !== false) {
								input[key] = value;
							}
							
						} else if (typeof input[key] === "object") {
							// Recurse into object
							this._convertDateStringsToDates(input[key]);
						}
					}
				};
				
				

				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#isModified
				 * @methodOf GO.core.data.Model
				 * @description
				 * Check if the model has modified attributes
				 *
				 * @returns {boolean} Returns true if the model was modified
				 */
				Model.prototype.isModified = function() {
					return angular.toJson(this.getAttributes()) !== angular.toJson(this._oldAttributes);
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#isNew
				 * @methodOf GO.core.data.Model
				 * @description
				 * Check if the model is not saved on the server
				 *
				 * @returns {boolean} Returns true if the model is new
				 */
				Model.prototype.isNew = function(){
					return this[this.$idAttribute] < 1;
				};
				
				Model.prototype._isAttribute = function(name){		
					
					var exclude = ["validationErrors"];
					
					var firstChar = name.substring(0,1);
					
					return firstChar !== '$' && firstChar !== '_' && exclude.indexOf(name)===-1;
				};
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#getAttributes
				 * @methodOf GO.core.data.Model
				 * @description
				 * Get all model attributes
				 *
				 * @returns {Object} Key value pair of attributes
				 */
				Model.prototype.getAttributes = function(){
					
					var attr = {};
					
					for(var attName in this){
						
						if(typeof(this[attName]) === 'function'){
							continue;
						}
						
						if(this._isAttribute(attName)){
							attr[attName] = this[attName];
						}
					}
					
					return attr;
				};

				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#getModifiedAttributes
				 * @methodOf GO.core.data.Model
				 * @description
				 * Get all modified model attributes that have been changed after load
				 *
				 * @returns {Object} Key value pair of attributes
				 */
				Model.prototype.getModifiedAttributes = function(attributes, oldAttributes) {					
					
					if (typeof (attributes) === 'undefined') {

						var attributes = this.getAttributes();
						var oldAttributes = this._oldAttributes;						
					}

					var modified = false;
					for (var attributeName in attributes) {
						
						if(!this._isAttribute(attributeName)){
							//for $$hashKey that's added by angular for example
							continue;
						}

						var value = attributes[attributeName];						

						if (angular.isArray(value)) {

							var c = value.length;
							if (c) {
								
								for (var i = 0, c = value.length; i < c; i++) {
									
									var attr = this.getModifiedAttributes(
												value[i],
												(oldAttributes[attributeName] && oldAttributes[attributeName][i]) ? oldAttributes[attributeName][i] : {}
														);
									
									if(attr !== false){
										
										modified = this._initModifiedAttributes(modified, attributes);
										if(!modified[attributeName]){
											modified[attributeName] = [];
										}
										
										modified[attributeName].push(attr);										
									}
								}
							}
						} else if(angular.isObject(value) && value.className){ //has one related model. className is always present in GO7 API models
							var attr = this.getModifiedAttributes(
												value,
												oldAttributes[attributeName] ? oldAttributes[attributeName] : {}
														);
												
							if(attr !== false){

								modified = this._initModifiedAttributes(modified, attributes);
								
								modified[attributeName] = attr;				
							}
						}else
						{							
							if (!angular.equals(oldAttributes[attributeName], value)) {
							
								modified = this._initModifiedAttributes(modified, attributes);

								modified[attributeName] = value;
							}
						}
					}

					return modified;
				};
				
				Model.prototype._initModifiedAttributes = function(modified, attributes){
					//todo id should be dynamic?
					if(!modified)
					{
						modified ={id: attributes.id};
					}
					
					return modified;
				};


				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#save
				 * @methodOf GO.core.data.Model
				 * @description
				 * Save the model on the server
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#post}
				 */
				Model.prototype.save = function(getParams) {
					
					var params = this._getBaseParams();
					
					if(getParams){
						angular.extend(params, getParams);
					}

					var url = this[this.$idAttribute] > 0 ? Utils.url(this.$controllerRoute+'/'+this[this.$idAttribute], params) : Utils.url(this.$controllerRoute, params);

					var method = this[this.$idAttribute] > 0 ? 'put' : 'post';
					
//					var url = Utils.url(this.controllerRoute+'/'+this[this.idAttribute], params);

					var deferred = $q.defer();

//					Utils.promiseSuccessDecorator(deferred.promise);
					
//					var modifiedAttributes = this.isNew() ? this.attributes : this.getModifiedAttributes();
					var modifiedAttributes = this.getModifiedAttributes();

					if(modifiedAttributes){
						var saveParams = {};
					
						saveParams["data"] = this._convertDateToString(modifiedAttributes);						
						
						this._setBusy(true);

						$http[method](url, saveParams)
								.success(function(result) {
									
									this._setBusy(false);
								
									var data = result.data;

									if (!result.success) {
			
										this._loadValidationErrors(data);
										
										deferred.reject({model: this, result: result, validationErrors: data.validationErrors});
									} else {

										this.loadData(data);
										
										deferred.resolve({model: this, result: result});
									}

								}.bind(this));
					}else
					{
						deferred.resolve({model: this, result: false});
					}

					return deferred.promise;
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#readIf
				 * @methodOf GO.core.data.Model
				 * @description
				 * Load the model data from the server but only if not already loaded
				 * with the same ID. Useful with detail and edit pages that share the same model.
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.readIf = function(id, params) {
					if (this[this.$idAttribute] == id) {
						return $timeout(function() {
						});
					} else
					{
						return this.read(id, params);
					}
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#resetAttributes
				 * @methodOf GO.core.data.Model
				 * @description
				 * Reset the attributes to their original state.
				 *
				 */
				Model.prototype.resetAttributes = function() {
					//this.attributes = angular.copy(this.oldAttributes);
					
					//keep reference 
					var attr = this.getAttributes();
					for (var i in attr) {
						delete this[i];
					}
					
					for(var i in this._oldAttributes){
						this[i] = angular.copy(this._oldAttributes[i]);
					}
				};
				
				
				/**
				 * 				 
				 * Adds validation errors to existing data without overwriting it.
				 */
				
				Model.prototype._loadValidationErrors = function(data, obj){
					if(!obj){
						obj = this;
					}
								
					
					if(data.validationErrors){
						obj.validationErrors = data.validationErrors;
					}

					for(var attr in data){						

						if (angular.isArray(data[attr])){								
							for(var i = 0, l = data[attr].length; i < l; i++) {

								for(var n = 0, l2 = obj[attr].length; n < l2; n++){									

									if(data[attr][i].id === obj[attr][n].id ||
											!data[attr][i].id && !obj[attr][n].id){
										this._loadValidationErrors(data[attr][i], obj[attr][n]);
										break;
									}
								}
							}
						}else if(angular.isObject(data[attr]) && angular.isObject(obj[attr])){

							this._loadValidationErrors(data[attr], obj[attr]);
						}
					}

				
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#loadData
				 * @methodOf GO.core.data.Model
				 * @description
				 * Load the initial model attributes from the server.
				 * Don't set attributes directly because this function makes a copy so the model can be reset to the old attributes.
				 *
				 * @param {object} data to load		 
				 */
				Model.prototype.loadData = function(data) {					
					
					this._convertDateStringsToDates(data);
					
					for (var key in data){
						if(angular.isObject(this[key])){
							angular.copy(data[key], this[key]);
						}else
						{
							this[key] = data[key];
						}
					}
					
					this._oldAttributes = angular.copy(this.getAttributes());
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Model#read
				 * @methodOf GO.core.data.Model
				 * @description
				 * Load the model data from the server
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @param {boolean} extendAttributes Keep current attributes and add the loaded attributes
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Model.prototype.read = function(id, params, extendAttributes) {

					var p = this._getBaseParams();

					angular.extend(p, params);

//					if (id) {
//						p[this.idAttribute] = id;
//					}

					var url = Utils.url(this.$controllerRoute+'/'+id, p);
					
					var deferred = $q.defer();
					
//					Utils.promiseSuccessDecorator(deferred.promise);
					
				
					this._setBusy(true);
					
					$http.get(url).success(function(result) {						
						this._setBusy(false);
						
						if (result.data) {
							
							if(extendAttributes){								
								for(var key in result.data){
									delete this[key];
								}
								angular.extend(result.data, this.getAttributes());
							}
							
							this.loadData(result.data);
							
							deferred.resolve({model: this, result: result});
						}else
						{
							deferred.reject({model: this, result: result});							
						}						

					}.bind(this)).error(function(result){
						
						this._setBusy(false);
						
						deferred.reject({model: this, result: result});
					}.bind(this));
					
					
					return deferred.promise;

				};
				
				return Model;

			}]);
