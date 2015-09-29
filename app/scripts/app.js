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
			controller: "CollectionController",
			templateUrl:"/templates/collection.html"
		})
		.state("album",{
			// properties of the state
			url: "/album",
			controller:"AlbumController",
			templateUrl:"/templates/album.html"
		});
});

/**
 * Controls the landing view
 * @return {welcome}  - Hero Text
 * @return {actionItems}  - Array with call-to-action items
 */
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
	};	
}]);

bJams.controller("CollectionController", ["$scope", function($scope) {
	//texting purpose
	$scope.albumArray = {
        actionItems:[
            {
                name: "The Colors",
                artist: "Pablo Picasso",
                label: "Cubism",
                year: "1881",
                albumArtUrl: "assets/images/album_covers/01.png",
                songs: [
                    {name: "Blue", length: "4:26", audioUrl: "/assets/music/blue"},
                    {name: "Green", length: "3:14", audioUrl: "assets/music/green"},
                    {name: "Red", length: "5:01", audioUrl: "assets/music/red"},
                    {name: "Pink", length: "3:21", audioUrl: "assets/music/pink"},
                    {name: "Magenta", length: "2:15", audioUrl: "assets/music/magenta"}
                ]
            },
            {
                name: "The Colors",
                artist: "Pablo Picasso",
                label: "Cubism",
                year: "1881",
                albumArtUrl: "assets/images/album_covers/01.png",
                songs: [
                    {name: "Blue", length: "4:26", audioUrl: "/assets/music/blue"},
                    {name: "Green", length: "3:14", audioUrl: "assets/music/green"},
                    {name: "Red", length: "5:01", audioUrl: "assets/music/red"},
                    {name: "Pink", length: "3:21", audioUrl: "assets/music/pink"},
                    {name: "Magenta", length: "2:15", audioUrl: "assets/music/magenta"}
                ]
            }
        ]
    };
}]);

bJams.controller("AlbumController", ["$scope", function($scope) {
}]);