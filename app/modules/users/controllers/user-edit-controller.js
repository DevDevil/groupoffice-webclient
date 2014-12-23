'use strict';

angular.module('GO.users.controllers').
		controller('UserEditController', ['$scope', '$state', '$stateParams', 'Utils', '$http', '$q','Alerts', 'Translate','Tags', function($scope, $state, $stateParams, Utils, $http, $q, Alerts, Translate, Tags) {

//				var defaultPhotoUrl = "";

				$scope.cancel = function() {
					if ($scope.user.id) {

						$scope.user.resetAttributes();

						$state.go('users.user.detail', {userId: $scope.user.id});
					} else
					{
						$state.go('^');
					}
				};


				if($scope.onSettingsPage) {
					$scope.save = function() {

						$scope.user.save()
								.then(function(result) {
										$scope.userForm.$setPristine();

										Alerts.addAlert(Translate.t("Your changes have been saved"), "info");
								});
					};
				}

				$scope.user.readIf($stateParams.userId).then(function() {
				});

			}]);
