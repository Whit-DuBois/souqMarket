'use strict';

var myServices = angular.module('myServices', ['ngResource']);

	myServices.factory('businessAPI', ['$firebase', function($firebase){
		var businessRef = new Firebase("https://souq-market.firebaseio.com/business");
		return $firebase(businessRef);

		// var usersRef = new Firebase("https://souq-market.firebaseio.com/users");
		// return $firebase(usersRef);
	}]);

	myServices.factory('mapAPI', function($resource){
		return{
			
		}
	});

	myServices.factory('userAPI', ['$firebase', function($firebase){
		var userRef = new Firebase('https://souq-market.firebaseio.com')
	}]);