'use strict';

/* Controllers */
angular.module('GO.email.models').
		factory('Thread', ["Model", function(Model) {
		
				
				var Thread = function(controllerRoute,  baseParams){
					Model.call(this, controllerRoute,  baseParams);
				};
				
				Thread.prototype = Object.create(Model.prototype);
				
				
				Thread.prototype.getFrom = function(){
					
					var parts = [];
					for(var i = 0, l = this.from.length; i < l; i++){
						
						if(this.from[i].isMe) {
							name = "Me";
						}else if(this.from[i].personal != '') {
							var names = this.from[i].personal.split(' ');						
							var name = names[0].replace(/[,;]$/, '');
						}else
						{
							name = this.from[i].email;
						}
						
						parts.push(name);
						
					}
					return parts.join(', ');
				};
				
				return Thread;
			
		}]);