'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('BBVA_Project.services', [])
    .factory('Auth', function($http, $cookieStore){

		var accessLevels = routingConfig.accessLevels;

		$cookieStore.remove('user');

		function changeUser(user) {
			_.extend(currentUser, user);
		};

		return {
			authorize: function(accessLevel, role) {
				if(role === undefined)
					role = currentUser.role;

				return accessLevel.bitMask & role.bitMask;
			},
			register: function(user, success, error) {
				$http.post('/register', user).success(function(res) {
					changeUser(res);
					success();
				}).error(error);
			},
			login: function(user, success, error) {
				$http.post('/login', user).success(function(user){
					changeUser(user);
					success(user);
				}).error(error);
			},
			logout: function(success, error) {
				$http.post('/logout').success(function(){
					changeUser({
						username: ''
					});
					success();
				}).error(error);
			},
			accessLevels: accessLevels
		};
	}).factory('Services', function($http) {
		return {
			getConsumption: function(success, error) {
				$http.post('/consumption').success(success).error(error);
			},
			getMerchants: function(success, error) {
				$http.post('/merchants').success(success).error(error);
			},
			getCustomers: function(success, error) {
				$http.post('/customers').success(success).error(error);
			},
			getCards: function(success, error) {
				$http.post('/cards').success(success).error(error);
			}
		};
	});

  

