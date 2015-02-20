'use strict';

/**
 * @ngdoc service
 * @name GO.core.data.Store
 *
 * @description
 * A store holds multiple records for display in an ng-repeat item for example
 * 
 * @example
 * Controller:
 * 
 * $scope.store = new Store(
		'contacts',
		{
			returnAttributes: "id,name,photo,company.name"
		});
   $scope.store.load();

   View:
	
	<ul class="items panel" go-infinite-scroll="store.nextPage()" go-infinite-scroll-disabled="!store.shouldLoad()">
		<li ng-repeat-start="contact in store.items track by contact.id" class="index" ng-if="store.getIndexChar('name', $index) !== ''"><h2>{{::store.getIndexChar("name", $index)}}</h2></li>
		<li ng-repeat-end ng-class="{'deleted': contact.deleted}">
			<div class="icon">
				<div class="avatar">
					<img ng-src="{{contact.photo}}&amp;w=50&amp;h=50&amp;zoomCrop=1" />
				</div>
				
			</div>
			
			<a ui-sref-active="active" ui-sref="contacts.contact.detail({contactId: contact.id})">
				
				{{contact.name}}
				<br /><small>{{contact.company.name}}</small>

			</a>
		</li>

		<li ng-cloak ng-show="store.busy" class="loading-more animate"><i class="reload animate-spin"></i> {{"Loading more items..."| goT}}</li>

	</ul>
 *
 * @param {string} restRoute The route to the controller. eg. "contacts"
 * @param {object=} loadParams Extra GET parameters for the store action
 */
