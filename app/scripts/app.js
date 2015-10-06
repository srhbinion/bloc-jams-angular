// named the app and set the angular function. Array displays what will be passes though the app.
var bJams = angular.module("bJams",["ui.router"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
bJams.config(function($stateProvider, $locationProvider) {
	//configure an application's path
	$locationProvider.html5Mode({
        //disables hashbangs in URL - TODO: need to change to true after testing
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
 * @return {actionItems}  - Establishes the array with call-to-action containers
 */
bJams.controller("LandingController", function($scope) {
	$scope.welcome = "Turn the music up!";
	//$rootScope.bodyClass ="landing";
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

	//Vanilla code from foundation 23. TODO: Animating 3 "selling points" when page scrolls.
	//window.onload = function(){
	//	var sellingPoints = document.getElementsByClassName("sellingPoints")[0];
	//	var scrollDistance = sellingPoints.getBoundClientRect().top - window.innerHeight + 200;

	//	if(window.innerHeight > 950){
	//		animatePoints(pointsArray);
	//	}

	//	window.addEventListener("scroll", function(event){
	//		if (document.body.scrollTop >= scrollDistance){
	//			animate.Points(pointsArray);
	//		}
	//	});
	//};
});

bJams.controller("CollectionController", ["$scope", function($scope) {
	//defines page array details with album information
	$scope.albums = [albumPicasso, albumMarconi, albumWarhol, albumNow];
    //activates the slected album    
    $scope.setAlbum = function($index) {
    	currentAlbum = $scope.albums[$index];
    };
}]);

bJams.controller("AlbumController", ["$scope", function($scope) {
	$scope.album = currentAlbum;
	//controller logic - service
	$scope.pauseSong = function(song){
		SongPlayer.pause();
	};
	

}]);

bJams.service("SongPlayer", ["albumData", function(albumData){
	//Song status - default state
    this.currentAlbum = null;
    this.currentlyPlayingSongNumber = null;
    this.currentSongFromAlbum = null;
    this.currentSoundFile = null;
    this.currentVolume = 80;
    
    return {
        getCurrentAlbum: function(){
            //set the current song
            return this.currentAlbum;
        },
        getCurrentlyPlayingSongNumber: function(){
            //set the song number
            return this.currentlyPlayingSongNumber;
        },
        getCurrentSongFromAlbum: function(){
            return this.currentSongFromAlbum;
        },
        isSongPaused: function(){
        
        },
        isSongPlaying: function(){
            return (this.currentSoundFile && !this.currentSoundFile.isPaused());
        },
        getAlbums: function(){
        
        },
        setCurrentAlbum: function(){
        
        },
        getSong: function(){
            return this.currentSoundFile;
        },
        setSong: function(){
            
        },
        previousSong: function(){
        
        },
        nextSong: function(){
        
        },
        play: function(){
        
        },
		pause: function() {
            if(this.isSongPlaying())
            {this.currentSoundFile.play();
            }
		},
        getTimePosition: function(){
        
        },
        setTimePosition: function(){
        
        },
        getVolume: function(){
            return this.currentVolume;
        },
        setVolume: function(){
            
        },
	};
    
    //TODO define
	previousSong()=null;
	//TODO define
	nextSong()=null;
}]);