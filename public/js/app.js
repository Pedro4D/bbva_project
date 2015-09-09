'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('BBVA_Project', ['BBVA_Project.filters', 'BBVA_Project.services', 'BBVA_Project.controllers','ngResource','google-maps'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {

		var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
			// Initialize a new promise
			var deferred = $q.defer();

			// Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').success(function(user){
				// Authenticated
				if (user !== '0')
					$timeout(deferred.resolve, 0);

				// Not Authenticated
				else {
					$rootScope.message = 'You need to log in.';
					$timeout(function(){deferred.reject();}, 0);
					$location.url('/login');
				}
			});

			return deferred.promise;
		};
		//================================================

		//================================================
		// Add an interceptor for AJAX errors
		//================================================
		$httpProvider.responseInterceptors.push(function($q, $location) {
			return function(promise) {
				return promise.then(
					// Success: just return the response
					function(response){
						return response;
					},
					// Error: check the error status to get only the 401
					function(response) {
						if (response.status === 401)
							$location.url('/login');
						return $q.reject(response);
					}
				);
			}
		});
		//================================================
		//================================================
		// Define all the routes
		//================================================
		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		});
		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		});
		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		});
		$routeProvider.when('/register',{
			templateUrl:    'partials/register.html',
			controller:     'RegisterCtrl'
		});
		$routeProvider.when('/private',{
			templateUrl:    'partials/private.html',
			controller:     'PrivateCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		});
		$routeProvider.when('/admin',{
			templateUrl:    'partials/admin.html',
			controller:     'AdminCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		});
		$routeProvider.when('/404',{
			templateUrl:    'partials/404.html'
		});
		$routeProvider.otherwise({redirectTo:'/404'});
		$locationProvider.html5Mode(false);
		$locationProvider.hashPrefix('!');

  }) // end of config()
  .run(function($rootScope, $http){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  });



/*********************************************************************
 * Login controller
 *********************************************************************/
/*
app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/admin');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
});
*/


