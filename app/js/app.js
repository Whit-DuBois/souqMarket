'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'myServices',
  'myDirectives',
  'myControllers',
  'firebase'
]);

myApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'}).
			when('/stores', {templateUrl: 'partials/search.html', controller: 'searchCtrl'}).
			when('/edit', {templateUrl: 'partials/edit.html', controller: 'editCtrl'}).
			otherwise({redirectTo: '/home'});
  	}
]);
