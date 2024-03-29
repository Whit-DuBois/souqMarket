'use strict';

var myControllers = angular.module('myControllers', ['myServices', 'ngRoute', 'ui.map', 'ui.event']);

	myControllers.controller('homeCtrl', ['$scope', 'businessAPI', '$firebase', '$firebaseSimpleLogin',
		function($scope, businessAPI, $firebase, $FirebaseSimpleLogin) {

			// AUTHENTICATION
			var chatRef = new Firebase('https://souq-market.firebaseio.com/users');
	        var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	            if (error) {
	                console.log(error);
	            } else if (user) {
	                console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	            } else {
	                console.log('Not logged in')
	            }
	        });

	        $scope.fbLogon = function(){
	        	auth.login('facebook');
	    	}

	    	$scope.logout = function(){
	    		$scope.logout();
	    	}

	        $scope.createUser = function(){
	        	console.log('createUser Clicked');
		        auth.createUser(email, password, function(error, user) {
		            if (!error) {
		                console.log('User Id: ' + user.id + ', Email: ' + user.email);
		            }
		        });
		    }

			$scope.business = businessAPI;
			console.log('homeCtrl');

			// GOOGLE MAP
		    $scope.lat = '41.8810';
		    $scope.lng = '-87.6278';
		    $scope.accuracy = '0';
		    $scope.error = "";
		    $scope.model = { myMap: undefined };
		    $scope.myMarkers = [];
			$scope.mapOptions = {
				center: new google.maps.LatLng($scope.lat, $scope.lng),
				zoom: 15
			};

		    $scope.showResult = function () {
		        return $scope.error == "";
		    }

			$scope.showPosition = function (position) {
		        $scope.lat = position.coords.latitude;
		        $scope.lng = position.coords.longitude;
		        $scope.accuracy = position.coords.accuracy;
		        $scope.$apply();
		        var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
		        $scope.model.myMap.setCenter(latlng);
		        $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
		    }

		    $scope.getLocation = function () {
		        if (navigator.geolocation) {
		            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
		        }
		        else {
		            $scope.error = 'Geolocation is not supported by this browser.';
		        }
		    }

			$scope.getLocation();
		}
	]);
	
	myControllers.controller('searchCtrl', [
		function() {
			console.log('searchCtrl');
	}]);

	myControllers.controller('editCtrl', [ '$scope', '$firebase',
		function($scope, $firebase) {
			var businessRef = new Firebase("https://souq-market.firebaseio.com/business");
			$scope.business = $firebase(businessRef);
			$scope.addBusiness = function(){
				$scope.business.$add($scope.newBusiness);
				$scope.newBusiness = "";
			}

			$scope.deleteItem = function(id){
				var result = confirm('Are you sure you want to delete?');

				if (result = true){
					var itemRef = new Firebase("https://souq-market.firebaseio.com/business" + '/' + id);
					itemRef.remove();
				}
			}

			console.log('editCtrl');

			$scope.val = "";
		}
	]);

// 	function onGoogleReady() {
//   angular.bootstrap(document.getElementById("map"), ['app.ui-map']);
// }