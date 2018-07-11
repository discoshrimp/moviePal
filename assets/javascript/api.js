var movieTitle= "";


$(document).ready(function(){
	$("#searchButton").on("click", function(event){
		movieTitle=$("#searchBox").val().trim();
		//var yelp = "https://api.yelp.com/v3/businesses/search/(movietheaters)";
		var omdbData = "http://www.omdbapi.com/?t="+movieTitle+"&apikey=3efbbefc";
		var omdbPoster = "http://img.omdbapi.com/?apikey=3efbbefc&t="+movieTitle;
		var metacritic ="http://api.marcalencc.com/metacritic/" +movieTitle+ "/movie";
		var yelp = "https://api.yelp.com/v3/businesses/search/";

		var omdbResponse={
			"title":"",
			"year":"",
			"rated":"",
			"released":"",
			"runtime":"",
			"actors":[],
			"awards":[],
			"boxOffice":"",
			"country":"",
			"director":"",
			"genre":"",
			"language":"",
			"metascore":"",
			"plot":"",
			"poster":"",
			"production":"",
			"writer":"",
			"imdbId:":"",
			"imdbRating":0,
			"imdbVotes":0,
		}
		event.preventDefault();
		console.log("click success!");
		console.log(movieTitle);
		

		$.ajax({
			url: omdbData,
			method: "GET"
			}).then(function(omdbDataResponse) {
			console.log(omdbDataResponse);
			
				//return omdbResponse;
				omdbResponse.title=omdbDataResponse.Title
				omdbResponse.year=omdbDataResponse.Year
				omdbResponse.rated=omdbDataResponse.Rated
				omdbResponse.released=omdbDataResponse.Released
				omdbResponse.runtime=omdbDataResponse.Runtime
				omdbResponse.actors=omdbDataResponse.Actors
				omdbResponse.awards=omdbDataResponse.Awards
				omdbResponse.boxOffice=omdbDataResponse.BoxOffice
				omdbResponse.country=omdbDataResponse.Country
				omdbResponse.director=omdbDataResponse.Director
				omdbResponse.genre=omdbDataResponse.Genre
				omdbResponse.language=omdbDataResponse.Language
				omdbResponse.metascore=omdbDataResponse.Metascore
				omdbResponse.plot=omdbDataResponse.Plot
				omdbResponse.poster=omdbDataResponse.Poster
				omdbResponse.production=omdbDataResponse.Production
				omdbResponse.writer=omdbDataResponse.Writer
				omdbResponse.imdbId=omdbDataResponse.imdbID
				omdbResponse.imdbRating=omdbDataResponse.imdbRating
				omdbResponse.imdbVotes=omdbDataResponse.imdbVotes
				$("#posterBoy").html("<img src='"+omdbResponse.poster+"'/>")
			});
		console.log(omdbResponse);
		/*$.ajax({
			url: metacritic,
			method: "GET"
		}).then(function(metacriticResponse) {
			console.log(metacriticResponse);
		});*/
		/*$.ajax({
	url: omdbPoster,
	method: "GET"
  }).then(function(omdbPosterResponse) {
	console.log(omdbPosterResponse);
  });*/

//  $.ajax({
	//url: yelp,
	//method: "GET"
  //}).then(function(yelpResponse) {
	//console.log(yelpResponse);
	//});
})
})