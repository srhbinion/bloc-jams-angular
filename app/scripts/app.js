// named the app and set the angular function. Array displays what will be passes though the app.
var bJams = angular.module("bJams",["ui.router"]);

/**
 * Configuration for the angular site views
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
bJams.config(function($stateProvider, $locationProvider) {
	//configure an application's path
	$locationProvider.html5Mode({
        //disables hashbangs in URL
        enabled: true,
        //avoids common $location errors
        requireBase: false
    });

	//sets up an address for each template state
	$stateProvider
		.state("landing",{
			// properties of the state
			url: "/",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
		})
		.state("collection",{
			// properties of the state
			url: "/collection",
			controller:"CollectionController",
			templateUrl:"/templates/collection.html"
		})
		.state("album",{
			// properties of the state
			url: "/album",
			controller:"AlbumController",
			templateUrl:"/templates/album.html"
		});
});

bJams.controller("LandingController", ["$scope", function($scope) {
		$scope.welcome = "Turn the music up!";
		$scope.point = {
			actionItems:[
				{
					icon: "ion-iphone",
					title: "Mobile enabled",
					description: "Listen to your music on the go. This streaming service is available on all mobile platforms."
				},
				{
					icon: "ion-radio-waves",
					title: "Unlimited, streaming, ad-free",
					description: "No arbitrary limits. No distractions."
				},
				
				{
					icon: "ion-music-note",
					title: "Choose your music",
					description: "The world is full of music; why should you have to listen to music that someone else chose?"
				}
			
			]
		} 	
}]);

bJams.controller("CollectionController", ["$scope", function($scope) {
}]);

bJams.controller("AlbumController", ["$scope", function($scope) {
}]);