angular.module('GO.core.data')
		.factory('Store', ['$http', 'Utils', '$injector', '$q', '$timeout', function($http, Utils, $injector, $q, $timeout) {
			
				var Store = function(restRoute, loadParams) {
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#$items
					 * @propertyOf GO.core.data.Store
					 * @type array
					 * @description The models in this store.
					 */
					this.items = [];
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#busy
					 * @propertyOf GO.core.data.Store
					 * @type boolean
					 * @description Set to true when the model is loading or saving.
					 */
					this.busy = false;
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#init
					 * @propertyOf GO.core.data.Store
					 * @type boolean
					 * @description Set to true when the store is loaded.
					 */
					this.init = false;
					
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#searchQuery
					 * @propertyOf GO.core.data.Store
					 * @type string
					 * @description Search query to send to the server
					 */
					this.searchQuery = '';
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#restRoute
					 * @propertyOf GO.core.data.Store
					 * @type string
					 * @description The REST API route. eg. "/contacts"
					 * @link http://intermesh.io/php/docs/class-GO.Core.Http.Router.html
					 */
					this.restRoute = restRoute;

					this._allRecordsLoaded = false;

					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#loadParams
					 * @propertyOf GO.core.data.Store
					 * @type object
					 * @description Key value pair of GET parameters to pass on load.
					 */
					this.loadParams = loadParams || {};
					
					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#lastLoadParams
					 * @propertyOf GO.core.data.Store
					 * @type object
					 * @description Key value pair of the last GET parameters that were passed on load.
					 */
					this.lastLoadParams = {};
					
					
					this._indexChars = {};


					/**
					 * @ngdoc property
					 * @name GO.core.data.Store#defaultLimit
					 * @propertyOf GO.core.data.Store
					 * @type int
					 * @description Limit's the store fetch request to this number of models.
					 */
					this.defaultLimit = 20;
				};


				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#load
				 * @methodOf GO.core.data.Store
				 * @description
				 * Loads new items for the store.
				 *
				 * @param {object} params Key value pair of GET params for the request
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.load = function(params) {

					//I use timeout here otherwise a wierd thing happens with an ng-show directive in the view
					//it won't animate on the first render.
					//$timeout(function(){
						this.busy = true;
					//}.bind(this),1000);

					params = params || {};

					var defaultParams = {
						searchQuery: this.searchQuery,
						limit: this.defaultLimit,
						offset: 0
					};

					angular.extend(defaultParams, this.loadParams, params);
					
					
					this.lastLoadParams = angular.copy(defaultParams);
					

					var deferred = $q.defer();

//					Utils.promiseSuccessDecorator(deferred.promise);

					$http.get(Utils.url(this.restRoute, defaultParams))
							.success(function(data) {
								data.store = this;								

								if(data.success){

									//When there are less results then the limit we sent then we must have gotten the last results.
									this._allRecordsLoaded = data.results.length < defaultParams.limit;

									this.loadData(data.results);

									this.busy = false;
									this.init = true;
									
									deferred.resolve(data);
								}else
								{
									deferred.reject(data);
								}

							}.bind(this))
							.error(function(data){
								data.store = this;								
								
								deferred.reject(data);
							});
							
					this.promise = deferred.promise;
							
					return deferred.promise;
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#loadData
				 * @methodOf GO.core.data.Store
				 * @description
				 * Add an array of data to the store.
				 * 
				 * Example data:
				 * 
				 * <pre>
				 * [{attributeName: value}, {attributeName: value}]
				 * </pre>
				 * 
				 * It's also useful to override this function to do some stuff before or after load:
				 * 
				 * <pre>
				 * $scope.store.loadData = function(data){
				 * 
				 *      //Do stuff before
				 *
				 *		Store.prototype.loadData.call(this, data);
				 *
				 *       //Do stuff after
				 *
				 * }.bind($scope.store);
				 * </pre>
				 */
				Store.prototype.loadData = function(dataArray) {					
							
					for (var i = 0, l = dataArray.length; i < l; i++) {					

						var model = this._createModel();
						model.loadData(dataArray[i]);
					
						this.items.push(model);
					}
				};		
				
				Store.prototype.modelName = "Model";
				
				Store.prototype._createModel = function(){
					
					var baseParams = {};
					if(this.loadParams.returnAttributes){
						baseParams.returnAttributes = this.loadParams.returnAttributes;
					}
					
					
					var modelName = $injector.get(this.modelName);
					
					var model = new modelName(this.restRoute, baseParams);
					
					return model;
				};
				
		

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#nextPage
				 * @methodOf GO.core.data.Store
				 * @description
				 * Loads the next page for the store
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.nextPage = function() {

					if (!this.shouldLoad())
						return false;

					return this.load({
						offset: this.items.length
					});
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#reload
				 * @methodOf GO.core.data.Store
				 * @description
				 * Reload the entire store
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.reload = function() {

					var params = this.lastLoadParams;
					params.itemCount = this.items.length < this.defaultLimit ? this.defaultLimit : this.items.length;
					this.reset();

					return this.load(params);
				};


				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#reset
				 * @methodOf GO.core.data.Store
				 * @description
				 * Reset the store to an empty state
				 */
				Store.prototype.reset = function(keepSearch) {
					if (!keepSearch) {
						this.searchQuery = '';
					}
					this.items = [];
					this._allRecordsLoaded = false;
					this.init = false;					
				};


				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#shouldLoad
				 * @methodOf GO.core.data.Store
				 * @description
				 * Reset the store to an empty state
				 *
				 * @returns {boolean} Returns false if the store should not be loaded. eg. when it's busy or loaded completely.
				 */
				Store.prototype.shouldLoad = function() {
					var ret = !this.busy && !this._allRecordsLoaded;

					return ret;
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#search
				 * @methodOf GO.core.data.Store
				 * @description
				 * Loads the store but passes this.searchQuery
				 *
				 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
				 */
				Store.prototype.search = function() {
					this.reset(true);
					return this.load();
				};

//				Store.prototype.searchListener = function($event) {
//					if ($event.keyCode === 13) {
//						this.search();
//					}
//				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#remove
				 * @methodOf GO.core.data.Store
				 * @description
				 * Removes a record
				 *
				 * @param {int} index Index of record to remove
				 *
				 */
				Store.prototype.remove = function(index) {
					this.total--;
					return this.items.splice(index, 1);
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#getIndexChar
				 * @methodOf GO.core.data.Store
				 * @description
				 * Returns the first character of a given attribute name if it's different than the previous index.
				 *
				 * @param {string} attr The name of the attribute to check
				 * @param {int} index Index of record 
				 *
				 * @return {string} Index char
				 */
				Store.prototype.getIndexChar = function(attr, index){
					
					if(!this._indexChars[index]){
					
						if(!this.items[index]){
							return '';
						}

						if(index === 0){
							this._indexChars[index] = this.items[0][attr].substr(0,1).toUpperCase();
						}else
						{
							var lastIndex = this.items[index - 1][attr].substr(0,1).toUpperCase();
							var newIndex = this.items[index ][attr].substr(0,1).toUpperCase();
							this._indexChars[index] = lastIndex !== newIndex ? newIndex : "";
						}
					}
					
					return this._indexChars[index];
					
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#findIndexByAttribute
				 * @methodOf GO.core.data.Store
				 * @description
				 * Finds a record index by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {int} Index of record
				 */
				Store.prototype.findIndexByAttribute = function(attributeName, value) {

					for (var i = 0, l = this.items.length; i < l; i++) {
						if (this.items[i][attributeName] == value) {
							return i;
						}
					};

					return -1;
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#findIndexesByAttribute
				 * @methodOf GO.core.data.Store
				 * @description
				 * Finds a record index by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {array} Index of record
				 */
				Store.prototype.findIndexesByAttribute = function(attributeName, value) {
					
					var indexes = [];

					for (var i = 0, l = this.items.length; i < l; i++) {
						if (this.items[i][attributeName] == value) {
							indexes.push(i);
						}
					};

					return indexes;
				};

				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#findModelByAttribute
				 * @methodOf GO.core.data.Store
				 * @description
				 * Finds a record  by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {Model} The model found or false on failure
				 */
				Store.prototype.findModelByAttribute = function(attributeName, value) {

					var i = this.findIndexByAttribute(attributeName, value);

					if (i === false) {
						return false;
					} else
					{
						return this.items[i];
					}
				};
				
				
				/**
				 * @ngdoc method
				 * @name GO.core.data.Store#findModelsByAttribute
				 * @methodOf GO.core.data.Store
				 * @description
				 * Finds a record  by attribute name
				 *
				 * @param {string} attributeName Name of the attribute
				 * @param {mixed} value Value of the attribute
				 *
				 * @returns {array} The models found or false on failure
				 */
				Store.prototype.findModelsByAttribute = function(attributeName, value) {

					
					var indexes = this.findIndexesByAttribute(attributeName, value);
					var models = [];
					
					for(var i = 0, l = indexes.length; i < l; i++){
						models.push(this.items[indexes[i]]);
					}
					
					return models;
				};

				return Store;

			}]);
