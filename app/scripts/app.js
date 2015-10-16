// Establishes AngularJS -- Named the app and set the angular function
var bJams = angular.module("bJams", ["ui.router"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
bJams.config(function($stateProvider, $locationProvider) {
	//configure an application's path
	$locationProvider.html5Mode({
        //Disables hashbangs in URL
        enabled: true,
        //avoids common $location errors
        requireBase: false
    });
	//State Provider - sets up an address for each template state
	$stateProvider
		.state("landing",{
			// properties of the state listed in "controller"
			url: "/",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
		})
		.state("collection",{
			url: "/collection",
			controller: "CollectionController",
			templateUrl:"/templates/collection.html"
		})
		.state("album",{
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
});

/**
 * Controls the Collection view
 * @return {service}  - get the file someone clicked on as the current file.
 * @return {function}  - Establishes the selected album as the one that was clicked on.
 */
bJams.controller("CollectionController", ["$scope", "SongPlayer", function($scope, SongPlayer) {
	//defines page array details with album information
	$scope.albums = SongPlayer.getAlbums();
    //Tells the album view which album you want to see.
    $scope.setCurrentAlbum = function(artist){
        SongPlayer.setCurrentAlbum(artist);
        $scope.artist = artist;
    };
}]);

/**
 * Controls the album view
 * @return {service}  - get the file someone clicked on as the current file.
 * @return {function}  - Establishes the selected album as the one that was clicked on.
 */
bJams.controller("AlbumController", ["$scope", "SongPlayer", function($scope, SongPlayer){
    $scope.album = SongPlayer.getCurrentAlbum();
    console.log($scope.album);
    $scope.setCurrentAlbum = function(artist){
        SongPlayer.setCurrentAlbum(artist);
        $scope.artist = artist;
    };
//    console.log(SongPlayer.getAlbums());
//    console.log(SongPlayer.setCurrentAlbum($scope.artist));  
    
    // play controls
    $scope.changeState = function (){
        if (SongPlayer.isSongPlaying){
            SongPlayer.pause();
        }
        else {
            SongPlayer.play();
        }
    }
}]);

bJams.service("SongPlayer", function(albumService){
	//Song status - default state
    this.currentAlbum = null;
    this.currentlyPlayingSongNumber = null;
    this.currentSongFromAlbum = null;
    this.currentSoundFile = null;
    this.currentVolume = 80;
    
    return {
        getAlbums: function(){
            this.albumData = albumService.getAlbums();
            //console.log(this.albumData);
            //for each instance in features.js factory
            for(var objAlbum in this.albumData){ //name of album
                //console.log(objAlbum);
                this[objAlbum] = this.albumData[objAlbum]; //assigning album data to this.something
                //access album with this
                //console.log(this[objAlbum]);
            };
            //console.log(this.albumMarconi);
            return this.albumData;
        },
        getCurrentAlbum: function(){
            return this.currentAlbum;
        },
        /** 
        getCurrentAlbumIndex: function(){
            return this.currentAlbumIndex;
        },
        setCurrentAlbumIndex: function(index){
            this.currentAlbumIndex = index;
        }, */
        getCurrentlyPlayingSongNumber: function(){
            //get the song number
            return this.currentlyPlayingSongNumber;
            console.log(currentlyPlayingSongNumber);
        },
        getCurrentSongFromAlbum: function(){
            return this.currentSongFromAlbum;
        },
        setCurrentAlbum: function(artist){
            console.log(artist);
            switch (artist) {
                case "Pablo Picasso":
                    console.log ("Setting to Picasso");
                    this.currentAlbum = this.albumPicasso;
                break;
                case "Guglielmo Marconi":
                    console.log ("Setting to Marconi");
                    this.currentAlbum = this.albumMarconi;
                break;
                case "Andrew Warhol":
                    console.log ("Setting to Warhol");
                    this.currentAlbum = this.albumWarhol;
                break;
                case "BackStreet Boys":
                    console.log ("Setting to Now");
                    this.currentAlbum = this.albumNow;
                break;
                default:
                    console.log ("Is there anything else you'd like?");              
            };
            return this.currentAlbum;
        },

        isSongPaused: function(){
            //check if a song is playing and is in a paused state
            return (this.currentSoundFile && this.currentSoundFile.isSongPaused());
        },
        isSongPlaying: function(){
            //checks if a song is playing and not just paused.
            return (this.currentSoundFile && !this.currentSoundFile.isPaused());
        },
        play: function(){
//            if(this.isSongPaused()) {
//                this.currentSoundFile.play();}
            console.log("Play");
        },
		pause: function(){
//            if(this.isSongPlaying()){
//                this.currentSoundFile.pause();}
            console.log("pause");
        },
        /*
        getSong: function(){
            //find out current song
            return this.getCurrentSongFromAlbum;
        },
        setSong: function(songNumber){
            this.getCurrentlyPlayingSongNumber = songNumber;
            if (this.currentSoundFile){
                this.currentSoundFile.stop();
                //updateSeekBarWhileSongPlays
            }
            this.currentlyPlayingSongNumber = songNumber;
            this.currentSongFromAlbum = this.currentAlbum.songs[songNumber-1];
            // Assign a Buzz object. Pass audio file though current song from Album object.
            this.currentSoundFile = new buzz.sound(this.currentSongFromAlbum.audioUrl, {
                // Mp3 to start playing ASAP.
                formats: ["mp3"],
                preload: true
            });
            //volume
            this.getVolume(this.currentVolume);
        },
        previousSong: function(){
            var currentSongIndex = this.currentAlbum.songs.indexOf(this.currentSongFromAlbum);
            var prevSongIndex = (currentSongIndex -1);
            
            if (currentSongIndex < 0){
                prevSongIndex = (this.currentAlbum.song.length - 1);
            }
            this.setSong(prevSongIndex + 1);
        },
        nextSong: function(){
            var currentSongIndex = this.currentAlbum.songs.indexOf(this.currentSongFromAlbum);
            var nextSongIndex = (currentSongIndex + 1);
            if(nextSongIndex >= this.currentAlbum.song.length){
                nextSongIndex = 0;
            }
            this.setSong(nextSongIndex + 1);
        },
        getTimePosition: function(){
            return this.currentSoundFile.getTime();
        },
        setTimePosition: function(){
            if (this.currentSoundFile) {
                this.currentSoundFile.setTime();
            }
        },
        getVolume: function(){
            // finds out current volume
            return this.currentVolume;
        },
        setVolume: function(volume){
            //if there is a sound file it sets the volume
            this.currentVolume = volume;
            
            if (this.currentSoundFile) {
                this.currentSoundFile.setVolume(volume);
            }
        }
*/        
	};
});