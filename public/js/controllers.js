'use strict';

/* 
* Error types
* -----------
* 1 = existing title
* 2 = undefined error
*/

/* Controllers */

angular.module('BBVA_Project.controllers', ['ui.bootstrap','ngCookies']).
controller('HomeCtrl', ['$scope', 'Services', '$http','$rootScope', function($scope, Services,$http,$rootScope) {
  //=============// FRONT CONTROLLER //==============//  
		google.maps.visualRefresh = true;
		angular.extend($scope, {

			position: {
				coords: {
					latitude: 40.123,
					longitude: -4
				}
			},

			/** the initial center of the map */
			centerProperty: {
				latitude: 40.123,
				longitude: -4
			},

			/** the initial zoom level of the map */
			zoomProperty: 8,

			/** list of markers to put in the map */
			markersProperty: [ {
				latitude: 40.123,
				longitude: -4
			}],

			// These 2 properties will be set when clicking on the map
			clickedLatitudeProperty: null,
			clickedLongitudeProperty: null,

			eventsProperty: {
				click: function (mapModel, eventName, originalEventArgs) {
					// 'this' is the directive's scope
					$log.log("user defined event on map directive with scope", this);
					$log.log("user defined event: " + eventName, mapModel, originalEventArgs);
				}
			}
		});

		$scope.start = function(service){
			switch(service){
				case 'consumption' :
					Services.getConsumption(function(res) {
						$scope.stats = res.data.stats;
						$scope.loading = false;
					}, function(err) {
						$rootScope.error = "Failed to fetch users.";
						$scope.loading = false;
					});break;
				case 'merchants' :
					Services.getMerchants(function(res) {
						$scope.categories = res.data;
						$scope.loading = false;
					}, function(err) {
						$rootScope.error = "Failed to fetch users.";
						$scope.loading = false;
					});break;
				case 'customers' :
					Services.getCustomers(function(res) {
						$scope.zipcodes = res.data.stats[0].zipcodes;
						$scope.loading = false;
					}, function(err) {
						$rootScope.error = "Failed to fetch users.";
						$scope.loading = false;
					});break;
				case 'cards' :
					Services.getCards(function(res) {
						$scope.cards = {};
						$scope.cards.ranges = res.data.hash_description.ranges;
						$scope.cards.stats = res.data.stats;
						$scope.loading = false;
					}, function(err) {
						$rootScope.error = "Failed to fetch users.";
						$scope.loading = false;
					});break;
			}
		};


//=============// SEARCH CONTROLLER //==============//
}]).controller('NavCtrl', ['$scope', '$http','$rootScope', '$location', 'Auth', function($scope, $http,$rootScope,$location,Auth) {
		//TODO
	}]).controller('LoginCtrl',
		['$rootScope', '$scope', '$http','$location', '$window', 'Auth', function($rootScope, $scope,$http, $location, $window, Auth) {
			// This object will be filled by the form
			$scope.user = {};

			// Register the login() function
			$scope.login = function(){
				$http.post('/login', {
					username: $scope.user.username,
					password: $scope.user.password
				})
					.success(function(user){
						// No error: authentication OK
						$rootScope.message = 'Authentication successful!';
						$location.url('/home');
					})
					.error(function(){
						// Error: authentication failed
						$rootScope.message = 'Authentication failed.';
						$location.url('/login');
					});
			};
		}]).controller('RegisterCtrl',
		['$rootScope', '$scope', '$http', '$location', 'Auth', function($rootScope, $scope,$http,  $location, Auth) {
			// Register the login() function
			$scope.register = function(){
				$http.post('/register', {
					username: $scope.user.username,
					email: $scope.user.email,
					password: $scope.user.password
				})
					.success(function(data){
						// No error: authentication OK
						if(1==data.error){
							$rootScope.message = data.msg;
							$location.url('/register');
						}else{
							$rootScope.message = 'Authentication successful!';
							$location.url('/home');
						}
					})
					.error(function(data){
						// Error: authentication failed
						$rootScope.message = 'Something wrong';
						$location.url('/register');
					});
			};
		}]).controller('PrivateCtrl',
		['$rootScope', function($rootScope) {
		}]).controller('AdminCtrl',
		['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
			//TODO

		}]);