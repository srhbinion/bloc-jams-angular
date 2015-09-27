// named the app and set the angular function. Array displays what will be passes though the app.
var myAppModule = angular.module("bJams",["ui.router"]);

myAppModule.config(function($stateProvider, $locationProvider) {
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
			url: "/landing",
			controller:"Landing.controller",
			templateURL:"../templates/landing.html"
		})
		.state("collection",{
			// properties of the state
			url: "/collection",
			controller:"Collection.controller",
			templateURL:"../templates/collection.html"
		})
		.state("album",{
			// properties of the state
			url: "/album",
			controller:"Album.controller",
			templateURL:"../templates/album.html"
		});
});